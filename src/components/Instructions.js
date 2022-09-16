import { useState } from "react";

function Instructions(props){

    const [dismiss,setDismiss] = useState(false);

    const close = () => {
        setDismiss(true)
    }

    return(
        <>
        {   !dismiss
            &&
            <div className="mx-auto mt-8 p-6 max-w-xl bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-between">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Instrucciones de uso</h5>
                    <button onClick={close}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                        </svg>
                    </button>
                </div>
                <ol className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    <li>1- Abrir página en la computadora que va a <strong>RECIBIR</strong> el archivo</li>
                    <li>2- Presionar el botón <strong>"Crear QR"</strong></li>
                    <li>3- <strong>Escanear</strong> el QR desde el celular</li>
                    <li>4- Elegir el archivo a enviar y presionar <strong>ENVIAR</strong></li>
                    <li>5- Presione <strong>Descargar archivo</strong> desde su computadora</li>
                    <li>6- ¡LISTO!</li>
                </ol>
            </div>
        }
        </>
    )
}

export default Instructions;