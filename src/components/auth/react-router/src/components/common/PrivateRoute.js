// This is a wrapper of Route component which returns Route component and
//if not, this redirects to login page


import React from 'react';
import { Route, Redirect } from 'react-router-dom';


// "...rest" => put all of the rest into one array
const PrivateRoute = ({ component: Component, isAuthorized, ...rest }) => {
console.log("isAuthorized =>"+isAuthorized)
return(
  <Route
    {...rest}
    render={props =>
     isAuthorized === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/not-found" />
      )
    }
  />
)
};

export default PrivateRoute;
