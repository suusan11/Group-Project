import React, { Component } from 'react';


import Table from './components/common/Table';
//top page
import Lead from './components/lead/Lead.js';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Lead />
                <Table />
            </div>
        );
    }
}

export default App;
