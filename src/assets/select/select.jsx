import React from 'react';
import './select.scss';
import PropTypes from 'prop-types';

export default function renderSelect(props) {
  const { paramArray, name } = props;
  return (
    <>
      <div className="select-wrapper">
        <span>{name}</span>
        <select name="" id="">
          {paramArray.map(e => {
            return (
              <option value={e} key={e.id}>
                {e}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
}

renderSelect.propTypes = {
  paramArray: PropTypes.isRequired,
  name: PropTypes.string.isRequired,
};
