import React from "react";


function FormBase64 () {


    const uploadImage =async (e) => {
        // const file = e.target.files[0];
        // const reader = new FileReader();
        // reader.readAsDataURL(file);
        // reader.onloadend = () => {
        //     console.log(reader.result);
        // }
        console.log(e.target.files)
        const file = e.target.files[0];
        const base64 = await convertBase64(file )
        console.log(base64)
    }
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }
return(
    <>
    <div>
        <input type="file"className="w-1/2  file:h-10 file:rounded text-sm text-white file:border-0 file:text-sm file:font-semibold file:bg-yellow-500 file:text-black hover:file:bg-yellow-600 " onChange={(e)=>{
            uploadImage(e);
        }} />
    </div>
    </>
)
    
}

export default FormBase64;