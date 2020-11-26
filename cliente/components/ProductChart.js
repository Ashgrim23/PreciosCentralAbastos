import React from 'react'
import dynamic from 'next/dynamic'
import moment from 'moment'
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
    const {  producto, fecha } = props
    const [estado, setEstado] = useState(null)


    useEffect(async () => {
        let data={
            filtro:'6D',
            fecha:fecha,
            producto:producto            
        }
        const result=await Axios.post('http://localhost:3000/api/precios',data)        
        let serieData=JSON.parse(result.data[0].SERIE)        
        setEstado({filtro:'6D',serie:{name:"Precios",data:serieData} })
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
        let data={
            filtro:e.target.id,
            fecha:fecha,
            producto:producto            
        }
        const result=await Axios.post('http://localhost:3000/api/precios',data)   
        let serieData=JSON.parse(result.data[0].SERIE)        
        setEstado({filtro:e.target.id,serie:{name:"Precio",data:serieData}  })
    }
    
    return (
        <React.Fragment>
         { estado ?
            <Fade left >
                <div className="mb-2 ">
                        <p className="text-center text-2xl font-semibold">{producto}</p>
                        <p className="text-center text-sm md:text-base  font-light">Historico de precios al {moment(fecha).format("DD [de] MMMM [del] yyyy")}</p>
                        <ul className="flex justify-center space-x-1">
                            <li id='6D' onClick={handleClick} className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 align-middle px-2 md:py-2 md:px-4 rounded text-xs md:text-base">6D</li>
                            <li id='1M' onClick={handleClick} className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 align-middle px-2 md:py-2 md:px-4 rounded text-xs md:text-base">1M</li>
                            <li id='6M' onClick={handleClick} className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 align-middle px-2 md:py-2 md:px-4 rounded text-xs md:text-base">6M</li>
                            <li id='TODO' onClick={handleClick} className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 align-middle px-2 md:py-2 md:px-4 rounded text-xs md:text-base">Todo</li>
                        </ul>
                        <Grafica type='area' series={[estado.serie]} options={options} className="w-screen md:w-2/3 mx-auto "/>
                    </div>
            </Fade>
            :<h1>loading</h1>
        }
        </React.Fragment>
    )
}
