import * as components from './components';
import containers from './containers';
import * as actions from './actions'
import * as constants from './constants';
import reducer, { initialState } from './reducers';

export {
    actions,
    components,
    containers,
    constants,
    reducer,
    initialState,
  };

  export default Object.assign(containers, { actions, components, constants, reducer, initialState });