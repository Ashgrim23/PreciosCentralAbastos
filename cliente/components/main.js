import {connect} from 'react-redux'
import {setState } from '../redux/appActions'
import React, { useEffect, useState } from 'react'
import ProductChart from './ProductChart'
import ProductsList from './ProductsList'
import { Fade } from 'react-reveal'

function Main(props) {
    const [producto, setproducto] = useState(null)
 

    const onCardclick = (e) => {                
        props.setState({producto:e.currentTarget.id})
    }
    

    return (
        <React.Fragment>
        {(props.producto  ) ?
            <ProductChart  producto={props.producto} fecha={props.fecha} />
            :<ProductsList items={props.itemsFiltrados} onCardclick={onCardclick}  />
        }
        </React.Fragment>
    )
}

const mapStateToProps=(state)=> ({
    producto:state.producto,
    fecha:state.fecha,
    itemsFiltrados:state.itemsFiltrados
    
})

const mapActionsToProps=({
    setState:setState
})

export default connect(mapStateToProps,mapActionsToProps)(Main)