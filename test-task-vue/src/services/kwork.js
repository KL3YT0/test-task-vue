import axios from 'axios';

class KworkService {
  static async update(card, id) {
    const data = (await axios.patch(`/api/kworkservice/${id}`, card)).data;

    return data;
  }

  static async removeById(id) {
    const data = (await axios.delete(`/api/kworkservice/${id}/`)).data;

    return data;
  }
}

export default KworkService;
