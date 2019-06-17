import React from 'react';
import Dropzone from 'react-dropzone';
const FileUpload = ({children}) => (
<Dropzone onDrop={(files)=> console.log(files)}>
  {({getRootProps, getInputProps}) => (
    <section>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <span>
          "Drag or drop your 
          file"
          or
        </span>
        <span className="browse_link"> import your contact here </span>
      </div>
    </section>
  )}
</Dropzone>
);
export default FileUpload;