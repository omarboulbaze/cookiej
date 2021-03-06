import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';

// Redux
import { Provider } from 'react-redux';
import store from './store/store';


ReactDOM.render( <Provider store={store}><Root/></Provider> , document.getElementById('root') );

