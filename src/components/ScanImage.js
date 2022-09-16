import React, { useEffect, useState } from "react";
import io from 'socket.io-client';
import FileForm from "./FileForm";
import DownloadBtn from "./DownloadBtn";
const QR = require('qrcode')

const serverURL = "localhost" //5.229.86.15
const serverPORT = "7000"

function ScanImage(props){

  const [socket,setSocket] = useState(null);
  const [url,setUrl] = useState();
  const [id,setId] = useState();
  const [qr,setQr] = useState(null);
  const [param] = useState(new URLSearchParams(window.location.search).get("id"));
  const [files,setFiles] =useState([]);
  const [emptyRoom,setEmptyRoom] = useState(false)

  const getQR = () => {
    socket.emit("newRoom",null)
  }

  const shouldShowButton = () => {
    return (param === null && qr === null)
  }

  const handleSocketError = (error) => {
    switch (error) {
      case "emptyroom":
        console.log("ROOM VACÍA!!!")
        setEmptyRoom(true);
        break;
    
      default:
        console.log(error)
        break;
    }
  }


  useEffect ( () => {
    if (socket === null){
      setSocket(io(`${serverURL}:${serverPORT}`))
    }
    if (socket !== null){
      socket.on("connect", () => {
        console.log(socket.id)
        setId(socket.id)
      })
      socket.on("error", (err) => {
        console.log(err)
        switch (err.code) {
          case 0:
            handleSocketError(err.text);
            break;
          case 1:
            alert(err.text)
            break;
          default:
            console.log(err.text);
        }
      })


      if (param === null){
        socket.on("newRoom", (id) => {
          setUrl(id);
          QR.toDataURL(window.location.origin+"?id="+id, (err,code) => {
            if (err) return console.log("Error en el qr");
            console.log(window.location.origin+"?id="+id)
            setQr(code)
          })
        })
        socket.on("newFile", (filename) =>{
          console.log("Archivo listo para descargar")
          setFiles(files.concat(filename))
        })
        

      }else{
        socket.emit('join',param)
      }




    }
  },[files,setFiles,setSocket,param,socket])

  return(
    <div className='flex items-center justify-center flex-col mx-auto'>
      { shouldShowButton() &&
        <button onClick={getQR} className='rounded-none p-4 bg-color1'>Crear QR</button>
      }
      { qr !== null &&
        <div className='flex flex-col'>
          <h4 className='text2 text-2xl text-center font-thin w-full mb-5'>Escanee este QR con su teléfono para empezar a transferir archivos</h4>
          <img className='mx-auto' height={200} width={200} alt="Escanee este QR" src={qr} />
          <a className="text-center text-white" href={"?id="+url} > <small className="text-white">{`${window.location.origin}?id=${url}`}</small> </a>
        </div>
      }
      { param !== null &&
        <FileForm emptyRoom={emptyRoom} id={id} url={`${serverURL}:${serverPORT}`} param={param} />
      }
      { files !== undefined && files.map((file,index) => 
          <DownloadBtn url={`${serverURL}:${serverPORT}`} key={file} filename={file} index={index}/>
        )
      }
    </div>
  )
}

export default ScanImage;