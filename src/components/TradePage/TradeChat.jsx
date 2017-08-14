import React, { Component } from "react";
import PropTypes from "prop-types";

class TradeChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ""
    };

    this.onContentUpdate = this.onContentUpdate.bind(this);
    this.onChatSubmit = this.onChatSubmit.bind(this);
  }

  onContentUpdate(e) {
    this.setState({ content: e.target.value });
  }

  onChatSubmit(e) {
    e.preventDefault();
    const { content } = this.state;
    this.props.handleChatSubmit(content);
    this.setState({ content: "" });
  }

  renderMessages() {
    const { messages } = this.props;
    if (messages.length === 0) {
      return <div className="c-trade-chat__placeholder">No Messages Yet!</div>;
    }
    return messages.map(message => {
      const { sender, content } = message;
      return (
        <div className="l-flex__col l-trade-chat__messages" key={message._id}>
          <div className="c-trade-chat__sender">
            {sender}:
          </div>
          <div className="c-trade-chat__content">
            {content}
          </div>
        </div>
      );
    });
  }

  renderChatInput() {
    return (
      <form className="l-flex__row">
        <input
          className="c-form__input"
          value={this.state.content}
          placeholder="Send a message"
          onChange={this.onContentUpdate}
        />
        <button
          className="c-button c-trade-chat__input-button"
          onClick={this.onChatSubmit}
        >
          <span className="glyphicon glyphicon-arrow-right" />
        </button>
      </form>
    );
  }

  render() {
    return (
      <div className="c-trade-chat">
        <div className="c-trade-chat__messages">
          {this.renderMessages()}
        </div>
        <div className="c-trade-chat__input">
          {this.renderChatInput()}
        </div>
      </div>
    );
  }
}

TradeChat.propTypes = {
  messages: PropTypes.array.isRequired,
  handleChatSubmit: PropTypes.func.isRequired
};

export default TradeChat;
