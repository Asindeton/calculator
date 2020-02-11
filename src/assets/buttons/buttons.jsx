import React from 'react';
import './buttons.scss';
import PropTypes from 'prop-types';

export default function renderButtons(props) {
  const { name, onClick } = props;
  return (
    <>
      <button type="button" onClick={onClick}>
        {name}
      </button>
    </>
  );
}

renderButtons.propTypes = {
  name: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};
