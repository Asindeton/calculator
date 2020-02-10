import React from 'react';
import './tabs.scss';
import PropTypes from 'prop-types';

export default function renderTabs(props) {
  const { name, onClick } = props;
  return (
    <div className="tabs" onClick={onClick} role="button" aria-hidden="true">
      <span className="tabs-content">{name}</span>
    </div>
  );
}

renderTabs.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
