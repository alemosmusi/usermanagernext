import { useContext, useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext, useAuth } from "../../context/AuthContext";
import { auth, db } from "@/firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { collection, doc, setDoc } from "firebase/firestore";

const loginpage = () => {
  const dispatch = useDispatch()
  const usersCollection = collection(db, "users");
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [botonSignup, setBotonSignup] = useState(true);

  const { login, signup, currentUser } = useAuth();

  // console.log(currentUser)

  const handleLogin = (e) => {
    e.preventDefault();

    login(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        setError(true);
      });
  };

  const [newUser, setNewUser] = useState({});
  const [errors, setErrors] = useState({email:"*", password:"*", repeatpassword:"*",name:"*",lastname:"*",phone:"*",birthday:"*"});

  const handleInput = (e) => {
    const { name, value } = e.target;

    setNewUser({
      ...newUser,
      [name]: value,
    });

    // Verificar y actualizar los errores
    if (name === "name") {
      // Validar nombre
      if (!value || value.length === 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          name: "El campo de nombre está vacío",
        }));
      } else if (value.length < 3 || value.length > 100) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          name: "El nombre debe tener entre 3 y 100 caracteres",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          name: undefined, // Eliminar el error si es válido
        }));
      }
    } else if (name === "lastname") {
      // Validar apellido
      if (!value || value.length === 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          lastname: "El campo de apellido está vacío",
        }));
      } else if (value.length < 3 || value.length > 100) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          lastname: "El apellido debe tener entre 3 y 100 caracteres",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          lastname: undefined, // Eliminar el error si es válido
        }));
      }
    } else if (name === "email") {
      // Validar email
      if (!value || value.length === 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "El campo de correo electrónico está vacío",
        }));
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: "El formato del correo electrónico no es válido",
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: undefined, // Eliminar el error si es válido
          }));
        }
      }
    } else if (name === "password") {
      // Validar contraseña
      if (!value || value.length === 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "El campo de contraseña está vacío",
        }));
      } else if (value.length < 8 || value.length > 50) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "La contraseña debe tener entre 8 y 50 caracteres",
        }));
      } else if (
        !/[a-z]/.test(value) ||
        !/[A-Z]/.test(value) ||
        !/[0-9]/.test(value)
      ) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password:
            "La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un dígito",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: undefined, // Eliminar el error si es válida
        }));
      }
    } else if (name === "repeatpassword") {
      // Validar contraseña repetida
      const password = newUser.password;
      if (value !== password) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          repeatpassword: "Las contraseñas no coinciden",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          repeatpassword: undefined, // Eliminar el error si coinciden
        }));
      }
    } else if (name === "phone") {
      // Validar número de teléfono
      const phoneRegex = /^\d{9}$/;
      if (!phoneRegex.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phone: "El número de teléfono debe tener exactamente 9 dígitos",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phone: undefined, // Eliminar el error si es válido
        }));
      }
    } else if (name === "birthday") {
      if (!value) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          birthday: "La fecha de cumpleaños es obligatoria",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          birthday: undefined, // Eliminar el error si tiene un valor válido
        }));
      }
    }

    
  };

  const [noErrors, setNoErrors] = useState(false)
  useEffect(() => {
    const errorValues = Object.values(errors);

    // Verificar si todos los errores están undefined
    const hasErrors = errorValues.every((error) => error === undefined);

    // Comprobar el valor de hasErrors
    if (hasErrors) {
      // Todos los errores están undefined, no hay errores en el formulario
      setNoErrors(true)
    } else {
      // Al menos un error está definido, hay errores en el formulario
      setNoErrors(false)
    }
  }, [errors])



  const sendSubmit = async ()=>{
        try {
           const sigup =  await signup(newUser.email,newUser.password)

            } catch (e) {
              console.error("Error adding document: ", e);
            }
    

  }
  const cargaDatos = async ()=>{
    try {
     const docRef = await setDoc(doc(usersCollection, newUser.email), {
           newUser
         });
         console.log("Document written with ID: ", docRef);
       } catch (e) {
         console.error("Error adding document: ", e);
       }
  }
  
  useEffect(() => {
    if(noErrors){
    cargaDatos()}
  }, [currentUser])
  

 
  
  if (botonSignup) {
    return (
      <div className="login">
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign up
                </h1>
                <div className="space-y-4 md:space-y-6" action="#">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email {errors.email === "*" ? (
                    <n className="text-red-600">{errors.email}</n>
                  ) : (
                    ""
                  )}
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required=""
                      onChange={handleInput}
                    />
                  </div>
                  {errors.email && errors.email !== "*" ? (
                    <p className="text-red-600">{errors.email}</p>
                  ) : (
                    ""
                  )}
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password {errors.password === "*" ? (
                    <n className="text-red-600">{errors.password}</n>
                  ) : (
                    ""
                  )}
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                      onChange={handleInput}
                    />
                  </div>
                  {errors.password && errors.password !== "*"  ? (
                    <p className="text-red-600">{errors.password}</p>
                  ) : (
                    ""
                  )}
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Repeat your Password{errors.repeatpassword === "*" ? (
                    <n className="text-red-600">{errors.repeatpassword}</n>
                  ) : (
                    ""
                  )}
                    </label>
                    <input
                      type="password"
                      name="repeatpassword"
                      id="repeatpassword"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                      onChange={handleInput}
                    />
                  </div>
                  {errors.repeatpassword && errors.repeatpassword !== "*"  ? (
                    <p className="text-red-600">{errors.repeatpassword}</p>
                  ) : (
                    ""
                  )}
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your name{errors.name === "*" ? (
                    <n className="text-red-600">{errors.name}</n>
                  ) : (
                    ""
                  )}
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Agustin"
                      required=""
                      onChange={handleInput}
                    />
                  </div>
                  {errors.name && errors.name !== "*"  ? (
                    <p className="text-red-600">{errors.name}</p>
                  ) : (
                    ""
                  )}
                  <div>
                    <label
                      htmlFor="lastname"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your lastname{errors.lastname === "*" ? (
                    <n className="text-red-600">{errors.lastname}</n>
                  ) : (
                    ""
                  )}
                    </label>
                    <input
                      type="text"
                      name="lastname"
                      id="lastname"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Lemos"
                      required=""
                      onChange={handleInput}
                    />
                  </div>
                  {errors.lastname && errors.lastname !== "*"  ? (
                    <p className="text-red-600">{errors.lastname}</p>
                  ) : (
                    ""
                  )}
                  <div>
                    <label
                      htmlFor="lastname"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your phone{errors.phone === "*" ? (
                    <n className="text-red-600">{errors.phone}</n>
                  ) : (
                    ""
                  )}
                    </label>
                    <input
                      type="number"
                      name="phone"
                      id="phone"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="123456789"
                      required=""
                      onChange={handleInput}
                    />
                  </div>
                  {errors.phone && errors.phone !== "*"  ? (
                    <p className="text-red-600">{errors.phone}</p>
                  ) : (
                    ""
                  )}
                  <div>
                    <label
                      htmlFor="lastname"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your photo
                    </label>
                    <input
                      type="text"
                      name="photo"
                      id="photo"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="https://agustin-lemos.vercel.app/image/about-banner.png"
                      required=""
                      onChange={handleInput}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lastname"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your birthday{errors.birthday === "*" ? (
                    <n className="text-red-600">{errors.birthday}</n>
                  ) : (
                    ""
                  )}
                    </label>
                    <input
                      type="date"
                      name="birthday"
                      id="birthday"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="https://agustin-lemos.vercel.app/image/about-banner.png"
                      required=""
                      onChange={handleInput}
                    />
                  </div>
                  {errors.birthday && errors.birthday !== "*"  ? (
                    <p className="text-red-600">{errors.birthday}</p>
                  ) : (
                    ""
                  )}
                  <div>
                    <label
                      htmlFor="comment"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your comment
                    </label>
                    <textarea
                      type="textarea"
                      name="comment"
                      id="comment"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="I like so much this web"
                      required=""
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="comment"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your private comment
                    </label>
                    <textarea
                      type="textarea"
                      name="privatecomment"
                      id="privatecomment"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="I really like this website a lot."
                      required=""
                      onChange={handleInput}
                    />
                  </div>
                  {noErrors ? 
                  <button className="g-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onClick={sendSubmit}>
                    Sign in
                  </button>
                  :
                  ""
                  
                }
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    I already have an account{" "}
                    {/* {user.name && user.birthday &&} */}
                    <button
                      href="#"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      onClick={() => setBotonSignup(false)}
                    >
                      Submit
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  } else {
    return (
      <div className="login">
        {/* <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          {error && <span>Wrong email or password!</span>}
        </form> */}

        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
                </h1>
                <div className="space-y-4 md:space-y-6" action="#">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required=""
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {error && <span>Wrong email or password!</span>}
                  <button
                    className="g-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onClick={handleLogin}
                  >
                    Sign in
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet?{" "}
                    <button
                      href="#"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      onClick={() => setBotonSignup(true)}
                    >
                      Sign up
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
};

export default loginpage;
