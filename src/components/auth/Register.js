import React,  { Component } from "react";

//connect api and database
import Moon from '../.././connection/Moon';

//css
import '../../normalize.css';
import '../../App.css';

const moon = new Moon();

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password: "",
            password2: "",
            accessID: "",
            companyName: "",
            email: "",
            phoneNumber: "",
            description: "",
            errors: "",
            message: ""
        }


        this.onChange = this.onChange.bind(this);
        this.submit = this.submit.bind(this);
        this.isEmpty = this.isEmpty.bind(this);
    }




    //Click event for submit(get a quote)
    submit(e) {
        console.log("create account for moving company");
        //  submitボタンを押した時に動く関数

        e.preventDefault();


        //reset errors
        this.setState({errors: {}});

        // let submitData = {};
        // let moveDate = {};
        // moveDate.year = this.state.moveDate.getFullYear();
        // moveDate.month = this.state.moveDate.getMonth();
        // moveDate.day = this.state.moveDate.getDate();
        //
        // submitData.fullName = this.state.fullName;
        // submitData.phoneNumber = this.state.phoneNumber;
        // submitData.email = this.state.email;
        // submitData.message = this.state.message;
        // submitData.moveDate = moveDate;
        // submitData.moveFromID = this.state.moveFromID;
        // submitData.moveToID = this.state.moveToID;
        // console.log("onSubmit");
        // console.log("onChange fullName => " + this.state.fullName)
        // console.log("onChange phoneNumber => " + this.state.phoneNumber)
        // console.log("onChange email => " + this.state.email)
        // console.log("onChange message => " + this.state.message)
        // console.log("onChange moveDate Year => " + moveDate.year)
        // console.log("onChange moveDate Month => " + moveDate.month)
        // console.log("onChange moveDate Day => " + moveDate.day)
        // console.log("onChange moveFromID => " + this.state.moveFromID)
        // console.log("onChange moveToID => " + this.state.moveToID)

        //create account from mv company form
        moon.post('api/company/create')
            .then((res) => {
                console.log("Success" + JSON.stringify(res.data))
                //redirect
                this.props.history.push('/conclusion');

            })
            .catch((err) => {
                console.log("Error" + JSON.stringify(err.response.data))
                this.setState({errors: err.response.data});
            })
    };




    ////////////////////////////////////////
    onChange(e) {
        // console.log(e.target.value);
        this.setState({[e.target.name]: e.target.value});
    };
    ////////////////////////////////////////


    // Check if the object is empty
    ////////////////////////////////////////
    isEmpty(obj) {
        return !Object.keys(obj).length;
    }
    ////////////////////////////////////////


    render() {
        return (
            <div className="App">
                <section className="register">
                    <h1>Register Page</h1>
                    <form className="form--register" name="companyInfo">

                        {/*input name*/}
                        <div className="input__container--register">
                            <label>Username</label>
                            <input value={this.state.userName} name="userName" onChange={this.onChange}/>
                            <div className="error">{this.isEmpty(this.state.errors) ? '' : this.state.errors.fullName}</div>
                        </div>

                        {/*input Password*/}
                        <div className="input__container--register">
                            <label>Password</label>
                            <input value={this.state.password} name="password" onChange={this.onChange}/>
                            <div className="error">{this.isEmpty(this.state.errors) ? '' : this.state.errors.fullName}</div>
                        </div>

                        {/*input Password2*/}
                        <div className="input__container--register">
                            <label>Password2</label>
                            <input value={this.state.password2} name="password2" onChange={this.onChange}/>
                            <div className="error">{this.isEmpty(this.state.errors) ? '' : this.state.errors.fullName}</div>
                        </div>

                        {/*input AccessID*/}
                        <div className="input__container--register">
                            <label>AccessID</label>
                            <input value={this.state.accessID} name="accessID" onChange={this.onChange}/>
                            <div className="error">{this.isEmpty(this.state.errors) ? '' : this.state.errors.fullName}</div>
                        </div>

                        {/*input Company name*/}
                        <div className="input__container--register">
                            <label>Company name</label>
                            <input value={this.state.companyName} name="companyName" onChange={this.onChange}/>
                            <div className="error">{this.isEmpty(this.state.errors) ? '' : this.state.errors.fullName}</div>
                        </div>

                        {/*input email*/}
                        <div className="input__container--register">
                            <label>Email address</label>
                            <input value={this.state.email} name="email" onChange={this.onChange}/>
                            <div className="error">{this.isEmpty(this.state.errors) ? '' : this.state.errors.email}</div>
                        </div>

                        {/*input phone number*/}
                        <div className="input__container--register">
                            <label>Phone number</label>
                            <input value={this.state.phoneNumber} name="phoneNumber" onChange={this.onChange}/>
                            <div className="error">{this.isEmpty(this.state.errors) ? '' : this.state.errors.phoneNumber}</div>
                        </div>

                        {/*input description*/}
                        <div className="input__container--register">
                            <label>Description</label>
                            <textarea value={this.state.description} name="description" onChange={this.onChange}/>
                            <div className="error">{this.isEmpty(this.state.errors) ? '' : this.state.errors.phoneNumber}</div>
                        </div>

                        <button className="sendButton" onClick={this.submit} type="submit" name="registerButton">
                            Submit
                        </button>
                    </form>
                </section>
            </div>
        );
    }
}

export default Register;