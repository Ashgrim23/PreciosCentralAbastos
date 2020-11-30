import {connect} from 'react-redux'
import {setState } from '../redux/appActions'
import React from 'react'
import ProductChart from './ProductChart'
import ProductsList from './ProductsList'


function Main(props) {
    const onCardclick = (item) => {                             
        props.setState({producto:item})
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