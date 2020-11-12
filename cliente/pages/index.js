import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import axios from 'axios'
import Loading from '../components/Loading'
import Main from '../components/main';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));


export default function Index() {
    const [loading, setloading] = useState(false)
    const [precios, setPrecios] = useState([])
    const [preciosHoy, setPreciosHoy] = useState([])
    const [filtro, setFiltro] = useState("Abarrotes")
    const [itemsFiltrados, setitemsFiltrados] = useState([])

    useEffect(async()=>{
        setloading(true)
        const result=await axios.get('http://localhost:3000/api/precios')        
        const ultimaFecha=result.data[0].FECHA.substring(0,10)            
        const arrHoy=result.data.filter(item=>item.FECHA.substring(0,10)==ultimaFecha)                
        setPrecios(result.data);
        setPreciosHoy(arrHoy);        
        setitemsFiltrados(preciosHoy.filter(item=>item.CATEGORIA===filtro))
        setloading(false)
    },[])

    const toggleItems=(e)=>{      
        if (precios.length<=0) return         
        setFiltro(e.currentTarget.id)        
        setitemsFiltrados(preciosHoy.filter(item=>item.CATEGORIA===e.currentTarget.id))        
    }

    return (        
        <div className="container antialiased text-gray-900">            
            <Header toggleItems={toggleItems}  />
            <div className="p-4">
                {!loading ? 
                    <div>
                        <p className="text-xl p-2 border-b-2 text-center mt-2">{filtro}</p>
                        <Main items={itemsFiltrados} />
                        <p>Información diaria proporcionada por <b><a href="https://www.ficeda.com.mx/" target="_blank" >ficeda.com.mx</a></b></p>                        
                    </div>                    
                    :<Loading/>
                }
                
            </div>
        </div>
    )
}