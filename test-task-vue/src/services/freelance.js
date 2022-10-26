import axios from 'axios';

class FreelanceService {
  static async update(card, id) {
    const data = (await axios.patch(`/api/freelancehabr/${id}/`, card)).data;

    return data;
  }

  static async removeById(id) {
    const data = (await axios.delete(`/api/freelancehabr/${id}`)).data;

    return data;
  }
}

export default FreelanceService;
