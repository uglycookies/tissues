import React from 'react';
import ReactDOM from 'react-dom';
import OpenIssues from './openIssues.js';
import Login from './login'
export  default class Index extends React.Component{
	render(){
		return <div>
		  <h1> Hello World</h1>
			<Login />
			<OpenIssues />
		</div>
	}
}
//
ReactDOM.render(<Index />, document.getElementById('app'))
