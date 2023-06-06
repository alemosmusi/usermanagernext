import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getProyectos } from '@/redux/actions'
import { collection, addDoc, getDocs, doc, setDoc } from "firebase/firestore";
import {db} from '@/firebase/firebaseConfig'
import { useAuth } from '@/context/AuthContext'
import {Tabla} from '@/components/tabla'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {


  const { login, signup, currentUser } = useAuth();
  const [users, setUsers] = useState([])

  useEffect(() => {
      getData()
  
  }, [])
  

  const getData = async ()=>{
    const usuarios = []
    const querySnapshot = await getDocs(collection(db, "users"));
    
    querySnapshot.forEach((doc)=>{
      if(doc.data().sendDatada){
        usuarios.push(doc.data().sendDatada)
      }
    })
    setUsers(usuarios)
  }

console.log(users)

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
          <button
            onclick="popuphandler(true)"
            class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded"
          >
            <p class="text-sm font-medium leading-none text-white">Add Task</p>
          </button>
        </div>
        <div class="mt-7 overflow-x-auto">
          <table class="w-full whitespace-nowrap">
            
          <thead>
      <tr>
        <th class="">
          <div class="ml-5">
            <p class="text-base font-medium leading-none text-gray-700 mr-2">Admin</p>
          </div>
        </th>
        <th class="pl-5">
          {/* <div class="flex items-center"> */}
          <div class="flex">
            <p class="text-sm leading-none text-gray-600">Name and Lastname</p>
          </div>
        </th>
        <th class="pl-5">
          <div class="flex items-center">
            <p class="text-sm leading-none text-gray-600 ">Email</p>
          </div>
        </th>
        <th class="pl-5">
          <div class="flex items-center">
            <p class="text-sm leading-none text-gray-600 ml-2">Birthday</p>
          </div>
        </th>
        <th class="pl-5">
          <div class="flex items-center">
            <p class="text-sm leading-none text-gray-600 ml-2">Phone</p>
          </div>
        </th>
        <th class="pl-5">
          <div class="flex items-center">
            <p class="text-sm leading-none text-gray-600 ml-2">Photo</p>
          </div>
        </th>
        <th class="pl-4">
          <div class="relative px-5 pt-2">
          <p class="text-sm leading-none text-gray-600 ml-2">Comment</p>
          </div>
        </th>
        <th>
          <div class="relative px-5 pt-2">
          <p class="text-sm leading-none text-gray-600 ml-2">Private Coment</p>
          </div>
        </th>
      </tr>
    </thead>




            <tbody>
            
              {users && users.length >0?
              users.map((u,i)=>
              <tr
                tabindex="0"
                class="focus:outline-none h-16 border border-gray-100 rounded"
                key={i}
              >
              <td key={i}><div class="ml-5 flex justify-center">
                    {/* <div class="rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative"> */}
                    <div class="rounded-sm w-5 h-5 flex flex-shrink-0 items-center relative">
                      <input
                        placeholder="checkbox"
                        type="checkbox"
                        defaultChecked={u.rol === 1 ? true : false}
                      />
                    </div>
                  </div></td>
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
                    <p class="text-sm leading-none text-gray-600 ml-2">{u.birthday}</p>
                  </div>
                </td>
                <td class="pl-5">
                  <div class="flex items-center">
                    <p class="text-sm leading-none text-gray-600 ml-2">{u.phone}</p>
                  </div>
                </td>
                <td class="pl-5">
                  <div class="flex items-center">
                    <img src={u.photo} className='w-10 h-10 rounded-full'></img>
                  </div>
                </td>
              </tr>
              
              
              )
                
                
              
              :""}
              <tr
                tabindex="0"
                class="focus:outline-none h-16 border border-gray-100 rounded"
              >
                
                
                <td class="pl-5">
                  <div class="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M12.5 5.83339L7.08333 11.2501C6.75181 11.5816 6.56556 12.0312 6.56556 12.5001C6.56556 12.9689 6.75181 13.4185 7.08333 13.7501C7.41485 14.0816 7.86449 14.2678 8.33333 14.2678C8.80217 14.2678 9.25181 14.0816 9.58333 13.7501L15 8.33339C15.663 7.67034 16.0355 6.77107 16.0355 5.83339C16.0355 4.8957 15.663 3.99643 15 3.33339C14.337 2.67034 13.4377 2.29785 12.5 2.29785C11.5623 2.29785 10.663 2.67034 10 3.33339L4.58333 8.75005C3.58877 9.74461 3.03003 11.0935 3.03003 12.5001C3.03003 13.9066 3.58877 15.2555 4.58333 16.2501C5.57789 17.2446 6.92681 17.8034 8.33333 17.8034C9.73985 17.8034 11.0888 17.2446 12.0833 16.2501L17.5 10.8334"
                        stroke="#52525B"
                        stroke-width="1.25"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                    <p class="text-sm leading-none text-gray-600 ml-2">04/07</p>
                  </div>
                </td>
                <td class="pl-5">
                  <button class="py-3 px-3 text-sm focus:outline-none leading-none text-red-700 bg-red-100 rounded">
                    Due today at 18:00
                  </button>
                </td>
                <td class="pl-4">
                  <button class="focus:ring-2 focus:ring-offset-2 focus:ring-red-300 text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none">
                    View
                  </button>
                </td>
                <td>
                  <div class="relative px-5 pt-2">
                    <button
                      class="focus:ring-2 rounded-md focus:outline-none"
                      onclick="dropdownFunction(this)"
                      role="button"
                      aria-label="option"
                    >
                      <svg
                        class="dropbtn"
                        onclick="dropdownFunction(this)"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M4.16667 10.8332C4.62691 10.8332 5 10.4601 5 9.99984C5 9.5396 4.62691 9.1665 4.16667 9.1665C3.70643 9.1665 3.33334 9.5396 3.33334 9.99984C3.33334 10.4601 3.70643 10.8332 4.16667 10.8332Z"
                          stroke="#9CA3AF"
                          stroke-width="1.25"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          d="M10 10.8332C10.4602 10.8332 10.8333 10.4601 10.8333 9.99984C10.8333 9.5396 10.4602 9.1665 10 9.1665C9.53976 9.1665 9.16666 9.5396 9.16666 9.99984C9.16666 10.4601 9.53976 10.8332 10 10.8332Z"
                          stroke="#9CA3AF"
                          stroke-width="1.25"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          d="M15.8333 10.8332C16.2936 10.8332 16.6667 10.4601 16.6667 9.99984C16.6667 9.5396 16.2936 9.1665 15.8333 9.1665C15.3731 9.1665 15 9.5396 15 9.99984C15 10.4601 15.3731 10.8332 15.8333 10.8332Z"
                          stroke="#9CA3AF"
                          stroke-width="1.25"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </button>
                    <div class="dropdown-content bg-white shadow w-24 absolute z-30 right-0 mr-6 hidden">
                      <div
                        tabindex="0"
                        class="focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white"
                      >
                        <p>Edit</p>
                      </div>
                      <div
                        tabindex="0"
                        class="focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white"
                      >
                        <p>Delete</p>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>





























      {/* <Tabla></Tabla> */}
    </main>
  )
}
