import React from "react";
import Friend from "../Friend/Friend";
import "./FriendList.css";

const FriendsList = props => {
  return (
    <div className="list-container">
      <div className="title">
        <h2>Friends</h2>
      </div>
      <div className="list">
        {props.friends.map((friend, i) => {
          return (
            <Friend
              key={i}
              update={props.update}
              deleteFriend={props.delete}
              friend={friend}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FriendsList;
