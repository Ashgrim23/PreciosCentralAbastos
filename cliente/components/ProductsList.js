import React from 'react'
import ItemCard from './ItemCard'
import Fade from 'react-reveal'

export default function ProductsList(props) {
    
    return (        
        <Fade left cascade={true}>
            <div className="flex flex-wrap  p-2 border-black mb-2">
                {props.items.map((item) => (
                    <div key={item.DESCRIPCION} id={item.DESCRIPCION} onClick={props.onCardclick} className="w-full sm:w-1/2  md:w-1/4 text-center p-2 ">
                        <ItemCard data={item} />
                    </div>
                ))}
            </div>
        </Fade>        
    )
}
