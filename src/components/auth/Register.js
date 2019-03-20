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
            username: "",
            password: "",
            password2: "",
            accessID: "",
            companyName: "",
            email: "",
            phoneNumber: "",
            description: "",
            errors: "",
            message: "",
            coveredArea: []
        }


        this.onChange = this.onChange.bind(this);
        this.submit = this.submit.bind(this);
        this.isEmpty = this.isEmpty.bind(this);
        this.inputChange = this.inputChange.bind(this);
    }



    //Click event for submit(get a quote)
    submit(e) {
        console.log("THIS IS A SUBMIT BUTTON");
        //  submitボタンを押した時に動く関数

        e.preventDefault();


        //reset errors
        this.setState({errors: {}});

        let submitData = {};

        submitData.username = this.state.username;
        submitData.password = this.state.password;
        submitData.password2 = this.state.password2;
        submitData.accessID = this.state.accessID;
        submitData.companyName = this.state.companyName;
        submitData.email = this.state.email;
        submitData.phoneNumber = this.state.phoneNumber;
        submitData.description = this.state.description;
        submitData.coveredArea = this.state.coveredArea;

        //create account from mv company form
        moon.post('api/company/create', submitData)
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
        console.log(e.target.value);
        this.setState({[e.target.name]: e.target.value});
    };
    ////////////////////////////////////////


    //onChange for covered area checkbox
    ////////////////////////////////////////
    inputChange(e) {
        e.persist();

        console.log(this.state.coveredArea);
        if (e.target.checked === true) {
            console.log(e.target.value);
            this.setState({ coveredArea: this.state.coveredArea.concat([e.target.value]) })
        }
        else {
            var array = [...this.state.coveredArea];
            var index = array.indexOf(e.target.value)
            if (index !== -1) {
                array.splice(index, 1);
                this.setState({coveredArea: array});
            }
        }
    }
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
                            <input value={this.state.username} name="userName" onChange={this.onChange}/>
                            <div className="error">{this.isEmpty(this.state.errors) ? '' : this.state.errors.username}</div>
                        </div>

                        {/*input Password*/}
                        <div className="input__container--register">
                            <label>Password</label>
                            <input value={this.state.password} name="password" onChange={this.onChange}/>
                            <div className="error">{this.isEmpty(this.state.errors) ? '' : this.state.errors.password}</div>
                        </div>

                        {/*input Password2*/}
                        <div className="input__container--register">
                            <label>Password2</label>
                            <input value={this.state.password2} name="password2" onChange={this.onChange}/>
                            <div className="error">{this.isEmpty(this.state.errors) ? '' : this.state.errors.password2}</div>
                        </div>

                        {/*input AccessID*/}
                        <div className="input__container--register">
                            <label>AccessID</label>
                            <input value={this.state.accessID} name="accessID" onChange={this.onChange}/>
                            <div className="error">{this.isEmpty(this.state.errors) ? '' : this.state.errors.accessID}</div>
                        </div>

                        {/*input Company name*/}
                        <div className="input__container--register">
                            <label>Company name</label>
                            <input value={this.state.companyName} name="companyName" onChange={this.onChange}/>
                            <div className="error">{this.isEmpty(this.state.errors) ? '' : this.state.errors.companyName}</div>
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

                        {/*check covered area*/}
                            <label>Covered Area</label>
                        <div className="coveredarea">
                            <input type="checkbox" name="coveredArea" value="Alberta" onChange={this.inputChange} />Alberta
                            <input type="checkbox" name="areaList" value="British Columbia" onChange={this.inputChange} />British Columbia
                            <input type="checkbox" name="areaList" value="Manitoba" onChange={this.inputChange} />Manitoba
                            <input type="checkbox" name="areaList" value="Nova Scotia" onChange={this.inputChange} />Nova Scotia
                            <input type="checkbox" name="areaList" value="New Brunswick" onChange={this.inputChange} />New Brunswick
                            <input type="checkbox" name="areaList" value="Newfoundland and Labrador" onChange={this.inputChange} />Newfoundland and Labrador
                            <input type="checkbox" name="areaList" value="Ontario" onChange={this.inputChange} />Ontario
                            <input type="checkbox" name="areaList" value="Prince Edward Island" onChange={this.inputChange} />Prince Edward Island
                            <input type="checkbox" name="areaList" value="Quebec" onChange={this.inputChange} />Quebec
                            <input type="checkbox" name="areaList" value="Saskatchewan" onChange={this.inputChange} />Saskatchewan
                        </div>


                        {/*input description*/}
                        <div className="input__container--register">
                            <label>Description</label>
                            <textarea value={this.state.description} name="description" onChange={this.onChange}/>
                            <div className="error">{this.isEmpty(this.state.errors) ? '' : this.state.errors.description}</div>
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