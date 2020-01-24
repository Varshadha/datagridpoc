import React, {Component}  from 'react';
// import logo from './logo.svg';
import './App.scss';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import BusinessRule from './components/BusinessRule';
import SspMaster from './components/SspMaster';
import Edge from './components/Edge';
import MasterNetworkZone from './components/MasterNetworkZone';
import GreenList from './components/GreenList';
import VideoLibrary from './components/VideoLibrary';
import MainLayout from './layout/MainLayout';
import AuthLayout from './layout/AuthLayout';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import Login from './components/Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure({
  autoClose: 8000,
  draggable: false,  
});
export default class App extends Component{
    render(){
      return(
        <div className="maincontainer">          
          <Router history={browserHistory}>
            <Route path="/" component={MainLayout}>
              <IndexRoute component={HomePage} />
              <Route path="/" exact component={HomePage}>
                <Route path='/business' component={BusinessRule} />
                <Route path='/ssp-master' component={SspMaster} />
                <Route path='/edge' component={Edge} />
                <Route path='/master-network' component={MasterNetworkZone} />
                <Route path='/green-list' component={GreenList} />
                <Route path='/video-library' component={VideoLibrary} />
              </Route> 
            </Route>
            <Route component={AuthLayout}>
              <IndexRoute component={AuthPage} />
              <Route path="/auth/" exact component={AuthPage}>
                <Route path="/auth/login" component={Login} /> 
              </Route>
            </Route>             
          </Router>
          <ToastContainer />
        </div>
      )
    }
}

