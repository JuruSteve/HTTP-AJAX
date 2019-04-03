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

  updateFriend = id => {
    const oldFriend = this.state.friendsList.find(friend => {
      return friend.id === id;
    });
    this.updateOldFriend(oldFriend);
  };

  updateOldFriend = oldFriend => {
    console.log(oldFriend);
    this.setState({ oldFriend });
    return oldFriend;
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
          />
          <AddFriend oldFriend={this.state.oldFriend} />
        </div>
      </div>
    );
  }
}

export default App;
