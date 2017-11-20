import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/Clinics-new';
import Doctors_new from './component/Doctors-new';
import Doctors from './component/Doctors'
import Clinics from './component/Clinics';
import { BrowserRouter,Route } from 'react-router-dom';
import Login from './component/Login';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Reducers from './reducers';

const store = createStore(Reducers);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Route path="/login" component={Login}/>
                <Route exact path="/clinics" component={Clinics}/>
                <Route path="/clinics/new" component={App}/>
                <Route path="/doctors/new" component={Doctors_new}/>
                <Route exact path="/doctors" component={Doctors}/>
            </div>
        </BrowserRouter>
    </Provider>,document.getElementById('root')
);
