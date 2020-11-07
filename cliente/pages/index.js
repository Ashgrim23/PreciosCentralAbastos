import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import axios from 'axios'
import Loading from '../components/Loading'
import Main from '../components/main';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));


export default function Index() {
    const [precios, setPrecios] = useState([])
    const [preciosHoy, setPreciosHoy] = useState([])
    

    useEffect(async()=>{
        const result=await axios.get('http://localhost:3000/api/precios')        
        setPrecios(result.data);
        const ultimaFecha=result.data[0].FECHA.substring(0,10)            
        const arrHoy=result.data.filter(item=>item.FECHA.substring(0,10)==ultimaFecha)        
        setPreciosHoy(arrHoy);
    },[])

    return (        
        <div className="container">            
            <Header />
            <div className="p-4">
                {(precios.length>0 && preciosHoy.length>0)>0 ? 
                    <div>
                        <Main data={{precios:precios,preciosHoy:preciosHoy}} />
                        <p>Información diaria proporcionada por <b><a href="https://www.ficeda.com.mx/" target="_blank" >ficeda.com.mx</a></b></p>                        
                    </div>                    
                    :<Loading/>
                }
                
            </div>
        </div>
    )
}