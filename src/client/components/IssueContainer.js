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

  get date() {
    let date = {};
    date.start = this.props.start.slice(0, 10);
    if(this.props.end !== null) {
      date.end = this.props.end.slice(0, 10);
    } else {
      date.end = this.props.end;
    }
    return date;
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
        <div className="startDate_container" style={{width: '100px'}}>
          <p>{this.date.start}</p>
        </div>
        <div className="endDate_container" style={{width: '100px'}}>
          <p>{this.date.end}</p>
        </div>
      </div>
    )
  }
}
