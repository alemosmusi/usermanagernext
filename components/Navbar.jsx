import { useAuth } from '@/context/AuthContext';
import { db } from '@/firebase/firebaseConfig';
import { sesionLog } from '@/redux/actions';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

export const Navbar = () => {
    const router = useRouter();
    const { login, logout, currentUser } = useAuth();
    const dispatch = useDispatch()
    const usersCollection = collection(db, "users")
    const [userLog, setUserLog] = useState({})
    const [showMenu, setShowMenu] = useState(false);

  const toggleNav = () => {
    setShowMenu(!showMenu);
  };

    useEffect(() => {
        if(currentUser){
        getData();
    }else{
        router.push('/login/login');
    }
        
      }, [currentUser]);

      const getData = async () => {
        const docRef = doc(db, "users", currentUser.email); // Reemplaza "documento_id" con el ID del documento que deseas obtener
        const docSnap = await getDoc(docRef);
        if (docSnap && docSnap.id) {
            const usuario = { id: docSnap.id, ...docSnap.data() };
            setUserLog(usuario);
            dispatch(sesionLog(usuario))
          } else {
            console.log("El documento no existe.");
          }
      };





  return (
    <div className="bg-indigo-600">
    <nav className="container px-6 py-8 mx-auto md:flex md:justify-between md:items-center">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-gray-100 md:text-2xl hover:text-indigo-400"
        >
          Logo
        </Link>
        {/* Mobile menu button */}
        <div onClick={toggleNav} className="flex md:hidden">
          <button
            type="button"
            className="text-gray-100 hover:text-gray-400 focus:outline-none focus:text-gray-400"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
              <path
                fillRule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu open: "block", Menu closed: "hidden" */}
      <ul
        className={`${
          showMenu ? 'flex' : 'hidden'
        } flex-col mt-8 space-y-4 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0`}
      >
        {currentUser?
        <>
        <Link href="../../perfil" className="text-gray-100 hover:text-indigo-400">Perfil</Link>
        <button className="text-gray-100 hover:text-indigo-400" onClick={logout}>Logout</button>
        
        </>
        :
        <Link href="../../login/login" className="text-gray-100 hover:text-indigo-400">Login</Link>
        }
      </ul>
    </nav>
  </div>
  )
}
