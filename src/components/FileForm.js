import React, { useState } from "react";
import axios from "axios";

function FileForm(props){
    const [file,setFile] = useState();

    const submitFile = (e) => {
        e.preventDefault();
        console.log(file)
        const formData = new FormData();
        formData.append('file',file)
        axios.post(
            `http://192.168.0.72:8080/${props.param}`,
            formData,
            {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            }
            )
    }

    const handleChangeFile = (event) =>{
        setFile(event.target.files[0])
    }

    return(
        <>
          <h4 className="text2 text-2xl text-center font-thin w-full mb-5">Está conectado a la otra computadora! Empiece a transferir archivos:</h4>
          <form onSubmit={submitFile}>
            <input type="file" onChange={handleChangeFile} />
            <button className="rounded-none p-4 bg-color2" type="submit">Enviar</button>
          </form>
        </>
    )
}

export default FileForm;