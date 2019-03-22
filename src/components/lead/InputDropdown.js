import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Moon from '../../connection/Moon';
import Loading from './CircularLoading';

const moon = new Moon();

export default class InputDropdown extends Component{

    constructor(props) {
        super(props);

        this.state = {
            prov: [],
            areaList: [],
            items: [],
            isLoading: false
        }

        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
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

    disabledInput = () => {
        var element = ReactDOM.findDOMNode(this.refs.test);
        element.setAttribute('disabled', 'true');
    };


    onChange(e){

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

    filterList = (e) => {
        const updateList = this.state.areaList.filter((item) => {
            return item.toLowerCase().search( e.target.value.toLowerCase()) !== -1;
        })
        this.setState({items: updateList})
    };


    render() {
        return (
            <div>
                <Loading isLoading={this.state.isLoading} />
                <select
                    id="errCatch"
                    onChange={this.onChange}
                    className="input__city-item">
                    <option value=''> </option>
                    {
                    this.state.prov.map((prov, index) =>
                        <option key={index} name="areaList">{prov.name}</option>)}
                </select>

                <input id="errCatch" ref="test" className="input__city-item"　onChange={this.filterList} />
                <div>
                    {this.state.items.map((area, index) => {
                        return ( <li key={index} >{area}</li> )
                    })}
                </div>

            </div>
        );

    }
}
