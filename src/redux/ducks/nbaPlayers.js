const SET_PLAYERS = 'react-redux-setup/counter/set_players';

const initialState = {
  nbaPlayers: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PLAYERS:
      return { ...state, nbaPlayers: action.payload };
    default:
      return state;
  }
};

export const setPlayers = (payload) => ({
  type: SET_PLAYERS,
  payload,
});
