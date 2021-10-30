import { createStore } from 'redux';
import reducer from './ducks/nbaPlayers';

const store = createStore(reducer);

export default store;
