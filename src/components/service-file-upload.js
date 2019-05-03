import axios from 'axios';

class FileUploadService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/api`,
      withCredentials: true
    });
  }

  handleUpload (theFile) {
    // console.log('file in service: ', theFile)
    return this.service.post('/upload', theFile)
      .then(res => res.data)
      .catch(error => {throw new Error(error)});
  }
  
}

export default FileUploadService;