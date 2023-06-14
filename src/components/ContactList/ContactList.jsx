import React, { Component } from "react";
import styles from "./ContactList.module.css";
import PropTypes from "prop-types";

class ContactList extends Component {
  componentDidMount() {
    this.propTypes = {
      filteredNames: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          number: PropTypes.string.isRequired,
        })
      ).isRequired,
      onDelete: PropTypes.func.isRequired,
    };
  }
  render() {
    const { filteredNames, onDelete } = this.props;
    return (
      <ol>
        {filteredNames.map((contact) => (
          <li key={contact.id}>
            <div className={styles["contact"]}>
              {contact.name}: {contact.number}
              <button
                onClick={() => onDelete(contact.id)}
                className={styles["delete-btn"]}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ol>
    );
  }
}

export default ContactList;
