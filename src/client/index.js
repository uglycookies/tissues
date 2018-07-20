import React from 'react';
import ReactDOM from 'react-dom';
import OpenIssues from './openIssues.js';
export  default class Index extends React.Component{
	render(){
		return <div>
			<OpenIssues />
		</div>
	}
}

ReactDOM.render(<Index />, document.getElementById('app'))
