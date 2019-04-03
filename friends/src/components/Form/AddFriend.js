import React, { Component } from "react";
import axios from "axios";
import "./AddFriend.css";

export default class AddFriend extends Component {
  constructor(props) {
    super();
    this.state = {
      age: "",
      name: "",
      email: "",
      id: ""
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.oldFriend !== prevProps.oldFriend) {
      this.setState({ ...this.props.oldFriend });
    }
  }

  handleChange = name => e => {
    console.log(e.target.value);
    this.setState({ [name]: e.target.value });
  };
  submitFriend = e => {
    e.preventDefault();
    let rdm = Math.floor(Math.random() * (201 - 7 + 1) + 7);
    let id = rdm;
    let newFriend = {
      ...this.state,
      id: id + 1
    };
    axios
      .post("http://localhost:5000/friends", newFriend)
      .then(res => console.log(res));
    // console.log(this.state, newFriend);
  };
  updateFriend = (id, e) => {
    e.preventDefault();
    const updatedFriend = axios
      .post(`http://localhost:5000/friends/${id}`, this.state)
      .then(res => console.log(res))
      .catch(err => console.log("err", err));
    // console.log("updateFriend", updatedFriend);
    console.log("updateFriend", id);
  };
  inputValue = opt => {
    console.log(opt, this.state[opt], "o");
    let val = this.state.opt ? this.state.opt : this.props.oldFriend.opt;
    return val;
  };
  render() {
    return (
      <div className="add-friend">
        <h2>Update friend's Info</h2>
        <form
          onSubmit={
            this.props.oldFriend === this.state
              ? this.submitFriend
              : e => this.updateFriend(this.state.id, e)
          }
        >
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            onChange={this.handleChange("name")}
            value={this.state.name}
          />

          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            onChange={this.handleChange("email")}
            value={this.state.email}
          />

          <label htmlFor="age">Age:</label>
          <input
            type="text"
            name="age"
            onChange={this.handleChange("age")}
            value={this.state.age}
          />
          <button type="submit">
            {this.props.oldFriend !== null ? "Update" : "Submit"}
          </button>
        </form>
      </div>
    );
  }
}
