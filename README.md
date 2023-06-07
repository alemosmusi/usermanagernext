# Proyecto Next.js

Este es un proyecto de [Next.js](https://nextjs.org/) creado con [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Inicio rápido

Para comenzar, sigue estos pasos:

1. Clona el repositorio y navega hasta la carpeta del proyecto.

2. Instala las dependencias del proyecto ejecutando el siguiente comando en tu terminal:

npm install

3. Crea un archivo llamado .env.local en la raíz del proyecto y agrega los datos proporcionados de Firebase:

NEXT_PUBLIC_APIKEY="su clave"
NEXT_PUBLIC_AUTHDOMAIN="su clave"
NEXT_PUBLIC_PROJECTID="su clave"
NEXT_PUBLIC_STORAGEBUCKET="su clave"
NEXT_PUBLIC_MESSAGINGSENDERID="su clave"
NEXT_PUBLIC_APPID="su clave"

Asegúrate de reemplazar "su clave" con los valores correctos proporcionados por Firebase.

4. Una vez que hayas configurado el archivo .env.local, puedes iniciar el servidor de desarrollo ejecutando el siguiente comando:

npm run dev

Luego, abre http://localhost:3000 en tu navegador para ver el resultado.