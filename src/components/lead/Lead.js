import React,  { Component } from "react";
import ReactDOM from "react-dom";

import Loading from '../common/Spinner';

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
            areaListTo: [],
            items: [],
            itemsTo: [],
            Data:[],
            prov: [],
            isLoading: false
        }


        this.onChange = this.onChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.ayaka = this.ayaka.bind(this);
        this.isEmpty = this.isEmpty.bind(this);
        this.filterList = this.filterList.bind(this);
        this.getProvFrom = this.getProvFrom.bind(this);
        this.getProvTo = this.getProvTo.bind(this);
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

        moon
            .get('api/area/all')
            .then(res =>{

                let provArray = [];

                for(let i = 0; i < res.data.length; i++) {
                    let obj = {};
                    obj['id'] = res.data[i]._id;
                    obj['name'] = res.data[i].name;
                    provArray.push(obj);
                }

                this.setState({
                    prov: provArray });

            })
            .catch(err => {
                this.disabledInput();
                console.log(JSON.stringify(err));
            })


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
            .then(res =>{

                let provArray = [];

                for(let i = 0; i < res.data.length; i++) {
                    let obj = {};
                    obj['id'] = res.data[i]._id;
                    obj['name'] = res.data[i].name;
                    provArray.push(obj);
                }

                this.setState({
                    prov: provArray });

            })
            .catch(err => {
                this.disabledInput();
                console.log(JSON.stringify(err));
            })
    }


    // Filtering List of area sorted by Province
    ////////////////////////////////////////
    filterList = (e) => {
        const updateList = this.state.areaList.filter((item) => {
            return item.toLowerCase().search( e.target.value.toLowerCase()) !== -1;
        })
        this.setState({items: updateList})
    };

    filterToList = (e) => {
        const updateToList = this.state.areaListTo.filter((item) => {
            return item.toLowerCase().search( e.target.value.toLowerCase()) !== -1;
        })
        this.setState({itemsTo: updateToList})
    };
    ////////////////////////////////////////


    // Get data by Province
    ////////////////////////////////////////
    getProvFrom(e){

        this.setState({isLoading:true})

        e.persist();

        this.state.prov.forEach(prov => {

            if(prov.name === e.target.value ){

                moon
                    .get(`api/area/search/citylist/byareaid/${prov.id}`)
                    .then(res =>{
                        this.setState({isLoading:false})
                        // this.state.areaList.push(res.city);
                        // console.log(this.state.areaList);

                        let arrayCity = [];
                        res.data.map( eachCity => {
                            return arrayCity.push(eachCity.city);
                        });

                        this.setState({areaList:arrayCity});

                    })
                    .catch(err => {
                        this.disabledInput();
                        this.setState({isLoading:false})
                        console.log(JSON.stringify(err));
                    })
            } else return 0

        })


    };

    getProvTo(e){

        this.setState({isLoading:true})

        e.persist();

        this.state.prov.forEach(prov => {

            if(prov.name === e.target.value ){

                moon
                    .get(`api/area/search/citylist/byareaid/${prov.id}`)
                    .then(res =>{
                        this.setState({isLoading:false})
                        this.state.areaListTo.push(res.city);
                        console.log(res);

                        let arrayToCity = [];
                        res.data.map( eachCity => {
                            return arrayToCity.push(eachCity.city);
                        });

                        this.setState({areaListTo:arrayToCity});
                        console.log(this.state.areaListTo);
                    })
                    .catch(err => {
                        this.disabledInput();
                        this.setState({isLoading:false})
                        console.log(JSON.stringify(err));
                    })
            } else return 0

        })


    };


    // Check if the object is empty
    ////////////////////////////////////////
    isEmpty(obj) {
        return !Object.keys(obj).length;
    }
    ////////////////////////////////////////


render() {
        return (
            <div className="App">
                <Loading isLoading={this.state.isLoading} />
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
                                        <select
                                            id="errCatch"
                                            onChange={this.getProvFrom}
                                            className="input__city-item">
                                            <option value=''>Province</option>
                                            {
                                                this.state.prov.map((prov, index) =>
                                                    <option key={index} name="areaList">{prov.name}</option>)}
                                        </select>
                                        <input placeholder="City" id="errCatch" ref="test" className="input__city-item"　onChange={this.filterList} />
                                        <div>
                                            {this.state.items.map((area, index) => {
                                                return ( <li key={index} >{area}</li> )
                                            })}
                                        </div>
                                        <div className="error">{this.isEmpty(this.state.errors) ? '' : this.state.errors.moveFromID}</div>
                                    </div>

                                    {/*select moving to*/}
                                    <div className="input__city">
                                        <div className="city__label">Moving to</div>
                                        <select
                                            id="errCatch"
                                            onChange={this.getProvTo}
                                            className="input__city-item">
                                            <option value=''>Province</option>
                                            {
                                                this.state.prov.map((prov, index) =>
                                                    <option key={index} name="areaList">{prov.name}</option>)}
                                        </select>
                                        <input placeholder="City" id="errCatch" ref="test" className="input__city-item"　onChange={this.filterToList} />
                                            <div>
                                                {this.state.itemsTo.map((area, index) => {
                                                    return ( <li key={index} >{area}</li> )
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
