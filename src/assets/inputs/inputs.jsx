import React from 'react';
import './inputs.scss';
import PropTypes from 'prop-types';

export default function renderInputs(props) {
  const { name, inputValueArray, onChangeValue } = props;
  return (
    <div className="inputs">
      <span className="inputs-label">{name}</span>
      <input type="text" value={inputValueArray} onChange={onChangeValue} />
    </div>
  );
}

renderInputs.propTypes = {
  name: PropTypes.string.isRequired,
  inputValueArray: PropTypes.number,
  onChangeValue: PropTypes.func.isRequired,
};

renderInputs.defaultProps = {
  inputValueArray: 0,
};
