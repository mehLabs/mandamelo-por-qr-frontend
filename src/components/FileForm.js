import React, { useState } from "react";
import axios from "axios";

function FileForm(props){
    const [file,setFile] = useState();
    const [percentile,setPercentile] = useState(0);
    const [uploaded,setUploaded] = useState(false);


    let cancelTokenSource = axios.CancelToken.source();
    const config = {
        headers: {
            "Content-type": "multipart/form-data"
        },
        onUploadProgress: (progressEvent) => {
            if (progressEvent.total > 1024*1024*1024){
                cancelTokenSource.cancel("Archivo demasiado grande")
            }
            const percentileCompleted = (progressEvent.loaded / progressEvent.total) * 100;
            setPercentile(percentileCompleted);
        },
        cancelToken : cancelTokenSource.token
    }

    const submitFile = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file',file)
        console.log(`http://${props.url}/${props.param}?id=${props.id}`)
        axios.post(
            `http://${props.url}/${props.param}?id=${props.id}`,
            formData,
            config
            ).catch( (err) => {
                console.log(err)
                if (err.code === "ERR_CANCELED" || err.response.status === 413){
                    alert("Archivo demasiado grande. Máximo 1GB")
                    setPercentile(0)
                }
            }).then( (status) => {
                console.log(status)
                setUploaded(true)
            })
    }

    const handleChangeFile = (event) =>{
        setFile(event.target.files[0])
    }

    const dismiss = () => {
        setUploaded(false)
    }

    return(
        <>
            <h4 className="text2 text-2xl text-center font-thin w-full mb-5">
            {   !props.emptyRoom
                ? "Está conectado a la otra computadora! Empiece a transferir archivos:"
                : "La otra computadora se ha desconectado, intente escanear el QR nuevamente"

            }
            </h4>
            <form className="flex flex-col gap-4" onSubmit={submitFile}>
                <input type="file" onChange={handleChangeFile} />
                <button className="rounded-none p-4 bg-color2 hover:bg-color2-500" type="submit">Enviar</button>
                {   percentile > 0 &&
                    <div className="w-full h-6 bg-gray-200 rounded-full dark:bg-gray-700">
                        <div className="h-6 bg-white rounded-full dark:bg-blue-500" style={{width: +Math.round(percentile)+"%"}}>
                            <p className="text-center">{Math.round(percentile)} %</p>
                        </div>
                    </div>
                }
            </form>

            { uploaded &&
                <div id="toast-default" className="absolute bottom-5 left-5 flex items-center p-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                    <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                        </svg>
                        <span className="sr-only">Fire icon</span>
                    </div>
                    <div className="ml-3 text-sm font-normal">Archivo subido correctamente</div>
                    <button id="toast-btn" onClick={dismiss} type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-default" aria-label="Close">
                        <span className="sr-only">Close</span>
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
            }

        </>
    )
}

export default FileForm;