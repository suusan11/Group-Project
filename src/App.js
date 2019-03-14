import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Moon from 'connection/Moon';
import './normalize.css';
import './App.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const moon = new Moon();

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      fullName : "",
      phoneNumber: "",
      email: "",
      moveFromID: "",
      moveToID: "",
      message: "",
      moveDate: new Date(),
      bedRoomNumber: "",
      errors: "",
      areaList:[],
    }



    this.onChange=this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.ayaka=this.ayaka.bind(this);
    this.isEmpty = this.isEmpty.bind(this);
  }


  ayaka(e){
     console.log("ayaka is functioning");
    //  submitボタンを押した時に動く関数

      e.preventDefault();


      //reset errors
      this.setState({ errors: {} });

      let submitData = {};
      let moveDate = {};
      moveDate.year = this.state.moveDate.getFullYear();
      moveDate.month = this.state.moveDate.getMonth();
      moveDate.day = this.state.moveDate.getDate();

      submitData.fullName = this.state.fullName;
      submitData.phoneNumber = this.state.phoneNumber;
      submitData.email = this.state.email;
      submitData.message = this.state.message;
      submitData.moveDate = moveDate;
      submitData.moveFromID = this.state.moveFromID;
      submitData.moveToID = this.state.moveToID;
      console.log("onSubmit");
      console.log("onChange fullName => "+this.state.fullName)
      console.log("onChange phoneNumber => "+this.state.phoneNumber)
      console.log("onChange email => "+this.state.email)
      console.log("onChange message => "+this.state.message)
      console.log("onChange moveDate Year => "+moveDate.year )
      console.log("onChange moveDate Month => "+moveDate.month )
      console.log("onChange moveDate Day => "+moveDate.day )
      console.log("onChange moveFromID => "+this.state.moveFromID)
      console.log("onChange moveToID => "+this.state.moveToID)

      moon.post('api/client/create',submitData)
          .then((res) => {
              console.log("Success"+JSON.stringify(res.data))
              //redirect
              this.props.history.push('/conclusion');

          })
          .catch((err) => {
              console.log("Error"+JSON.stringify(err.response.data))
              this.setState({ errors: err.response.data});
          })
   };

    onChange(e){
   // console.log(e.target.value);
    this.setState({[e.target.name]:e.target.value});
  };

  disabledInput = () => {
      var element = ReactDOM.findDOMNode(this.refs.test);
      element.setAttribute('disabled', 'true');
  };

  handleChange(date) {
    this.setState({startDate: date});
  }

  componentDidMount(){

    console.log(JSON.stringify("💩"))

    // http://localhost:5050/api/area/all
    moon
    .get('api/area/all')
        .then(res =>{
            // console.log(JSON.stringify(data));
            for(let i = 0; i < res.data.length; i++) {
                // console.log(res.data[i].name);
                this.setState({ areaList: this.state.areaList.concat([res.data[i].city] + ', ' + [res.data[i].admin]) });
                // this.setState({ areaList:[res.data[i].name] });
            }

            console.log(this.state.areaList);
        })
        .catch(err => {
            this.disabledInput();
            console.log(JSON.stringify(err));
        })
  }



    // Check if the object is empty
    ////////////////////////////////////////
    isEmpty(obj){
        return !Object.keys(obj).length;
    }
    ////////////////////////////////////////


  render() {
    return (
      <div className="App">
          <header>
              <div className="header__flex">
                  <div className="header__logo">

                  </div>
                  <div className="header-info">
                      <p>XXXXXX@gmail.com</p>
                      <p>1-111-1111</p>
                  </div>
              </div>
          </header>

          <section className="main">
              <div className="main__container">
                  <div className="overlay">
                      <div className="catchcopy-box">
                          <h1>Compare the best moving companies with one click</h1>
                      </div>
                    <form className="form" name="customerInfo">
                      <div className="form__top">

                        {/*input name*/}
                        <div className="input__container">
                            <input className="input-top" value={this.state.fullName} name="fullName" placeholder="Full name" onChange={this.onChange} />
                            <div className="error">{this.isEmpty(this.state.errors)?'':this.state.errors.fullName}</div>
                        </div>

                        {/*input email*/}
                        <div className="input__container">
                            <input className="input-top" value={this.state.email} name="email" placeholder="Email address" onChange={this.onChange} />
                            <div className="error">{this.isEmpty(this.state.errors)?'':this.state.errors.email}</div>
                        </div>

                        {/*input phone number*/}
                        <div className="input__container">
                            <input className="input-top" value={this.state.phoneNumber} name="phoneNumber" placeholder="Phone number" onChange={this.onChange} />
                            <div className="error">{this.isEmpty(this.state.errors)?'':this.state.errors.phoneNumber}</div>
                        </div>
                      </div>

                      <div className="form__bottom">

                      {/*select moving from*/}
                      <div className="input__city">
                          <div className="city__label">Moving from</div>
                          <select id="errCatch" ref="test" className="input__city-item">{this.state.areaList.map((area, index) => <option value={this.state.moveFromID} key={index} name="areaList">{area}</option>)}</select>
                          <div className="error">{this.isEmpty(this.state.errors)?'':this.state.errors.moveFromID}</div>
                      </div>

                      {/*select moving to*/}
                      <div className="input__city">
                          <div className="city__label">Moving to</div>
                            {/*<input className="input__city-item" value={this.state.moveToId} name="moveToId" placeholder="City, Province" onChange={this.onChange} />*/}
                            <select id="errCatch" ref="test" className="input__city-item">{this.state.areaList.map((area, index) => <option value={this.state.moveToID} key={index} name="areaList">{area}</option>)}</select>
                            <div className="error">{this.isEmpty(this.state.errors)?'':this.state.errors.moveToID}</div>
                      </div>

                      {/*input date*/}
                      <div className="input__container">
                          <DatePicker className="input-date" selected={this.state.moveDate} onChange={this.handleChange} />
                          <div className="error">{this.isEmpty(this.state.errors)?'':this.state.errors.moveDate}</div>
                      </div>

                    {/*select bedroom number*/}
                    <select className="input-bottom select" value={this.state.bedRoomNumber} name="bedRoomNumber" onChange={this.onChange}>
                        <option value="">--Bedroom Number--</option>
                        <option value="partial">Partial move</option>
                        <option value="studio">Studio apartment</option>
                        <option value="1bedapartment">1 bedroom apartment</option>
                        <option value="1bedapartment">2 bedroom apartment</option>
                        <option value="2bedhouse">2 bedroom house</option>
                        <option value="1bedapartment">3 bedroom apartment</option>
                        <option value="3bedhouse">3 bedroom house</option>
                        <option value="4bedhouse">4 bedroom house</option>
                        <option value="5morebedhouse">5+ bedroom house</option>
                    </select>
                        <div className="error">{this.isEmpty(this.state.errors)?'':this.state.errors.bedRoomNumber}</div>
                      </div>
                      <button className="sendButton" onClick={this.ayaka} type="submit" name="submitButton">Get a Quote</button>
                    </form>
                  </div>
              </div>
          </section>

          <footer>
              <div className="footer__flex">
                  <div className="footer__flex--left">
                      <p><a href="/">Log in</a></p>
                      <p><a href="/">Privacy Policy</a></p>
                  </div>
                  <div className="footer__flex--right">
                      <p>&copy; 2019 MyMovingCost</p>
                  </div>
              </div>
          </footer>
      </div>
    );
  }
}


export default App;
