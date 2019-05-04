import axios from 'axios';

class FileUploadService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/api`,
      withCredentials: true
    });
  }

  handleUpload(theFile, getProgress) {
    console.log('file in service: ', theFile)
    return this.service.post('/upload', theFile, {
      onUploadProgress: event => {
        if (event.lengthComputable) {
          let percentage = (event.loaded / event.total) * 100;
          console.log(parseInt(percentage).toFixed(2) + "%");

          getProgress(parseInt(percentage));
        }
      }
    })
      .then(res => {
        console.log(res)
        return res.data;
      })
      .catch(error => { throw new Error(error) });
  }

}

export default FileUploadService;