import { db } from "@/firebase/firebaseConfig";
import { collection, doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2'


const Perfil = () => {
    const userLog = useSelector((state)=>state.UserLog)
    const usersCollection = collection(db, "users")
    const [loading, setLoading] = useState(false)
    const [newUser, setNewUser] = useState(userLog);
  const [errors, setErrors] = useState({});
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

  const cargaDatos = async ()=>{
    if(noErrors){
        setLoading(true)
      }

    

    try {
      const {birthday,comment,email,lastname,name,phone,photo,privatecomment,rol} = newUser
     const docRef = await setDoc(doc(usersCollection, newUser.email), {
      birthday,comment,email,lastname,name,phone,photo,privatecomment,rol
         });
         
         Swal.fire('cambiado con exito');
         setLoading(false)

       } catch (e) {
         console.error("Error adding document: ", e);
       }
  }

  return (
    <div className="login">
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Perfil
                </h1>
                <div className="space-y-4 md:space-y-6" action="#">
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
                      defaultValue={newUser.name}
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
                      defaultValue={newUser.lastname}
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
                      defaultValue={newUser.phone}
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
                      defaultValue={newUser.photo}
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
                      defaultValue={newUser.birthday}
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
                      defaultValue={newUser.comment}
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
                      defaultValue={newUser.privatecomment}
                    />
                  </div>
                  {loading? 
                  <h2>LOADING...</h2>
                :
                noErrors ? 
                <button className="g-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onClick={cargaDatos}>
                  GUARDAR
                </button>
                :
                ""
                }

                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
};

export default Perfil;