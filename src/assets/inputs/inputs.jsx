import React from 'react';
import './inputs.scss';
import PropTypes from 'prop-types';

export default function renderInputs(props) {
  const { name } = props;
  return (
    <div className="inputs">
      <span className="inputs-label">{name}</span>
      <input type="text" />
    </div>
  );
}

renderInputs.propTypes = {
  name: PropTypes.string.isRequired,
};
