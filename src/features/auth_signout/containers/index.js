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
  selectClear
} from './../selectors';
import { Redirect, Route } from "react-router-dom";
import {
  branch,
  renderComponent,
  withProps
} from "recompose";
const redirect = withProps({ to: `/auth/signin` })(Redirect);

const mapStateToProps = (state: any) => ({
  pageData: selectPageData(state),
  errorData: selectError(state),
  isLoad: selectLoader(state),
  isClear: selectClear(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export default compose(
  setDisplayName(`components/${NAME}`),
  connect(mapStateToProps, mapDispatchToProps),
  branch(props => !!props.isClear, renderComponent(redirect)),
  reduxForm({
    form: FORM_NAME,
    touchOnChange: false,
    validate: validators
  }),
  addSaga({sagas}), 
  addReducer(NAME, reducers),
  lifecycle({
    componentDidMount(){
      this.props.actions.logOut();
    },
    componentWillUnmount(){
      actionCreators.refresh();
    }
  }),
  defaultProps({
    location:{
      state: {}
    } 
  }),
)(Component);

