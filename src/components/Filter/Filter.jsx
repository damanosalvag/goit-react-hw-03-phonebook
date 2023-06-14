import React, { Component } from "react";
import PropTypes from "prop-types";

class Filter extends Component {
  componentDidMount() {
    this.propTypes = {
      filter: PropTypes.string.isRequired,
      handleChange: PropTypes.func.isRequired,
    };
  }
  render() {
    const { filter, handleChange } = this.props;
    return (
      <div>
        <label className="display">
          Find contacts by name
          <input
            type="text"
            name="filter"
            title="Insert any name you want to search for."
            onChange={handleChange}
            value={filter}
          ></input>
        </label>
      </div>
    );
  }
}
export default Filter;
