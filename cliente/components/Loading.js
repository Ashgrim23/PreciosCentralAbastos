import React from 'react'
import Fade from 'react-reveal/Fade'

export default function Loading() {
    
    return (
        <div className="flex" style={{height: "50vh"}}>      
            <Fade left forever cascade>
                <p className="m-auto text-3xl text-gray-600 ">Cargando...</p> 
            </Fade>                 
        </div>
    )
}
