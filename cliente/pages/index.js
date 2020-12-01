import React, { useEffect } from 'react'
import Header from '../components/Header'
import Loading from '../components/Loading'
import Main from '../components/main';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'
import moment from 'moment'
import {connect} from 'react-redux'
import {setState } from '../redux/appActions'



function Index(props) {
    moment.locale('es');    
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    const dias=['do','lu','ma','mi','ju','vi','sá']    
    
    
    useEffect(async()=>{        
        if (!props.isLoading)  props.setState({isLoading:true})
        const HOST = process.env.HOST ? process.env.HOST :"http://localhost:3000"
        const result=await axios.get(`${HOST}/api/precios/${moment(props.fecha).format("YYYY-MM-DD")}`)   
        const datos={
            precios:result.data.rows,
            itemsFiltrados:result.data.rows.filter(item=>item.CATEGORIA===props.filtro), 
            isLoading:false,
            producto:null           
        }        
        props.setState(datos)            

    },[props.fecha])


    const toggleItems=(e)=>{               
        if (props.precios.length<=0) return  
        let data={
            producto:null,
            filtro:e.currentTarget.id,
            itemsFiltrados:props.precios.filter(item=>item.CATEGORIA===e.currentTarget.id)}
        props.setState(data) 
        
    }

    const onDeltaClick=(e)=>{     
        if (props.isLoading) return
        var newDate;
         if (e.currentTarget.id==='deltaPrev') {
            newDate=moment.utc(props.fecha).subtract(1,'days').toDate()
         } else if (e.currentTarget.id==='deltaFwd') {
            newDate=moment.utc(props.fecha).add(1,'days').toDate()
         }
         props.setState({fecha:newDate})         
    }

    
    const Input = ({ value, onClick }) => (
        <span className="text-xs border border-gray-900 hover:border-indigo-600  p-2 rounded  cursor-pointer"  onClick={onClick}>
         <i className="fa fa-calendar-alt mr-2 text-lg "></i>
         {value}
        </span>
    );

        return (            
            <React.Fragment>
            <div className=" antialiased justify-between md:justify-start  flex  flex-col-reverse md:flex-col h-screen ">                           
                <p className="antialiased text-2xl text-center hidden md:block">Precios Central de Abastos</p>
                <nav id="headerContainer" className="flex flex-col-reverse md:flex-col border-solid border-black rounded border md:border-none" >
                    <Header toggleItems={toggleItems}  />
                    <div className="flex flex-col  items-center justify-center border-b-2 p-1">                            
                            <span className="text-xl hidden md:block ">{props.filtro}</span>
                            <div  className="flex my-2 md:mt-4">
                                <div  id="deltaPrev" onClick={onDeltaClick}><i  className="text-3xl cursor-pointer fa fa-caret-square-left mx-2" /></div>
                                <DatePicker              
                                    dateFormat="dd 'de' MMMM 'del' yyyy"    
                                    todayButton="Hoy"
                                    withPortal                
                                    selected={props.fecha} 
                                    onChange={date => props.setState({fecha:date,isLoading:true})} 
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
                    {!props.isLoading ? 
                        <React.Fragment>
                            <div style={{overflow:"auto"}}>   
                                <Main />       
                                <ul className="list-disc mx-5 md:mx-10">
                                {(props.itemsFiltrados.length>0 && moment.utc(props.itemsFiltrados[0].FECHA).format('DD/MM/YYYY')!=moment(props.fecha).format('DD/MM/YYYY') ) &&                                                       
                                    <li className="text-xs md:text-sm">Precios no disponibles en la fecha seleccionada, mostrando precios mas recientes al: <span className="font-semibold">{moment.utc(props.itemsFiltrados[0].FECHA).format("DD [de] MMMM [del] yyyy")}</span></li>                                                            
                                }    
                                    <li className="text-xs md:text-sm"> Información diaria proporcionada por <b><a href="https://www.ficeda.com.mx/" target="_blank" >ficeda.com.mx</a></b></li>                                                   
                                </ul>
                            </div>   
                            <span className=" border-black border-b text-center text-xl block md:hidden ">{props.filtro}</span>    
                            <p className="antialiased text-2xl text-center block md:hidden ">Precios Central de Abastos</p>
                        </React.Fragment>   
                        :<Loading/>
                         
                        
                        
                    }
            </div>
            </React.Fragment>        
    )
}

const mapStateToProps=state=>({
    precios:state.precios,
    itemsFiltrados:state.itemsFiltrados,
    fecha:state.fecha,
    isLoading:state.isLoading,
    filtro:state.filtro
})

const mapActionsToProps={
    setState:setState
}

export default connect(mapStateToProps,mapActionsToProps)(Index)