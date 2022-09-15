import React, { useEffect, useState } from "react";
import io from 'socket.io-client';
import FileForm from "./FileForm";
import DownloadBtn from "./DownloadBtn";
const QR = require('qrcode')

const serverURL = "192.168.0.72"
const serverPORT = "8080"

function ScanImage(props){

  const [socket,setSocket] = useState(null);
  const [qr,setQr] = useState(null);
  const [param] = useState(new URLSearchParams(window.location.search).get("id"));
  const [file,setFile] =useState();

  const getQR = () => {
    socket.emit("newRoom",null)
  }

  const shouldShowButton = () => {
    return (param === null && qr === null)
  }


  useEffect ( () => {
    if (socket === null){
      setSocket(io(`${serverURL}:${serverPORT}`))
    }
    if (socket !== null){

      console.log(param)
      if (param === null){
        socket.on("newRoom", (id) => {
          QR.toDataURL(serverURL+":3000/?id="+id, (err,code) => {
            if (err) return console.log("Error en el qr");
            console.log(serverURL+":3000/?id="+id)
            setQr(code)
          })
        })
        socket.on("newFile", (filename) =>{
          console.log("Archivo listo para descargar")
          setFile(filename)
        })

      }else{
        socket.emit('join',param)
      }




    }
  },[setSocket,param,socket])

  return(
    <div className='flex h-96 items-center justify-center flex-col mx-auto'>
      { shouldShowButton() &&
        <button onClick={getQR} className='rounded-none p-4 bg-color1'>Crear QR</button>
      }
      { qr !== null &&
        <div className='flex flex-wrap'>
          <h4 className='text2 text-2xl text-center font-thin w-full mb-5'>Escanee este QR con su teléfono para empezar a transferir archivos</h4>
          <img className='mx-auto' height={200} width={200} alt="Escanee este QR" src={qr} />
        </div>
      }
      { param !== null &&
        <FileForm param={param} />
      }
      { file !== undefined &&
        <DownloadBtn filename={file} />
      }
    </div>
  )
}

export default ScanImage;