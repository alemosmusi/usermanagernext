import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getProyectos } from '@/redux/actions'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  // const proyectos = useSelector((state) => state.Proyectos)
  // const dispatch = useDispatch()

  useEffect(() => {
    // dispatch(getProyectos())
    
  }, [])
  
  // console.log(proyectos)

  


  return (
    <main
      // className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      
    </main>
  )
}
