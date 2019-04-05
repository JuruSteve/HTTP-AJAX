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
      id: "",
      updateButton: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.oldFriend !== prevProps.oldFriend) {
      this.setState({
        ...this.props.oldFriend,
        updateButton: !this.state.updateButton
      });
    }
  }

  handleChange = name => e => {
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
    this.props.addFriend(newFriend);
    this.clearState();
  };
  updateFriend = (id, e) => {};
  inputValue = opt => {
    let val = this.state.opt ? this.state.opt : this.props.oldFriend.opt;
    return val;
  };
  clearState = () => {
    return this.setState({
      name: "",
      email: "",
      id: "",
      age: "",
      updateButton: !this.state.updateButton
    });
  };
  render() {
    return (
      <div className="add-friend">
        <h2>Update friend's Info</h2>
        <form
          onSubmit={e => {
            if (
              this.props.oldFriend &&
              this.props.oldFriend.id === this.state.id
            ) {
              this.props.updateOldFriend(this.state, e, this.clearState());
            } else {
              this.submitFriend(e);
            }
          }}
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
            {// this.props.oldFriend === this.state &&
            this.state.updateButton ? "Update" : "Submit"}
          </button>
        </form>
      </div>
    );
  }
}
