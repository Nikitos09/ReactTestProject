import React from 'react';
import { normalize } from 'normalizr';
import { reduxForm } from 'redux-form';
import { Provider, connect } from 'react-redux';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import Layout from './../index';

const form = reduxForm({
  form: 'test-form',
  touchOnChange: false
});

const mapStateToProps = () => ({});
const mapDispatchToProps = () => ({});
const Container = connect(mapStateToProps, mapDispatchToProps)(form(Layout));

const props = { name: 'test-field' };

const middlewares = [];
const mockStore = configureStore(middlewares);
let store;

describe(`redux-form Input`, () => {
  beforeEach(() => {
    store = mockStore({});
  });
  it('should match snapshot', () => {
    const component = renderer.create(
      <Provider store={store}>
        <Container {...props} />
      </Provider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
