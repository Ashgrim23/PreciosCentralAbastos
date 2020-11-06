import React from 'react'

export default function Header() {
    return (
        <div className="bg-blue-800 p-4 flex justify-between items-center">
            <p className="text-white text-lg">Precios en la Central de Abastos al: 2020-05-11</p>
            <ul className="flex space-x-3 justify-between px-5">
                <li className="text-center">
                    <i className="fas fa-shopping-basket text-white  text-2xl"></i>                    
                    <p className="text-white text-base">Abarrotes</p>
                </li>
                <li className="text-center">
                    <i className="fas fa-drumstick-bite text-white  text-2xl"></i>                    
                    <p className="text-white text-base">Cárnicos</p>
                </li>
                <li className="text-center">
                    <i className="fas fa-apple-alt text-white  text-2xl"></i>                    
                    <p className="text-white text-base">Frutas</p>
                </li>
                <li className="text-center  text-white" alt="Verduras y Legumbres">
                    <i className="fas fa-carrot  text-2xl"></i>                    
                    <p className="text-base" >Verduras</p>                    
                </li>
            </ul>

        </div>
    )
}
