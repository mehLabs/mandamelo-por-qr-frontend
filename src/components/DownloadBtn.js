import React from "react";
import axios from "axios";

function DownloadBtn(props){
    
    const download = async () => {
 
        const re = /(?:\.([^.]+))?$/;
        const ext = re.exec(props.filename)[1];

        const url= `http://192.168.0.72:8080/download/${props.filename}`;
        axios({
            url:url,
            method: 'GET',
            responseType: 'blob',
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'file.'+ext);
            document.body.appendChild(link);
            link.click();
        })
    }

    return(
        <button onClick={download} className="rounded-none my-4 p-4 bg-color2">Descargar archivo</button>
    )

}

export default DownloadBtn;