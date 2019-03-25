import React, { Component } from 'react';

import Lead from './components/lead/Lead';
import Admin from './components/admin/Admin';


class App extends Component {
    render() {
        return (
            <div className="App">
                <Lead />
                <Admin />
            </div>
        );
    }
}

export default App;
