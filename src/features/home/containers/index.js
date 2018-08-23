// @flow

import { connect } from 'react-redux';
import { NAME } from './../constants';
import * as actionCreators from './../actions';
import { bindActionCreators } from 'redux';
import { 
  compose, 
  setDisplayName,
  lifecycle,
} from 'recompose'
import addSaga from "./../../../HOComponents/addSaga";
import addReducer from "./../../../HOComponents/addReducer";
import Component from "./../components";
import reducers from "./../reducers";
import sagas from "./../sagas";
import { 
  selectPageData, 
  selectError,
  selectLoader
} from './../selectors';

const mapStateToProps = (state: any) => ({
  pageData: selectPageData(state),
  errorData: selectError(state),
  isLoad: selectLoader(state)
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),    
  addReducer(NAME,reducers),
  addSaga({sagas}),
  setDisplayName(`components/${NAME}`),
  lifecycle({
    componentDidMount(){
      // debugger;
      this.props.actions.loadPage();
    },
    componentWillUnmount(){
      // debugger;
      this.props.actions.refresh();
      this.props.destroy();
    }
  })
)(Component);

