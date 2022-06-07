import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
// Redux
import { store } from './app/store'
import { Provider } from 'react-redux'


ReactDOM.render( <Provider store={store}> <Root/> </Provider> , document.getElementById('root') );

