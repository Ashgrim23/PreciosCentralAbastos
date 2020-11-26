import '../assets/styles/styles.css'
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import {Provider} from 'react-redux'
import withRedux from "next-redux-wrapper";
import store from '../redux/store'


// This default export is required in a new `pages/_app.js` file.
function MyApp({ Component, pageProps }) {  
 
  return (
    <Provider store={store}>
      <Component  {...pageProps} />    
    </Provider>
  )
}

MyApp.getInitialProps= async ({Component, ctx})=> {
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
  //Anything returned here can be access by the client
  return {pageProps: pageProps};
}

const makeStore = () => store;

export default withRedux(makeStore)(MyApp);
