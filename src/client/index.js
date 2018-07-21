import React from 'react';
import ReactDOM from 'react-dom';
import OpenIssues from './openIssues.js';
export  default class Index extends React.Component{
	render(){
		return <div>
		  <h1> Hello World</h1>
			<OpenIssues />
		</div>
	}
}

ReactDOM.render(<Index />, document.getElementById('app'))
