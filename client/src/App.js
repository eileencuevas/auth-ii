import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Route } from 'react-router-dom';

import Form from './components/Form';
import Navigation from './components/Navigation';
import UsersList from './components/UsersList';

class App extends Component {
  state = {
    users: [],
  }

  logout = () => {
    localStorage.removeItem('jwt');
    window.location.reload();
  }

  componentDidMount() {
    const token = localStorage.getItem('jwt');
    const requestOptions = {
      headers: {
        authorization: token,
      }
    }
    axios
      .get('http://localhost:5000/api/users/', requestOptions)
      .then(response => {
        console.log(response);
        this.setState({ users: response.data })
      })
      .catch(() =>{
        console.log('Please Log In to recieve users.');
      });
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        <Route 
          exact path='/signin' 
          render={props => (
            <Form {...props} />
          )} 
        />
        <Route 
          exact path='/signup' 
          render={props => (
            <Form {...props} register/>
          )} 
        />
        <Route 
          exact path='/'
          render={props => (
            <UsersList users={this.state.users}/>
          )}
        />
        {this.state.users.length > 0 ? 
          <button onSubmit={this.logout}>Sign Out</button> : <></>
        }
      </div>
    );
  }
}

export default App;
