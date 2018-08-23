import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NAME } from './../constants'
import * as actionCreators from './../actions';
import addReducer from "./../../../HOComponents/addReducer";
import { compose, withContext} from 'recompose';
import * as PropTypes from 'prop-types'
import Component from './../components'
import reducers from './../reducers'


const mapStateToProps = (state: any) => ({
   contextData: state.CONTEXT.contextData,
  });
const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators(actionCreators, dispatch)
  });

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    addReducer(NAME, reducers),
    withContext(
        {token: PropTypes.object},
        props => ({ token: props.contextData })
    )
)(Component)