import React, { Component } from 'react';

export class MainSearch extends Component {

    onChange = e => {
         
    }
    render() {
        return (
            <div>
                <input type="text" placeholder="Search..." onChange={this.onChange}></input>
                <button type="submit">Search</button>
            </div>
        )
    }
}

export default MainSearch;