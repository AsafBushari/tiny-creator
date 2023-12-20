import { createStore } from 'vuex';
import api from '../api/axiosSetup';

export default createStore({
  actions: {
    async getFullToTiny(_, urlObj){
      return api().post('get-full-to-tiny', urlObj);
    },
    async getTinyToFull(_, urlObj){
      return api().post('get-tiny-to-full', urlObj);
    },
  }
})
