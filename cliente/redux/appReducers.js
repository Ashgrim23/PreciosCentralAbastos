import {SET_STATE} from './appActions'


const initialSate={
    precios:[],
    itemsFiltrados:[],
    chartIsVisible:false,
    fecha:new Date(),
    isLoading:false,
    filtro:"Abarrotes",
    producto:null
}

const appReducers=(state=initialSate,action)=>{
    switch(action.type) {
        case SET_STATE:
            return {
                ...state,                
                ...action.datos                
             }        
        default:
            return {...state}
    }
}

export default appReducers