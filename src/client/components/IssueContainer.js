const React = require('react');

let issueStyle = {
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  position: 'relative',
  float: 'right'
  // margin: 'auto',
  // left: '17%',
  // right: '20%',
}
export class IssueContainer extends React.Component {

  get statusDate() {
    return this.props.issueStatus === true ? 'start date' : 'close date';
  }

  get date() {
    return this.props.issueStatus === true ? this.props.start : this.props.end;
  }

  render() {
    return(
      <div id="issueContainer" style={issueStyle}>
        <div className="type"  style={{width: '100px', fontWeight: 'bold'}}>
          <p>
          {this.props.type}
          </p>
        </div>
        <div className="description" style={{width: '500px', marginLeft: '50px'}}>
          <p>
          {this.props.description}
          </p>
        </div>
        <div className="date_container" style={{width: '100px'}}>
          <p>{this.statusDate}</p>
          <p>{this.date}</p>
        </div>
      </div>
    )
  }
}
