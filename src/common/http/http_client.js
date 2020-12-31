
import axios from 'axios';

class HttpClient {
  async get(url) {
    return axios({
      url,
      method: 'GET'
    })
  }

  async getFile(url) {
    return axios({
      url,
      method: 'GET',
      responseType: 'stream',
      responseEncoding: 'utf8'
    })
  }
}

export default new HttpClient;