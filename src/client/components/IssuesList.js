const React = require('react');
const ReactDOM = require ('react-dom');
import { IssueContainer } from './IssueContainer';

let listStyle = {
  position: 'absolute',
  marginTop: '500px',
  // backgroundColor: '#f4f4f2',
  // left: '12%',
}

export class IssuesList extends React.Component {

  get createIssues() {
    let dataList = this.props.dataList;
    let issues = [];
    dataList.forEach(row => {
      issues.push(<IssueContainer key={dataList.indexOf(row)} issueStatus={row.open} data={row} type={row.type} start={row.start} end={row.end} description={row.description}/>);
    })
    return issues;
  }

  render() {

    return(
      <div style={listStyle} state={this.props.state}>
        {this.createIssues}
      </div>
    )
  }
}
