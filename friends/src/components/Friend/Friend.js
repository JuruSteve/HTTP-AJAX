import React from "react";
import "./Friend.css";
const Friend = ({ friend, update }) => {
  return (
    <div className="friend-container">
      <div className="friend-details">
        <p className="delete">X</p>
        <h3>{friend.name}</h3>
        <p>{friend.email}</p>
        <p>{friend.age}</p>
        <div className="update">
          <button
            onClick={() => {
              update(friend.id);
            }}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Friend;
