// @flow
import * as React from 'react';
import { Redirect } from 'react-router-dom';

class Forward extends React.Component {
  forwardParams(to, computedMatch) {
    const paramKeys = Object.keys(computedMatch.params);

    const replacedParamsKeys = paramKeys.reduce(
      (url, key) => url.replace(`:${key}`, computedMatch.params[key]),
      to
    );

    return replacedParamsKeys;
  }

  render() {
    const { to, computedMatch, location, ...props } = this.props;

    return (
      <Redirect
        to={{
          state: { from: location },
          pathname: this.forwardParams(to, computedMatch),
          search: location.search
        }}
        {...props}
      />
    );
  }
}

export default Forward;
