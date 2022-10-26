import axios from 'axios';

class ParseService {
  static async createRequest(body) {
    try {
      const data = (await axios.post(`/parser-config/`, body)).data;
      return data;
    } catch (err) {
      throw Error(err);
    }
  }

  static async getDataByHashParsource(hashParsource) {
    try {
      const data = (
        await axios.get(`/parser-config/`, {
          params: {
            hash_parsource: hashParsource,
          },
        })
      ).data;
      return data;
    } catch (err) {
      throw Error(err);
    }
  }

  static async getAllData() {
    try {
      const data = (await axios.get(`/parser-config/`)).data;
      return data;
    } catch (err) {
      throw Error(err);
    }
  }
}

export default ParseService;
