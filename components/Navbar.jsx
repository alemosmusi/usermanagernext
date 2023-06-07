import { useAuth } from '@/context/AuthContext';
import { db } from '@/firebase/firebaseConfig';
import { sesionLog } from '@/redux/actions';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

export const Navbar = () => {
    const { currentUser } = useAuth();
    const dispatch = useDispatch()
    const usersCollection = collection(db, "users")
    const [userLog, setUserLog] = useState({})

    useEffect(() => {
        if(currentUser){
        getData();}
        
      }, [currentUser]);

      const getData = async () => {
        const docRef = doc(db, "users", currentUser.email); // Reemplaza "documento_id" con el ID del documento que deseas obtener
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const usuario = { id: docSnap.id, ...docSnap.data() };
            setUserLog(usuario);
            dispatch(sesionLog(usuario))
          } else {
            console.log("El documento no existe.");
          }
      };








  return (
    <div>Navbar</div>
  )
}
