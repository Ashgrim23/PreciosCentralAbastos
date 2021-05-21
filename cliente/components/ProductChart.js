import React from 'react'
import dynamic from 'next/dynamic'
import moment from 'moment'
import Loading from './Loading'
import { Fade } from 'react-reveal'
import { useEffect, useState } from 'react'
import Axios from 'axios'
const Grafica = dynamic(
    ()=>{
     return import ('react-apexcharts')
    },
    {ssr:false}
)

export default function ProductModal(props) {
    const {  ID_PRODUCTO,DESCRIPCION,FECHA,PRECIO,UNIDAD } = props.producto
    const [estado, setEstado] = useState({loading:true})

    const filtraProductos=(filtro,serieData)=>{
        let fechaIni;        
        switch (filtro){
            case '10D':
                fechaIni=moment(FECHA).subtract(10,'days').toDate()
                break;
            case '1M':
                fechaIni=moment(FECHA).subtract(1,'months').toDate()
                break;
            case '6M':
                fechaIni=moment(FECHA).subtract(6,'months').toDate()
                break;
            default:
                break
        }
        if (fechaIni) {
            const serieDataFiltrada=[]
            let len=serieData.length
            for (let x=len-1;x>=0;x--) {                
                if (moment(serieData[x].x).isSameOrAfter(moment(fechaIni)) )
                 serieDataFiltrada.push(serieData[x]) 
                else
                 break
            }
            return serieDataFiltrada
        } else {
            return serieData
        }
        
    }

    useEffect(async () => {
        let data={            
            id_producto:ID_PRODUCTO,
            fecha:FECHA       
        }       
        
        const result=await Axios.post('http://localhost:3000/api/precios',data)        
        let serieData=JSON.parse(result.data[0].SERIE)        
        const serieDataFiltrada=filtraProductos('10D',serieData)          
        setEstado({loading:false,filtro:'10D',serie:{name:"Precios",data:serieDataFiltrada},datos:serieData })
    }, [])
        

    const options= {
        
        fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.9,
              stops: [0, 90, 100]
            }
        },
        noData: {
            text: 'Loading...'
          },
        chart: {            
            type: 'area',
            toolbar: {
                show: true,
                offsetX: 0,
                offsetY: 0,
                tools: {
                  download: false,
                  selection: true,
                  zoom: true,
                  zoomin: true,
                  zoomout: true,
                  pan: true,
                  reset: true | '<img src="/static/icons/reset.png" width="20">',
                  customIcons: []
                },
            }
        },
        dataLabels: {
         enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        yaxis:{
            type:'number',
            decimalsInFloat:1
        },
        xaxis: {
            type: 'datetime',
            tickAmount: 10            
        },
        tooltip: {
        x: {
            format: 'dd/MM/yy'
        },
        
    }
}

    const handleClick=async (e)=>{       
        setEstado({...estado,loading:true})
        const serieDataFiltrada=filtraProductos(e.target.id,estado.datos)     
        setEstado({...estado,loading:false,filtro:e.target.id,serie:{name:"Precios",data:serieDataFiltrada} })        
    }
    
    return (
        <React.Fragment>
         { !estado.loading ?
            <Fade left >
                <div className="mb-2 ">
                        <div className="flex flex-col items-center md:flex-row md:justify-center md:items-baseline space-x-3">                            
                           <div> <p className="text-center text-2xl font-semibold">{DESCRIPCION}</p></div>
                            <div><p className="text-gray-800 font-bold text-2xl text-center">${PRECIO} <span className=" text-sm font-light text-gray-600">Pesos /{UNIDAD} </span></p></div>
                        </div>
                        <p className="text-center text-sm md:text-base  font-light mb-1">Historico de precios al {moment.utc(FECHA).format("DD [de] MMMM [del] yyyy")}</p>
                        <ul className="flex justify-center space-x-1">
                            <li id='10D' onClick={handleClick} className={(estado.filtro=='10D'?"bg-blue-900 ":"bg-blue-500 ") + " cursor-pointer  hover:bg-blue-700 text-white font-bold py-1  px-2 md:py-2 md:px-4 rounded text-xs md:text-base "}>10D</li>
                            <li id='1M' onClick={handleClick} className={(estado.filtro=='1M'?"bg-blue-900 ":"bg-blue-500 ") + " cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 md:py-2 md:px-4 rounded text-xs md:text-base"}>1M</li>
                            <li id='6M' onClick={handleClick} className={(estado.filtro=='6M'?"bg-blue-900 ":"bg-blue-500 ") +" cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 md:py-2 md:px-4 rounded text-xs md:text-base"}>6M</li>
                            <li id='TODO' onClick={handleClick} className={(estado.filtro=='TODO'?"bg-blue-900 ":"bg-blue-500 ") +" cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 md:py-2 md:px-4 rounded text-xs md:text-base"}>Todo</li>
                        </ul>
                        <Grafica type='area' series={[estado.serie]} options={options} className="w-screen md:w-2/3 mx-auto "/>
                    </div>
            </Fade>
            :<Loading/>
        }
        </React.Fragment>
    )
}
