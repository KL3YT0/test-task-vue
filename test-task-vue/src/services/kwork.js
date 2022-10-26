import axios from 'axios';

class KworkService {
  static async update(card, id) {
    try {
      const data = (await axios.patch(`/api/kworkservice/${id}`, card)).data;
      return data;
    } catch (err) {
      throw Error(err);
    }
  }

  static async removeById(id) {
    try {
      const data = (await axios.delete(`/api/kworkservice/${id}/`)).data;
      return data;
    } catch (err) {
      throw Error(err);
    }
  }
}

export default KworkService;
