import axios from 'axios';

class FreelanceService {
  static async update(card, id) {
    try {
      const data = (await axios.patch(`/api/freelancehabr/${id}/`, card)).data;
      return data;
    } catch (err) {
      throw Error(err);
    }
  }

  static async removeById(id) {
    try {
      /* const data = (await axios.delete(`/api/freelancehabr/${id}`)).data; */
      const data = (await axios.delete(`/api/freelancehabr}`)).data;
      console.log(id);
      return data;
    } catch (err) {
      throw Error(err);
    }
  }
}

export default FreelanceService;
