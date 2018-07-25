const React = require('react');

let downloadDiv = {
  position: 'absolute',
  marginTop:'200px',
  left: '5%',
  right: '5%',
  display: 'flex',
  justifyContent: 'center',

}

let buttonStyle = {
  width: '480px',
  height: '90px',
  backgroundColor: '#af2323',
  color: 'white',
  fontSize: '40px',
  borderRadius: '10px'
}

export class Download extends React.Component {

  render() {
    return (
      <div key={0} id='download' style={downloadDiv}>
      <a href={'/api/download'}>
        <button key={1} style={buttonStyle}>{'DOWNLOAD LIBRARY'} </button>
        </a>
      </div>
    )
  }
}
