import React, { useEffect, useState } from 'react'
import ItemCard from './ItemCard'

export default function Main(props) {    
    return (
        <div className="flex flex-wrap  p-2 border-black">            
            {props.items.map((item,idx)=>(                
                <ItemCard key={idx} data={item} />
                
            ))}            
        </div>
    )
}
