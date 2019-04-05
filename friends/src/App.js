import React, { Component } from "react";
import axios from "axios";

import "./App.css";
import FriendsList from "./components/FriendList/FriendsList";
import AddFriend from "./components/Form/AddFriend";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      friendsList: [],
      oldFriend: null
    };
  }

  componentDidMount = () => {
    axios.get("http://localhost:5000/friends").then(res => {
      this.setState({
        friendsList: res.data
      });
    });
  };

  addFriend = friend => {
    axios
      .post("http://localhost:5000/friends", friend)
      .then(res => {
        this.setState({ friendsList: [...this.state.friendsList, friend] });
      })
      .catch(err => {
        throw new Error("Error adding friends", err);
      });
  };

  updateFriend = id => {
    const oldFriend = this.state.friendsList.find(friend => {
      return friend.id === id;
    });
    this.setState({ oldFriend });
  };

  updateOldFriend = (updatedInfo, e) => {
    e.preventDefault();
    const updatedFriend = axios
      .put(`http://localhost:5000/friends/${updatedInfo.id}`, updatedInfo)
      .then(res => {
        this.setState({ friendsList: res.data });
      })
      .catch(err => console.log("err", err));
    return updatedFriend;
  };

  deleteFriend = id => {
    const oldGroup = this.state.friendsList.slice();
    const oldFriend = oldGroup.find(friend => {
      return friend.id === id;
    });
    const newGroup = oldGroup.filter(friend => {
      return friend.id !== oldFriend.id;
    });
    this.setState({ friendsList: newGroup });
  };

  render() {
    return (
      <div className="App">
        <header>
          <h1>Welcome To FriendList App</h1>
        </header>
        <div className="friends-list">
          <FriendsList
            friends={this.state.friendsList}
            update={this.updateFriend}
            delete={this.deleteFriend}
          />
          <AddFriend
            oldFriend={this.state.oldFriend}
            addFriend={this.addFriend}
            updateOldFriend={this.updateOldFriend}
          />
        </div>
      </div>
    );
  }
}

export default App;
