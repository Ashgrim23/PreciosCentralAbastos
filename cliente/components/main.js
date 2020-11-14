import React, { useEffect, useState } from 'react'
import ItemCard from './ItemCard'
import Fade from 'react-reveal'

export default function Main(props) {    
    const [state, setstate] = useState(false)

    const handleClick=()=>{
        setstate(!state)
    }

    return (        
        
            <Fade left>
        <div className="flex flex-wrap  p-2 border-black mb-2">             
                {props.items.map((item,idx)=>(      
                    <div key={idx} className="w-full sm:w-1/2  md:w-1/4 text-center p-2 ">
                        <ItemCard  data={item} />
                    </div>                              
                ))}      
        </div>        
            </Fade>    
        
        
        
    )
}
