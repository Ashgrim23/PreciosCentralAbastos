import React, { useState } from 'react'
import Fade from 'react-reveal/Fade'

export default function Header(props) {
    const [hover, sethover] = useState("")

    function handleHover(e) {        
        sethover(e.currentTarget.id)             
    }
    
    function handleOut(e){
        sethover("")        
    }

    return (        
        <div className="pt-5 mb-3 md:pt-7 md:pl-10 px-2 flex justify-center md:justify-start items-center">                        
            <Fade top cascade>
            <ul className="flex w-full justify-evenly md:justify-start md:space-x-3 ">                
                <li id ="Abarrotes" className="text-center" onMouseLeave={handleOut} onMouseEnter={handleHover} onClick={props.toggleItems} >
                   <div key={hover}>                         
                        <i className={"fas faa-pulse fa-shopping-basket text-2xl "+(hover=='Abarrotes' && "text-yellow-600 zoom")} />                                                    
                    </div>
                    <p className="text-sm font-semibold ">Abarrotes</p>                   
                </li>
                <li id="Cárnicos"  className="text-center" onMouseLeave={handleOut} onMouseEnter={handleHover} onClick={props.toggleItems}>
                    <div key={hover}>
                        <i  className={"fas fa-drumstick-bite text-2xl "+(hover=="Cárnicos" && "text-red-900 zoom") }/>
                    </div>                    
                    <p className="text-sm font-semibold">Cárnicos</p>
                </li>
                <li id="Frutas" className="text-center" onMouseLeave={handleOut} onMouseEnter={handleHover} onClick={props.toggleItems}>
                    <div key={hover}>
                        <i className={"fas fa-apple-alt text-2xl "+(hover=="Frutas" && "text-red-600 zoom")}/>                  
                    </div>
                    <p className= "text-xs sm:text-sm font-semibold">Frutas</p>
                </li>
                <li id="Verduras y Legumbres" className="text-center " title="Verduras y Legumbres" onMouseLeave={handleOut} onMouseEnter={handleHover} onClick={props.toggleItems}>
                    <div key={hover}>
                        <i className={"fas fa-carrot  text-2xl "+(hover=="Verduras y Legumbres" && "text-orange-600 zoom")}/>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold" >Verduras</p>                    
                </li>
            </ul>    
            </Fade>        
        </div>
    )
}
