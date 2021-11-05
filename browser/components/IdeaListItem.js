import React from "react";
import { Link } from "react-router";

const Idea = ({ name, income, id }) => {
  return (
    <tr>
      <td>
        <p>
          <Link to={`/ideas/${id}`}>{name}</Link>
        </p>
      </td>
      <td>
        <p>
          <Link to={`/ideas/${id}`}>{income}</Link>
        </p>
      </td>
      <td>
        <p>
          <img
            onClick={() => props.deleteIdea(id)}
            className="button x-button"
            src="public/img/x_button.svg"
            alt=""
          />
        </p>
      </td>
    </tr>
  );
};

export default Idea;
