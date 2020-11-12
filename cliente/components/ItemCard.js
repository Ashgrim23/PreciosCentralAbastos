import React from 'react'


export default function ItemCard(props) {
    
    function getImage(desc){
        const imgName=desc.replace(/ /g,"")
        return `https://centraldeabastos.s3.us-east-2.amazonaws.com/${imgName}.jpg`
    }

    return (
        <div className="w-full sm:w-1/2  md:w-1/4 text-center p-2 " > 
            <div className="rounded-lg p-2" style={{WebkitBoxShadow:"1px 1px 3px rgba(0,0,0,0.4)"}}>
                <p  className="mb-1  text-xl">{props.data.DESCRIPCION}</p>
                <img className="m-auto" style={{width:"60%"}} src={getImage(props.data.DESCRIPCION)}></img>                
                <p className="text-gray-800 ">{props.data.PRECIO} <span className="align-bottom text-xs text-gray-600">Pesos /{props.data.UNIDAD} </span></p>
                
            </div>
        </div>
    )
}

