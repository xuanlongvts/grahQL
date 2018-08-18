import React, { Component } from 'react';
import gpl from 'graphql-tag';
import { graphql } from 'react-apollo';
import logo from './logo.svg';
import './App.css';

const AppQuery = gpl`
    query{
        animals{
            name
        }
    }
`;

class App extends Component {
    render() {
        const { loading, animals } = this.props.data;
        if (loading) {
            return <p>Loading...</p>;
        }

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                {animals.map((animal, index) => {
                    return <p key={index}>{animal.name}</p>;
                })}
            </div>
        );
    }
}

const AppWithData = graphql(AppQuery)(App);
export default AppWithData;
