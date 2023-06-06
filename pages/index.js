import Image from "next/image";
import { Inter } from "next/font/google";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProyectos } from "@/redux/actions";
import { collection, addDoc, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { useAuth } from "@/context/AuthContext";
import { Tabla } from "@/components/tabla";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { login, signup, currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersF, setUsersF] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const usuarios = [];
    const querySnapshot = await getDocs(collection(db, "users"));

    querySnapshot.forEach((doc, index) => {
      if (doc.data().sendDatada) {
        usuarios.push(doc.data().sendDatada);
      }
      if (doc.data().sendDatada) {
        usuarios.push(doc.data().sendDatada);
      }
      if (doc.data().sendDatada) {
        usuarios.push(doc.data().sendDatada);
      }
      if (doc.data().sendDatada) {
        usuarios.push(doc.data().sendDatada);
      }
      if (doc.data().sendDatada) {
        usuarios.push(doc.data().sendDatada);
      }
      if (doc.data().sendDatada) {
        usuarios.push(doc.data().sendDatada);
      }
    });
    setUsers(usuarios);
  };

  useEffect(() => {
    filterUser();
  }, [users,currentPage]);

  const filterUser = () => {
    pageUser();
  };

  const pageUser = () => {
    var min = 0;
    var max = 5;
    if (currentPage !== 1) {
      min = (currentPage - 1) * 5;
      max = currentPage * 5;
    }

    const slicedUsers = users.slice(min, max);
    setUsersF(slicedUsers);
  };

  //   // const proyectos = useSelector((state) => state.Proyectos)
  //   // const dispatch = useDispatch()
  //   const usersCollection = collection(db, "users");

  // // Definir el ID personalizado para el documento
  // const documentoId = "tuIdPersonalizado";

  //   useEffect(() => {
  //     const obtenerdatos = async ()=>{
  //       const querySnapshot = await getDocs(collection(db, "users"));
  //       // console.log(querySnapshot[0].id)
  //       // querySnapshot.forEach((doc) => {
  //       //   console.log(`${doc.id} => ${doc.data()}`);
  //       // });
  //       try {

  //         const docRef = await setDoc(doc(usersCollection, documentoId), {
  //           first: "Ada",
  //           last: "Lovelace",
  //           born: 1814
  //         });
  //         console.log("Document written with ID: ", docRef);
  //       } catch (e) {
  //         console.error("Error adding document: ", e);
  //       }
  //       // querySnapshot.forEach((doc) => {
  //       //   console.log(doc.data());
  //       // });
  //     }

  //     obtenerdatos()
  //   }, [])

  //   // console.log(proyectos)

  return (
    <main
    // className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div class="sm:px-6 w-full">
        <div class="px-4 md:px-10 py-4 md:py-7">
          <div class="flex items-center justify-between">
            <p
              tabindex="0"
              class="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800"
            >
              Tasks
            </p>
            <div class="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
              <p>Sort By:</p>
              <select
                aria-label="select"
                class="focus:text-indigo-600 focus:outline-none bg-transparent ml-1"
              >
                <option class="text-sm text-indigo-800">Latest</option>
                <option class="text-sm text-indigo-800">Oldest</option>
                <option class="text-sm text-indigo-800">Latest</option>
              </select>
            </div>
          </div>
        </div>
        <div class="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
          <div class="sm:flex items-center justify-between">
            <div class="flex items-center">
              <a
                class="rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800"
                href=" javascript:void(0)"
              >
                <div class="py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full">
                  <p>All</p>
                </div>
              </a>
              <a
                class="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8"
                href="javascript:void(0)"
              >
                <div class="py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full ">
                  <p>Done</p>
                </div>
              </a>
              <a
                class="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8"
                href="javascript:void(0)"
              >
                <div class="py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full ">
                  <p>Pending</p>
                </div>
              </a>
            </div>
          </div>
          <div class="mt-7 overflow-x-auto">
            <table class="w-full whitespace-nowrap">
              <thead>
                <tr>
                  <th class="">
                    <div class="ml-5">
                      <p class="text-base font-medium leading-none text-gray-700 mr-2">
                        Admin
                      </p>
                    </div>
                  </th>
                  <th class="pl-5">
                    {/* <div class="flex items-center"> */}
                    <div class="flex">
                      <p class="text-sm leading-none text-gray-600">
                        Name and Lastname
                      </p>
                    </div>
                  </th>
                  <th class="pl-5">
                    <div class="flex items-center">
                      <p class="text-sm leading-none text-gray-600 ">Email</p>
                    </div>
                  </th>
                  <th class="pl-5">
                    <div class="flex items-center">
                      <p class="text-sm leading-none text-gray-600 ml-2">
                        Birthday
                      </p>
                    </div>
                  </th>
                  <th class="pl-5">
                    <div class="flex items-center">
                      <p class="text-sm leading-none text-gray-600 ml-2">
                        Phone
                      </p>
                    </div>
                  </th>
                  <th class="pl-5">
                    <div class="flex items-center">
                      <p class="text-sm leading-none text-gray-600 ml-2">
                        Photo
                      </p>
                    </div>
                  </th>
                  <th class="pl-5">
                    <div class="flex items-center">
                      <p class="text-sm leading-none text-gray-600 ml-2">
                        Comment
                      </p>
                    </div>
                  </th>
                  <th class="pl-5">
                    <div class="flex items-center">
                      <p class="text-sm leading-none text-gray-600 ml-2">
                        Private Coment
                      </p>
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {usersF && usersF.length > 0
                  ? usersF.map((u, i) => (
                      <tr
                        tabindex="0"
                        class="focus:outline-none h-16 border border-gray-100 rounded"
                        key={i}
                      >
                        <td key={i}>
                          <div class="ml-5 flex justify-center">
                            {/* <div class="rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative"> */}
                            <div class="rounded-sm w-5 h-5 flex flex-shrink-0 items-center relative">
                              <input
                                placeholder="checkbox"
                                type="checkbox"
                                defaultChecked={u.rol === 1 ? true : false}
                              />
                            </div>
                          </div>
                        </td>
                        <td class="">
                          <div class="flex items-center pl-5">
                            <p class="text-base font-medium leading-none text-gray-700 mr-2">
                              {u.name} {u.lastname}
                            </p>
                          </div>
                        </td>
                        <td class="pl-5">
                          <p class="text-sm leading-none text-gray-600 ml-2">
                            {u.email}
                          </p>
                        </td>
                        <td class="pl-5">
                          <div class="flex items-center">
                            <p class="text-sm leading-none text-gray-600 ml-2">
                              {u.birthday}
                            </p>
                          </div>
                        </td>
                        <td class="pl-5">
                          <div class="flex items-center">
                            <p class="text-sm leading-none text-gray-600 ml-2">
                              {u.phone}
                            </p>
                          </div>
                        </td>
                        <td class="pl-5">
                          <div class="flex items-center">
                            <img
                              src={u.photo}
                              className="w-10 h-10 rounded-full"
                            ></img>
                          </div>
                        </td>
                        <td class="pl-5 ">
                          <div class="flex justify-center items-center">
                            <svg
                              aria-describedby="desc"
                              aria-labelledby="title"
                              role="img"
                              viewBox="0 0 64 64"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              className="w-8 h-8"
                            >
                              <path
                                d="M63.1 30.9C62.6 30.1 50 12.5 32 12.5S1.4 30.1.9 30.9L.1 32l.8 1.1c.5.8 13.1 18.4 31.1 18.4s30.6-17.6 31.1-18.4l.8-1.1zM32 47.5C18.5 47.5 8 35.8 5 32c3-3.8 13.5-15.5 27-15.5S56 28.2 59 32c-3 3.8-13.5 15.5-27 15.5z"
                                data-name="layer2"
                                fill="#00FF00"
                              />
                              <path
                                d="M32 19.5a12 12 0 1 0 12 12 12 12 0 0 0-12-12zm0 18a6 6 0 0 1-5.2-9 2 2 0 0 1 3.5 2 2 2 0 0 0-.3 1 2 2 0 0 0 2 2 2 2 0 1 1 0 4z"
                                data-name="layer1"
                                fill="#202020"
                              />
                            </svg>
                          </div>
                        </td>
                        <td class="pl-5 ">
                          <div class="flex justify-center items-center">
                            <svg
                              aria-describedby="desc"
                              aria-labelledby="title"
                              role="img"
                              viewBox="0 0 64 64"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              className="w-8 h-8"
                            >
                              <path
                                d="M63.1 30.9C62.6 30.1 50 12.5 32 12.5S1.4 30.1.9 30.9L.1 32l.8 1.1c.5.8 13.1 18.4 31.1 18.4s30.6-17.6 31.1-18.4l.8-1.1zM32 47.5C18.5 47.5 8 35.8 5 32c3-3.8 13.5-15.5 27-15.5S56 28.2 59 32c-3 3.8-13.5 15.5-27 15.5z"
                                data-name="layer2"
                                fill="#FF0000"
                              />
                              <path
                                d="M32 19.5a12 12 0 1 0 12 12 12 12 0 0 0-12-12zm0 18a6 6 0 0 1-5.2-9 2 2 0 0 1 3.5 2 2 2 0 0 0-.3 1 2 2 0 0 0 2 2 2 2 0 1 1 0 4z"
                                data-name="layer1"
                                fill="#202020"
                              />
                            </svg>
                          </div>
                        </td>
                      </tr>
                    ))
                  : ""}
              </tbody>
            </table>
            <div class="flex justify-center">
              {currentPage !== 1?
              <button
              onClick={()=>setCurrentPage(currentPage-1)}
              class="mx-2 my-4 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded"
            >
              <p class="text-sm font-medium leading-none text-white">{"<"}</p>
            </button>
              :""}
            {usersF.length >= 5?
            <button
            onClick={()=>setCurrentPage(currentPage+1)}
            class="mx-2 my-4 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded"
          >
            <p class="text-sm font-medium leading-none text-white">{">"}</p>
          </button>
            
            
            :""}
              
              

              
            </div>
          </div>
        </div>
      </div>

      {/* <Tabla></Tabla> */}
    </main>
  );
}
