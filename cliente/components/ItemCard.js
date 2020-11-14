import React from 'react'


export default function ItemCard(props) {
    
    const precioAnt=props.data.PRECIO-props.data.PRECIOANT
    const precioPorc=((props.data.PRECIO/props.data.PRECIOANT-1)*100).toFixed(2)

    function getImage(desc){
        const imgName=desc.replace(/ /g,"")
        return `https://centraldeabastos.s3.us-east-2.amazonaws.com/${imgName}.jpg`
    }

    return (
            <div className=" rounded-lg p-2 cursor-pointer" style={{WebkitBoxShadow:"1px 1px 3px rgba(0,0,0,0.4)"}}>
                <p  className="mb-1  text-l font-semibold ">{props.data.DESCRIPCION}</p>
                <div className="flex justify-evenly">
                    <img className="rounded-full border-solid border-2 border-gray-600"  style={{width:"100px",height:"100px",objectFit:"cover"}} src={getImage(props.data.DESCRIPCION)}></img>                
                    
                    <div className="text-right">
                        <p className="text-gray-800 font-bold text-2xl ">${props.data.PRECIO} <span className=" text-sm font-light text-gray-600">Pesos /{props.data.UNIDAD} </span></p>
                        <div className="leading-4 mt-2">
                        <p className={"font-semibold text-lg "+ (precioAnt<=0 ? "text-green-700" : "text-red-700") }>{(precioAnt>0 && "+")+precioAnt }<span className={"text-sm font-ligh "+ (precioAnt<=0 ? "text-green-700" : "text-red-700")} > Pesos </span></p>
                        <p className={"text-base font-semibold "+(precioPorc<=0 ?"text-green-700":"text-red-700")}>({(precioPorc>0?"+":"")+precioPorc}%)</p>                        
                        </div>
                    </div>                
                </div>
            </div>        
    )
}

