// @flow
import * as React from 'react';
import { render } from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from "react-redux";
import Layout from "./components/layout";
import ApplicationNavigator from "./navigation";
import store from "./store";
import './styles/index.css';
import Context from './../src/features/context'


const ROOT_CONTAINER_SELECTOR = 'root';
const rootEl = document.getElementById(ROOT_CONTAINER_SELECTOR);
if (!(rootEl instanceof Element)) {
  throw new Error('invalid type');
}

class ShareSkills extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Layout>
          <Context>
            <ApplicationNavigator />
            </Context>
        </Layout>
      </Provider>
    );
  }
}

render(<ShareSkills />, rootEl);

registerServiceWorker();