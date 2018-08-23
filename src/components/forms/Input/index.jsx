// @flow

import * as React from 'react';
import type { FieldProps } from 'redux-form';
import moment from 'moment';
import classNames from 'classnames';
import { Field } from 'redux-form';

type RenderProps = {
  help: ?string | React.Element<'div'> | React.Element<'span'> | null,
  label: string,
  icon: ?any,
  forID: ?string,
  iconAppend: ?any,
  iconPrepend: ?any,
  iconButtonAppend: ?any,
  inputRef: ?Function
} & FieldProps;

const renderInput = ({
  input,
  meta,
  meta: { asyncValidating, error, warning },
  help,
  label,
  icon,
  forID,
  inputRef,
  align,
  iconAppend,
  iconPrepend,
  iconButtonAppend,
  required,
  touched,
  ...rest
}: RenderProps) => {
  touched = touched || meta.touched;
  const formClass: string = classNames({
    'form-group': true,
    [`text-${(align && align) || 'left'}`]: true,
    'async-validating': !!asyncValidating,
    'has-danger': touched && !!error,
    'has-warning': touched && !!warning,
    required: required
  });
  return (
    <div className={formClass}>
      {label && (
        <label className="form-control-label" htmlFor={forID}>
          {label}
        </label>
      )}
      <div className="input-group">
        {(icon || iconPrepend) && (
          <div className="input-group-prepend">
            <span className="input-group-text">{icon || iconPrepend}</span>
          </div>
        )}
        <input
          ref={inputRef}
          className="form-control"
          id={forID}
          {...input}
          {...rest}
        />
        {iconAppend && (
          <div className="input-group-append">
            <span className="input-group-text">{iconAppend}</span>
          </div>
        )}
        {iconButtonAppend && (
          <div className="input-group-append">{iconButtonAppend}</div>
        )}
      </div>
      {touched && (error || warning) ? (
        <span className="form-control-feedback">{error || warning}</span>
      ) : null}
      {help && <small className="form-text text-muted">{help}</small>}
    </div>
  );
};

type Props = {
  name: string,
  inputRef: ?Function,
  type: ?string,
  help: ?string | React.Element<'div'> | React.Element<'span'> | null,
  label: ?string,
  forID: ?string,
  icon: ?any,
  iconAppend: ?any,
  iconPrepend: ?any,
  iconButtonAppend: ?any,
  align: ?string
};

class Input extends React.Component<Props, any> {
  static defaultProps: Props = {
    name: 'name',
    type: 'text',
    inputRef: null,
    help: null,
    label: null,
    forID: null,
    icon: null,
    iconAppend: null,
    iconPrepend: null
  };
  format: Function;
  parse: Function;
  constructor() {
    super(...arguments);
    this.format = this.format.bind(this);
    this.parse = this.parse.bind(this);
  }
  format(value: string | number) {
    if (this.props.type === 'date') {
      return value ? moment(value).format('YYYY-MM-DD') : '';
    }
    if ( typeof value === 'number') {
      return value.toString();
    }
    return value || '';
  }
  parse(value: string) {
    if (this.props.type === 'date') {
      return value ? moment(value).format('YYYY-MM-DD HH:mm:ss.000000') : '';
    }
    return value || '';
  }
  render(): React.Node | null {
    const { name, ...rest } = this.props;
    return (
      <Field
        name={name}
        format={this.format}
        parse={this.parse}
        component={renderInput}
        {...rest}
      />
    );
  }
}

export default Input;
