import React, { Component } from 'react';
import './App.css';
// This is neccessary so that users can keep a state of logging in while they are moving around in this website unless they log out.
//  ----  Auth Token Hnadler ----  //
////////////////////////////////////////
import jwt_decode from 'jwt-decode';
import setAuthToken from './config/auth/setAuthToken';

//  ----  Components ----  //
////////////////////////////////////////
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import CompaniesList from "./components/private/CompaniesList";
import CompanyInfo from "./components/private/CompanyInfo";
import LoginTop from "./components/private/LoginTop";
import AdminBalanceList from "./components/private/AdminBalanceList";
import Setting from "./components/private/Setting";
import Lead from "./components/lead/Lead";
import NotFound from "./components/not-found/NotFound";
import PrivateRoute from "./components/common/PrivateRoute";
import InvoiceDetail from "./components/invoice/InvoiceDetail"
import InvoiceList from "./components/invoice/InvoiceList"
import RefundList from "./components/refund/RefundList"


import {
 BrowserRouter as Router,
 NavLink,
 Redirect,
 Switch,
 Route,
 Link
} from 'react-router-dom';




class App extends Component {
    ////////////////////////////////////////
  constructor(props){
    super(props);
    this.state = {
      isAuthorized:false,
      currentUser:{},
      status:''
    };

}



  componentWillReceiveProps(newProps) {

  }


  // First time of showing this component or when it's reloaded
  ////////////////////////////////////////
  componentWillMount() {

    //  --- Check for token --- //
      if (localStorage.jwtToken) {
console.log("🐱🐱🐱🐱isAuthorized "+this.state.isAuthorized);
        // Set auth token header auth if it exists
        setAuthToken(localStorage.jwtToken);
        // Decode token and get user info and exp
        const decoded = jwt_decode(localStorage.jwtToken);
        // Set user and isAuthenticated
          this.setState({ currentUser: decoded});
          this.setState({ isAuthorized: true});
          this.setState({ status:"User is logging in as"});

          console.log("🐱🐱🐱🐱currentUser "+JSON.stringify(this.state.currentUser));

        console.log("🐱🐱🐱🐱status "+this.state.status);

        // Check for expired token
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          // Logout user
        //  store.dispatch(logoutUser());
          // Clear current Profile
          //store.dispatch(clearCurrentProfile());
          // Redirect to lead
          window.location.href = '/';
        }
      }
      //////////////////////////////////////

  }
  ////////////////////////////////////////
  render() {
    return (
        <Router>
     <div className="App">

     {/* Top Page */}
     <Route exact path="/" component={Lead}/>
     {/* Login Page */}
     <Route exact path="/login" component={Login}/>
     {/* 404 error */}
     <Route exact path="/not-found" component={NotFound} />

     {/* Register Page */}
     <Switch>
       <PrivateRoute　
         isAuthorized={this.state.isAuthorized}
         exact path="/register" component={Register}
         />
     </Switch>

     {/* Login Top */}
     <Switch>
       <PrivateRoute
       isAuthorized={this.state.isAuthorized}
         exact path="/d" component={LoginTop}
       />
     </Switch>

     {/* Companies List */}
     <Switch>
       <PrivateRoute　
       isAuthorized={this.state.isAuthorized}
         exact path="/private/companies" component={CompaniesList}
       />
     </Switch>

     {/* Single Company Info */}
     <Switch>
        <PrivateRoute
        isAuthorized={this.state.isAuthorized}
         exact path="/company/single/info" component={CompanyInfo}
       />
     </Switch>

     {/* Balance List */}
     <Switch>
        <PrivateRoute　
        isAuthorized={this.state.isAuthorized}
         exact path="/balancelist" component={AdminBalanceList}
       />
     </Switch>

     {/* Invoice (montly list) */}
     <Switch>
       <PrivateRoute
       isAuthorized={this.state.isAuthorized}
         exact path="/invoice/list" component={InvoiceList}
       />
     </Switch>

     {/* Invoice detail */}
     <Switch>
       <PrivateRoute
       isAuthorized={this.state.isAuthorized}
         exact path="/invoice/detail/:year/:month" component={InvoiceDetail}
       />
     </Switch>

     {/* Settings */}
     <Switch>
       <PrivateRoute
       isAuthorized={this.state.isAuthorized}
        exact path="/settings" component={Setting}
       />
     </Switch>

     {/*Refund History List Page*/}
     <Switch>
       <PrivateRoute
       isAuthorized={this.state.isAuthorized}
        exact path="/refund/list" component={RefundList}
       />
     </Switch>

     </div>
      </Router>

    );
  }
}

  export default App;
