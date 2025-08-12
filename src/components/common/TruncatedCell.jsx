import React from "react";

const TruncatedCell = ({ text }) => (
  <td className="border px-4 py-2 truncate-text" data-full={text}>
    {text}
  </td>
);

export default TruncatedCell;
