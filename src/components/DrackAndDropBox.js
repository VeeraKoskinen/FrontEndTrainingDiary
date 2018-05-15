import React from 'react';
import Dropzone from 'react-dropzone';
import '../index.css';

class DrackAndDropBox extends React.Component {
    constructor(props) {
        super(props)
    }

  render() {
    return (
      <div className="dropbox">
        <Dropzone onDrop={this.props.onDrop} 
          accept="image/gif, image/png, image/jpeg"
          className="drop-zone"
          activeClassName="drop-zone-active"
          rejectClassName="drop-zone-reject"
          multiple={false}
          > 

          Drop your files here!
        </Dropzone>
      </div>
    )
  }
}

export default DrackAndDropBox;