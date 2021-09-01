import React from "react";

const Filtering = (props: {
  items: string[];
  onItemSelect: (language: string) => void;
  selectedItem: string;
}) => {
  return (
    <ul className="list-group">
      {props.items.map((item, index) => (
        <li
          key={index}
          onClick={() => props.onItemSelect(item)}
          className={
            item === props.selectedItem
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          {item !== null ? item : "No language"}
        </li>
      ))}
    </ul>
  );
};

export default Filtering;
