import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import { IssuesList } from './components/IssuesList';
import { openIssues, closedIssues } from './dummData';
import { Header } from './components/Header';
import { Download } from './components/Download';
import { ButtonContainer } from './components/ButtonContainer';


let appStyle = {
	fontFamily: 'Helvetica',
}

export class Dashboard extends React.Component{
	constructor(props) {
    super()
			this.state = {};
			this.state.open = true;
			this.state.dataList = [];
			this.handleClick = this.handleClick.bind(this);
}

handleClick=(e)=>{
	const targetId = e.target.id;
	Axios.get('http://localhost:8080/api/issues')
		.then((response)=> {
			let dataList = response.data;
			let issuesInProgress = [];
			let closedIssues = [];
			dataList.forEach(object => {
				if(object.status === 'In progress') {
					issuesInProgress.push(object);
				} else {
					closedIssues.push(object);
				}
			})

			if(targetId === 'openIssueButton'){
				this.setState({'issueStatus':'open','dataList': issuesInProgress },()=>{
				});
			} else {
				this.setState({'issueStatus':'close', 'dataList': closedIssues }, ()=>{
				});
			}
		})

  }

	render() {
		let dataList = this.state.dataList;
		return (

		<div style={appStyle}>
			<Header />
			<Download />
		  <ButtonContainer key='buttons' handleClick={this.handleClick}/>
			<div id='issue_header' style={{position: 'absolute', marginTop: '450px', display: 'flex',
		  justifyContent: 'center', width: '100%', position: 'relative', float: 'right'}}>
				<div>
					<p style={{width: '100px'}}>{'Type'}</p>
				</div>
				<div>
					<p style={{width: '500px', marginLeft: '50px'}}>{'Description'}</p>
				</div>
				<div>
					<p style={{width: '100px'}}>{'Reported'}</p>
				</div>
				<div>
					<p style={{width: '100px'}}>{'Completed'}</p>
				</div>
			</div>
			<IssuesList dataList={dataList} issueStatus={this.state.open}  state={this.state}/>
		</div>)
	}
}
