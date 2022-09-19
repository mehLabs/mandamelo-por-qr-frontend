import React from "react";
import axios from "axios";

function DownloadBtn(props){
    const re = /(?:\.([^.]+))?$/;
    const ext = re.exec(props.filename)[1];
    
    const download = async () => {
 

        const url= `http://${props.url}/download/${props.filename}`;
        axios({
            url:url,
            method: 'GET',
            responseType: 'blob',
        }).then((response) => {
            try {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'file.'+ext);
                document.body.appendChild(link);
                link.click();
            } catch (error) {
                console.log(error)
            }
        }).catch((error) => {
            if (error.response.status === 404){
                alert("El archivo ya no existe, el servidor lo borró. Por favor, suba el archivo nuevamente.")
                props.handleDeleteBtn(props.index)
            }
        })
    }

    return(
        <button onClick={download} className="rounded-none my-4 p-4 bg-color2 hover:bg-color2-500">Descargar archivo {props.index+1} .{ext}</button>
    )

}

export default DownloadBtn;