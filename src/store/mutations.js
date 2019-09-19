import {SET_USER} from "./mutation-types";

export default {
  [SET_USER](state, data) {
    state.user = data;
  },
};
