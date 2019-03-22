//  ----  React ----  //
////////////////////////////////////////
import React from 'react';
import {
  withRouter,
  Link
} from 'react-router-dom';
////////////////////////////////////////



//  ----  Authorization ----  //
////////////////////////////////////////
import setAuthToken from '../../config/auth/setAuthToken';
import jwt_decode from 'jwt-decode';
////////////////////////////////////////


//  ---- http copnnection ----  //
////////////////////////////////////////
import Moon from '../../connection/Moon';
const moon = new Moon();
////////////////////////////////////////



class Login extends React.Component {


  // COnstructor
  ////////////////////////////////////////
  constructor(props){
    super(props);

    this.state = {
      accessID:'',
      password:'',
      errors:{}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isEmpty = this.isEmpty.bind(this);
  }
  ////////////////////////////////////////



  ////////////////////////////////////////
  onSubmit(e) {
    e.preventDefault();

    //reset errors
    this.setState({ errors: {} });

    let submitData = {};
    submitData.accessID = this.state.accessID;
    submitData.password = this.state.password;
    console.log("onChange accessID => "+this.state.accessID)
    console.log("onChange password => "+this.state.password)

    moon.post('api/auth/login',submitData)
    .then((res) => {

      console.log("Login Success"+JSON.stringify(res.data))

      // Save to localStorage
      const { token } = res.data;
      // Set token to localStorage
      localStorage.setItem('jwtToken', token);
      // Set token to Authorization header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);

      console.log("User data"+JSON.stringify(decoded))
      if(decoded.role==="administrator"){
        //redirect
        this.props.history.push('/d');
      }else if(decoded.role==="standard"){
        //redirect
        this.props.history.push('/d');
      }else{
        console.log("Permission Error => "+decoded.role);
      }

    })
    .catch((err) => {
      console.log("Login Error"+JSON.stringify(err.response.data))
      this.setState({ errors: err.response.data});
    })

  }
  ////////////////////////////////////////



  // Check if the object is empty
  ////////////////////////////////////////
    isEmpty(obj){
      return !Object.keys(obj).length;
    }
    ////////////////////////////////////////



  ////////////////////////////////////////
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  ////////////////////////////////////////



  render() {
    return (

      <section>

      <h1>
      Login Page
      </h1>


      <form onSubmit={this.onSubmit}>

        {/****   Access ID   ****/}
        <label>Access ID</label>
        <input
          name="accessID"
          value={this.state.accessID}
          onChange={this.onChange}
        />
        <div className="error">{this.isEmpty(this.state.errors)?'':this.state.errors.accessID}</div>

        {/****   Password   ****/}
        <label>Password</label>
        <input
          name="password"
          value={this.state.password}
          onChange={this.onChange}
        />
        <div className="error">{this.isEmpty(this.state.errors)?'':this.state.errors.password}</div>
        <input
            type="submit"
            value="Login"
          />
      </form>

      </section>

    );
  }
}

export default withRouter(Login);
