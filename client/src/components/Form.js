import React from 'react';
import axios from 'axios';

class Form extends React.Component {
    state = {
        username: '',
        password: '',
    }

    handlesChanges = event => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    }

    login = event => {
        event.preventDefault();
        const url = 'http://localhost:5000/api/login/';

        axios
            .post(url, this.state)
            .then(response => {
                localStorage.setItem('jwt', response.data);
                window.location.reload();
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error);
            });
    }

    signup = event => {
        event.preventDefault();
        const url = 'http://localhost:5000/api/register/';

        axios
            .post(url, this.state)
            .then(response => {
                this.props.history.push('/signin');
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return(
            <div>
                <h2>{this.props.register ? 'Sign Up' : 'Sign In'}</h2>
                <form onSubmit={this.props.register ? this.signup : this.login}>
                    <input 
                        name='username'
                        type='text'
                        placeholder='Username'
                        value={this.state.username}
                        onChange={this.handlesChanges}
                    />
                    <input 
                        name='password'
                        type='password'
                        placeholder='Password'
                        value={this.state.password}
                        onChange={this.handlesChanges}
                    />
                    <button>{this.props.register ? 'Register' : 'Sign In'}</button>
                </form>
            </div>
        );
    }
}

export default Form;