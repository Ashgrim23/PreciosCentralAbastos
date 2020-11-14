import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import axios from 'axios'
import Loading from '../components/Loading'
import Main from '../components/main';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'


export default function Index() {
    moment.locale('es');
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    const dias=['do','lu','ma','mi','ju','vi','sá']

    const [loading, setloading] = useState(false)
    const [precios, setPrecios] = useState([])
    const [filtro, setFiltro] = useState("Abarrotes")
    const [itemsFiltrados, setitemsFiltrados] = useState([])
    const [fecha, setFecha] = useState(new Date());
    
  
    useEffect(async()=>{
        setloading(true)            
        console.log(fecha)
        const result=await axios.get(`http://localhost:3000/api/precios/${moment(fecha).format("YYYY-MM-DD")}`)                      
        setPrecios(result.data.rows);        
        setitemsFiltrados(result.data.rows.filter(item=>item.CATEGORIA===filtro))        
        setloading(false)        
    },[fecha])

    const toggleItems=(e)=>{      
        console.log('asdas')
        if (precios.length<=0) return         
        setFiltro(e.currentTarget.id)        
        setitemsFiltrados(precios.filter(item=>item.CATEGORIA===e.currentTarget.id))        
    }

    const onDeltaClick=(e)=>{     
        if (loading) return
        var newDate;
         if (e.currentTarget.id==='deltaPrev') {
            newDate=moment(fecha).subtract(1,'days').toDate()
         } else if (e.currentTarget.id==='deltaFwd') {
            newDate=moment(fecha).add(1,'days').toDate()
         }
         setFecha(newDate)
    }

    
    const Input = ({ value, onClick }) => (
        <span className="text-xs border border-gray-900 hover:border-indigo-600  p-2 rounded  cursor-pointer"  onClick={onClick}>
         <i className="fa fa-calendar-alt mr-2 text-lg "></i>
         {value}
        </span>
    );

        return (        
            <div className="container antialiased flex flex-col-reverse md:flex-col h-screen ">            
                <nav id="headerContainer" className="flex flex-col-reverse md:flex-col border-solid border-black rounded border md:border-none" >
                    <Header toggleItems={toggleItems}  />
                    <div className="flex flex-col  items-center justify-center border-b-2 p-1">                            
                            <span className="text-xl">{filtro}</span>
                            <div  className="flex">
                                <div  id="deltaPrev" onClick={onDeltaClick}><i  className="text-3xl cursor-pointer fa fa-caret-square-left mx-2" /></div>
                                <DatePicker              
                                    dateFormat="dd 'de' MMMM 'del' yyyy"    
                                    todayButton="Hoy"
                                    withPortal                
                                    selected={fecha} 
                                    onChange={date => setFecha(date)} 
                                    customInput={<Input />}
                                    locale={{
                                        localize:{
                                            month:n=>meses[n],
                                            day:n=>dias[n]
                                        },
                                        formatLong: {}
                                    }}
                                />
                                <div id="deltaFwd" onClick={onDeltaClick}>
                                    <i  className="text-3xl fa fa-caret-square-right cursor-pointer mx-2" />
                                </div>                    
                            </div>
                        </div>  
                </nav>
                
                <div className="px-8 sm:mb-0" style={{overflow:"auto"}}>
                    {!loading ? 
                        <div>   
                            <Main items={itemsFiltrados} />                                           
                            {(itemsFiltrados.length>0 && moment(itemsFiltrados[0].FECHA).format('DD/MM/YYYY')!=moment(fecha).format('DD/MM/YYYY') ) &&
                                <div>                                
                                    <p className="text-sm">Precios no disponibles en la fecha seleccionada, mostrando precios mas recientes al: <span className="font-semibold">{moment(itemsFiltrados[0].FECHA).format("DD [de] MMMM [del] yyyy")}</span></p>                            
                                </div>
                            }    
                            <p className="text-sm"> Información diaria proporcionada por <b><a href="https://www.ficeda.com.mx/" target="_blank" >ficeda.com.mx</a></b></p>                        
                                
                        </div>                    
                        :<Loading/>
                    }
                    
                </div>
            </div>
    )
}