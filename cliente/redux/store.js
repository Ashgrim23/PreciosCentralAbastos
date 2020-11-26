import {createStore} from 'redux'
import appReducers from './appReducers';

const store=createStore(appReducers);

export default store;   