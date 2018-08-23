// @flow

import { connect } from 'react-redux';
import { FORM_NAME, NAME } from './../constants';
import { reduxForm } from 'redux-form';
import * as actionCreators from './../actions';
import { bindActionCreators } from 'redux';
import { 
  compose, 
  setDisplayName,
  defaultProps,
  withHandlers,
  lifecycle,
} from 'recompose'
import addSaga from "./../../../HOComponents/addSaga";
import addReducer from "./../../../HOComponents/addReducer";
import Component from "./../components";
import reducers from "./../reducers";
import sagas from "./../sagas";
import validators from './../validators';
import { 
  selectPageData, 
  selectError,
  selectLoader,
  selectSuccess,
} from './../selectors';

const mapStateToProps = (state: any) => ({
  pageData: selectPageData(state),
  errorData: selectError(state),
  isLoad: selectLoader(state),
  isSuccess: selectSuccess(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export default compose(
  setDisplayName(`components/${NAME}`),
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: FORM_NAME,
    touchOnChange: false,
    validate: validators
  }),
  addSaga({sagas}), 
  addReducer(NAME, reducers),
  withHandlers({
    sendForm: props => (values: any) => () => {
      return props.actions.sendForm(values);
    }
  }),
  lifecycle({
    componentWillUnmount() {
      this.props.actions.refresh();
      this.props.destroy();
    }
  }),
  defaultProps({
    location:{
      state: {}
    } 
  }),
)(Component);

