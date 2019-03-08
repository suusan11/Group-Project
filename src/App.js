import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Moon from './connection/Moon';
import './normalize.css';
import './App.css';

const moon = new Moon();

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      fullName : "",
      phoneNumber: "",
      email: "",
      moveFromId: "",
      moveToId: "",
      message: "",
      errors: "",
      areaList:[]
    }
  


    this.onChange=this.onChange.bind(this);
    this.ayaka=this.ayaka.bind(this);
  }


  ayaka(){
     console.log("ayaka is functioning");
    //  submitボタンを押した時に動く関数
   };

  onChange(e){
   // console.log(e.target.value);
  this.setState({[e.target.name]:e.target.value});
  };

  disabledInput = () => {
      var element = ReactDOM.findDOMNode(this.refs.test);
      element.setAttribute('disabled', 'true');
  };

  componentDidMount(){

    console.log(JSON.stringify("💩"))

    // http://localhost:5050/api/area/all
    moon
    .get('api/area/all')
        .then(res =>{
            // console.log(JSON.stringify(data));
            for(let i = 0; i < res.data.length; i++) {
                // console.log(res.data[i].name);
                this.setState({ areaList: this.state.areaList.concat([res.data[i].name]) });
                // this.setState({ areaList:[res.data[i].name] });
            }
            console.log(this.state.areaList);
        })
        .catch(err => {
            this.disabledInput();
            console.log(JSON.stringify(err))
    })
  }

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
                    <form className="form" name="customerInfo" action="https://httpbin.org/post" method="post" acceptCharset="UTF-8">
                      <div className="form__top">
                        <input className="input-top" value={this.state.fullName} name="fullName" placeholder="Full name" onChange={this.onChange} />
                        <input className="input-top" value={this.state.email} name="email" placeholder="Email address" onChange={this.onChange} />
                        <input className="input-top" value={this.state.phoneNumber} name="phoneNumber" placeholder="Phone number" onChange={this.onChange} />
                      </div>
                      <div className="form__bottom">
                          <div className="input__city">
                              <div className="city__label">
                                  From City
                              </div>
                                <input className="input__city-item" value={this.state.moveFromId} name="moveFromId" placeholder="City, Province" onChange={this.onChange} />
                          </div>
                          <div className="input__city">
                              <div className="city__label">
                                  To City
                              </div>
                                <input className="input__city-item" value={this.state.moveToId} name="moveToId" placeholder="City, Province" onChange={this.onChange} />
                          </div>
                        {/*<input value={this.state.message} name="message" placeholder="message" onChange={this.onChange} />*/}
                        {/*<input value={this.state.errors} name="errors" placeholder="errors"  onChange={this.onChange} />*/}
                        <select id="errCatch" ref="test" className="input-bottom">{this.state.areaList.map((area, index) => <option value={this.state.areaList} key={index} name="areaList" onChange={this.onChange}>{area}</option>)}</select>
                      </div>
                      <button onClick={this.ayaka} type="submit" name="submitButton">Get a Quote</button>
                    </form>
                  </div>
              </div>
          </section>

          <footer>
              <div className="footer__flex">
                  <div className="footer__flex--left">
                      <p><a href="">Log in</a></p>
                      <p><a href="">Privacy Policy</a></p>
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
