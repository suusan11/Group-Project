import React, { Component } from 'react';
import {
 BrowserRouter as Router,
 NavLink,
 Redirect,
 Switch,
 Route,
 Link
} from 'react-router-dom';
import setAuthToken from '../../config/auth/setAuthToken';

class Mv extends React.Component {
    ////////////////////////////////////////
  constructor(props){
    super(props);
    this.state = {
      isAuthorized:false,
      currentUser:{},
      status:''
    };
    this.logout = this.logout.bind(this);
  }
  ////////////////////////////////////////




  logout() {
    // remove Token from Browser
    // Remove token from localStorage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    setAuthToken(false);
    //Reset current user
    this.setState({ currentUser: {}});
    this.setState({ isAuthorized: false});
    this.setState({ status:''});
  }


 render(){
   return (
     <div>This is Mv page

     <header>
           {this.state.isAuthorized? "": <Link to="/login"> [Login]  </Link>}
           {this.state.isAuthorized?  <button onClick={this.logout}> [Logout] </button>:""}
         </header>

     </div>

   );
 }
}
export default Mv;
