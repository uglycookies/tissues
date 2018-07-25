const React = require('react');

let style = {
  position: 'absolute',
  width: '100%',
  top: '420px',
  display: 'flex',
  justifyContent: 'center',
}

export class ButtonContainer extends React.Component {
state={issueStatus:'open'}

  // get status() {
  //   return this.props.issueStatus === true ? 'open' : 'close';
  // }


  render() {
    return(
      <div className='buttons' style={style}>
        <button id='openIssueButton' onClick={(e)=>this.props.handleClick(e)} key={0} name="open" style={{height: '50px', width: '400px', fontSize: '30px'}}>OPEN</button>
        <button id='closeIssuesButton'onClick={(e)=>this.props.handleClick(e)} key={1} name="close" style={{height: '50px', width: '400px', fontSize: '30px'}}>CLOSE</button>
      </div>
    )
  }
}
