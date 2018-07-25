import React from 'react';
import Axios from 'axios';

export default class Login extends React.Component {
  state = {
    message: 'Please enter your Login Information',
    showDomain: false,
  };

  handleChange = (e) => {
    console.log('handle Change e.target.id', e.target.id);
    this.setState({ [e.target.id]: e.target.value });
  };

  handleClick = (e) => {
    if (e.target.id === 'register') {
      this.setState({
        message: 'Welcome to Tissues for your ISSUES',
        showDomain: true,
      });
    }
    if (e.target.id === 'submit') {
      this.createRequest(this.state.showDomain);
    }
    console.log('e.target.id ', e.target.id);
  };

  createRequest = (login) => {
    if (!login) {
      Axios.post('http://localhost:8080/api/login', {
        username: this.state.username,
        password: this.state.password,
      })
        .then(response => {
        if (response.data === "Invalid username or password") {
          this.setState({ userInfo: response.data, showDashboard: false });
        } else {
        this.setState({ userInfo: response.data, showDashboard: true })
        }
      })
        .catch(e => console.log(e));
    } else {
      Axios.post('http://localhost:8080/api/signup', {
        username: this.state.username,
        password: this.state.password,
        domain: this.state.domain,
      })
        .then((response) => {
          // console.log(response);
          this.setState({ userInfo: response.data, showDashboard: true });
        })
        .catch(e => console.log(e));
    }
  };

  render() {
    const showDomain = this.state.showDomain;
    console.log('this.state.showDashboard ', this.state.showDashboard);
    return (
      <div>
        {!this.state.showDashboard ? (
          <div style={formContainerStyle}>
            <h4 style={messageStyle}>{this.state.message}</h4>
            <div style={inputBoxStyle}>
              <label htmlFor="userName">Username</label>
              <input
                style={inputStyle}
                id="username"
                placeholder="username"
                onChange={e => this.handleChange(e)}
              />
            </div>
            <div style={inputBoxStyle}>
              <label htmlFor="password">Password</label>
              <input
                style={inputStyle}
                type="password"
                id="password"
                placeholder="password"
                onChange={e => this.handleChange(e)}
              />
            </div>
            {showDomain ? (
              <div style={inputBoxStyle}>
                <label htmlFor="domain">Domain</label>
                <input
                  style={inputStyle}
                  id="domain"
                  placeholder="enter domain"
                  onChange={e => this.handleChange(e)}
                />
              </div>
            ) : (
              ''
            )}
            <div>
              {!showDomain ? (
                <button
                  id="register"
                  onClick={(e) => {
                    this.handleClick(e);
                  }}
                >
                  {' '}
                  Register
                </button>
              ) : (
                ''
              )}
              <button
                id="submit"
                onClick={(e) => {
                  this.handleClick(e);
                }}
              >
                {' '}
                {showDomain ? 'Register' : 'Login'}
              </button>
            </div>
          </div>
        ) : (
          <h1>SHOW DASHBOARD</h1>
        )}
      </div>
    );
  }
}

let formContainerStyle = {
  display: 'flex',
  flexFlow: 'column nowrap',
  alignItems: 'center',
  border: 'solid black 0.14rem',
};

let messageStyle = {
  fontFamily: 'Helvetica',
  fontSize: '1rem',
};

let inputStyle = {
  border: 'none',
  border: 'solid black 0.14	rem',
};

let inputBoxStyle = {
  display: 'flex',
  flexFlow: 'column nowrap',
  margin: '1rem',
};
