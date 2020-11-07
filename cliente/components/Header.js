import React, { useState } from 'react'
import Fade from 'react-reveal/Fade'

export default function Header() {
    const [hover, sethover] = useState("")

    function handleHover(e) {        
        sethover(e.currentTarget.id)             
    }
    
    function handleOut(e){
        sethover("")        
    }

    return (        
        <div className="pt-5 md:pt-7 md:pl-10 px-2 flex justify-center md:justify-start items-center">                        
            <Fade top cascade>
            <ul className="flex w-full justify-evenly md:justify-start md:space-x-3 ">
                <li id ="abarrotes" className="text-center" onMouseLeave={handleOut} onMouseEnter={handleHover} >
                   <div key={hover}>                         
                        <i className={"fas faa-pulse fa-shopping-basket text-2xl "+(hover=='abarrotes' && "text-yellow-600 zoom")} />                                                    
                    </div>
                    <p className="text-sm font-semibold ">Abarrotes</p>                   
                </li>
                <li id="carnicos"  className="text-center" onMouseLeave={handleOut} onMouseEnter={handleHover}>
                    <div key={hover}>
                        <i  className={"fas fa-drumstick-bite text-2xl "+(hover=="carnicos" && "text-red-900 zoom") }/>
                    </div>                    
                    <p className="text-sm font-semibold">Cárnicos</p>
                </li>
                <li id="frutas" className="text-center" onMouseLeave={handleOut} onMouseEnter={handleHover}>
                    <div key={hover}>
                        <i className={"fas fa-apple-alt text-2xl "+(hover=="frutas" && "text-red-600 zoom")}/>                  
                    </div>
                    <p className= "text-xs sm:text-sm font-semibold">Frutas</p>
                </li>
                <li id="verduras" className="text-center " title="Verduras y Legumbres" onMouseLeave={handleOut} onMouseEnter={handleHover}>
                    <div key={hover}>
                        <i className={"fas fa-carrot  text-2xl "+(hover=="verduras" && "text-orange-600 zoom")}/>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold" >Verduras</p>                    
                </li>
            </ul>    
            </Fade>        
        </div>
    )
}
