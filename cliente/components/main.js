import React from 'react'

export default function Main(props) {
    console.log(props)
    return (
        <div>
            {props.data.preciosHoy.map(item=>(
                <div className="flex justify-start space-x-5">
                    <p>{item.CATEGORIA}</p>
                    <p>{item.DESCRIPCION}</p>
                    <p>{item.PRECIO}</p>
                    <p>{item.FECHA.substring(0,10)}</p>
                </div>
            ))}
        </div>
    )
}
