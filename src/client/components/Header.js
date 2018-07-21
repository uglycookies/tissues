const React = require('react');

let headerStyle = {
  color: 'white',
  position: 'absolute',
  backgroundColor: '#041735',
  width: '100%',
  height: '200px',
  float: 'center',
  top: '0',
  textAlign: 'center',
  verticalAlign: 'middle',
  lineHeight: '90px'
}

export class Header extends React.Component {

  render() {
    return (
      <div key={0} id='header' style={headerStyle}>
        <div key={0} style={{position: 'center', width: '100%', marginTop: '20px', fontSize: '90px'}}>{'TISSUES'}</div>
        <div key={1} style={{width: '100%', fontSize: '41px'}}>{'FOR YOUR ISSUES'} </div>
      </div>
    )
  }
}
