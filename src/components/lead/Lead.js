import React,  { Component } from "react";
import ReactDOM from "react-dom";

//connect api and database
import Moon from '../.././connection/Moon';

//css
import '../../normalize.css';
import '../../App.css';

//installed date
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//icons
import coin from "../assets/coin.png";
import sandclock from "../assets/sandclock.png";
import track from "../assets/track.png";

const moon = new Moon();

class Lead extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: "",
            phoneNumber: "",
            email: "",
            moveFromID: "",
            moveToID: "",
            message: "",
            moveDate: new Date(),
            bedRoomNumber: [],
            errors: "",
            areaList: [],
            items: [],
            Data:[],
        }


        this.onChange = this.onChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.ayaka = this.ayaka.bind(this);
        this.isEmpty = this.isEmpty.bind(this);
        this.filterList = this.filterList.bind(this);
    }




    //Click event for submit(get a quote)
    ayaka(e) {
        console.log("ayaka is functioning");
        //  submitボタンを押した時に動く関数

        e.preventDefault();


        //reset errors
        this.setState({errors: {}});

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
        console.log("onChange fullName => " + this.state.fullName)
        console.log("onChange phoneNumber => " + this.state.phoneNumber)
        console.log("onChange email => " + this.state.email)
        console.log("onChange message => " + this.state.message)
        console.log("onChange moveDate Year => " + moveDate.year)
        console.log("onChange moveDate Month => " + moveDate.month)
        console.log("onChange moveDate Day => " + moveDate.day)
        console.log("onChange moveFromID => " + this.state.moveFromID)
        console.log("onChange moveToID => " + this.state.moveToID)

        //create account from client form
        moon.post('api/client/create', submitData)
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




    ////////////////////////////////////////
    disabledInput = () => {
        var element = ReactDOM.findDOMNode(this.refs.test);
        element.setAttribute('disabled', 'true');
    };
    ////////////////////////////////////////




    ////////////////////////////////////////
    handleChange(date) {
        this.setState({startDate: date});
    }
    ////////////////////////////////////////




    //ローディング中に読み込む→エラーだったら選択できなくなる
    componentDidMount() {

        console.log(JSON.stringify("💩"))

        // http://localhost:5050/api/area/all
        // moon
        //     .get('api/area/all')
        //     // .then(blob => blob.json())
        //     .then(res =>{
        //         // console.log(JSON.stringify(data));
        //         for(let i = 0; i < res.data.length; i++) {
        //             // console.log(res.data[i].name);
        //             this.setState({ areaList: this.state.areaList.concat([res.data[i].city] + ", " + [res.data[i].city])});
        //             // this.setState({ areaList:[res.data[i].name] });
        //         }
        //
        //         // console.log(this.state.areaList);
        //     })
        //     .catch(err => {
        //         this.disabledInput();
        //         console.log(JSON.stringify(err));
        //     })


        //get room type
        moon
            .get('api/roomtype/all')
            .then(res => {
                // console.log(JSON.stringify(data));
                for (let i = 0; i < res.data.length; i++) {
                    // console.log(res.data[i].name);
                    this.setState({bedRoomNumber: this.state.bedRoomNumber.concat([res.data[i].name])});
                    // this.setState({ areaList:[res.data[i].name] });
                }

               console.log(this.state.bedRoomNumber);
            })
            .catch(err => {
                this.disabledInput();
                console.log(JSON.stringify(err));
            })
    }

    componentWillMount() {
        moon
            .get('api/area/all')
                // .then(blob => blob.json())
            .then(res =>{
                // console.log(JSON.stringify(data));
                for(let i = 0; i < res.data.length; i++) {
                // console.log(res.data[i].name);
                this.setState({ areaList: this.state.areaList.concat([res.data[i].city] + ", " + [res.data[i].admin])});
                }

            })
            .catch(err => {
                this.disabledInput();
                console.log(JSON.stringify(err));
            })
    }


    ////////////////////////////////////////
    filterList(e) {
        const updateList = this.state.areaList.filter((item) => {
            return item.toLowerCase().search( e.target.value.toLowerCase()) !== -1;

        })
        this.setState({items: updateList})

    }
    ////////////////////////////////////////



    // Check if the object is empty
    ////////////////////////////////////////
    isEmpty(obj) {
        return !Object.keys(obj).length;
    }
    ////////////////////////////////////////



//     this.state.Data.ForEach((item, index) => {
//     // this.state.dataRows.concat(createData(this.state.Data.admin, this.state.Data.city));
//     console.log(item);
// })

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
                                        <input className="input-top" value={this.state.fullName} name="fullName"
                                               placeholder="Full name" onChange={this.onChange}/>
                                        <div className="error">{this.isEmpty(this.state.errors) ? '' : this.state.errors.fullName}</div>
                                    </div>

                                    {/*input email*/}
                                    <div className="input__container">
                                        <input className="input-top" value={this.state.email} name="email"
                                               placeholder="Email address" onChange={this.onChange}/>
                                        <div className="error">{this.isEmpty(this.state.errors) ? '' : this.state.errors.email}</div>
                                    </div>

                                    {/*input phone number*/}
                                    <div className="input__container">
                                        <input className="input-top" value={this.state.phoneNumber} name="phoneNumber"
                                               placeholder="Phone number" onChange={this.onChange}/>
                                        <div className="error">{this.isEmpty(this.state.errors) ? '' : this.state.errors.phoneNumber}</div>
                                    </div>
                                </div>

                                <div className="form__bottom">

                                    {/*select moving from*/}
                                    <div className="input__city">
                                        <div className="city__label">Moving from</div>
                                        <input id="errCatch" ref="test" className="input__city-item"　onChange={this.filterList} />
                                            <div>
                                                {this.state.items.map((area, index) => {
                                                    return (
                                                        <li value={this.state.moveFromID} key={index} name="areaList">{area}</li>
                                                    )
                                                })}
                                            </div>
                                        <div className="error">{this.isEmpty(this.state.errors) ? '' : this.state.errors.moveFromID}</div>
                                    </div>

                                    {/*select moving to*/}
                                    <div className="input__city">
                                        <div className="city__label">Moving to</div>
                                        <input id="errCatch" ref="test" className="input__city-item"　onChange={this.filterList} />
                                            <div>
                                                {this.state.items.map((area, index) => {
                                                    return (
                                                        <li value={this.state.moveToID} key={index} name="areaList">{area}</li>
                                                    )
                                                })}
                                            </div>
                                        <div className="error">{this.isEmpty(this.state.errors) ? '' : this.state.errors.moveToID}</div>
                                    </div>

                                    {/*input date*/}
                                    <div className="input__container">
                                        <DatePicker className="input-date" selected={this.state.moveDate}
                                                    onChange={this.handleChange}/>
                                        <div className="error">{this.isEmpty(this.state.errors) ? '' : this.state.errors.moveDate}</div>
                                    </div>

                                    {/*select bedroom number*/}
                                    <select
                                        className="input-bottom select">{this.state.bedRoomNumber.map((bedRoom, index) =>
                                        <option value={this.state.bedRoomNumber} key={index}
                                                name="bedRoom">{bedRoom}</option>)}</select>
                                    <div className="error">{this.isEmpty(this.state.errors) ? '' : this.state.errors.bedRoomNumber}</div>
                                </div>
                                <button className="sendButton" onClick={this.ayaka} type="submit"
                                        name="submitButton">Get a Quote
                                </button>
                            </form>
                        </div>
                    </div>
                </section>

                <section className="values">
                    <h2>Why mymovingcost.com ?</h2>
                    <div className="values__flex">
                        <div className="values__flex--item">
                            <img src={sandclock} alt="sand clock"/>
                            <h3>Save time</h3>
                            <p>It takes only 1 minute</p>
                        </div>
                        <div className="values__flex--item">
                            <img src={coin} alt="coin"/>
                            <h3>Save money</h3>
                            <p>Save up to %70 on your move</p>
                        </div>
                        <div className="values__flex--item">
                            <img src={track} alt="tracking car"/>
                            <h3>Compare top movers</h3>
                            <p>Receive quotes from different movers</p>
                        </div>
                    </div>
                    <div className="info">
                        <p className="info--item">We are here to help you to contact with the reliable moving companies and receive the best service for your upcoming move.</p>
                        <p className="info--item">Whether you are moving locally or long distance, you will be able to compare the moving companies with one click.</p>
                        <p className="info--item">You will receive pricing information and plan your budget appropriately.</p>
                        <p className="info--item">You will also receive information regarding the services of the movers and may decide to go with the one according to your needs.</p>
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

export default Lead;