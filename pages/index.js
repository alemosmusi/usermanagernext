import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getProyectos } from '@/redux/actions'
import { collection, addDoc, getDocs, doc, setDoc } from "firebase/firestore";
import {db} from '@/firebase/firebaseConfig'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

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
      <div>prueba</div>
      
    </main>
  )
}
