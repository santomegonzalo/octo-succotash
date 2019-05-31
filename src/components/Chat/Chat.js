import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import './Chat.css';

class Chat extends React.PureComponent {
	constructor(props) {
		super(props);

		this.handleMouseEnter = this.handleMouseEnter.bind(this);
		this.handleMouseLeave = this.handleMouseLeave.bind(this);

		this.state = {
			isEmailVisible: false
		};
	}

	render() {
		const { isEmailVisible } = this.state;
		const { fullName, timestamp, email, message, avatar } = this.props;

		return (
			<div
				className="Chat"
				onMouseEnter={this.handleMouseEnter}
				onMouseLeave={this.handleMouseLeave}
			>
				{avatar && (
					<img className="ChatAvatar" alt={fullName} src={avatar} />
				)}
				<div className="ChatData">
					<p className="ChatName">
						{isEmailVisible ? `${fullName} <${email}>` : fullName}
					</p>
					<p className="ChatMessage">{message}</p>
					<p className="ChatTime">
						{format(new Date(timestamp), 'DD/MM/YYYY HH:mm')}
					</p>
				</div>
			</div>
		);
	}

	handleMouseEnter() {
		this.setState({
			isEmailVisible: true
		});
	}

	handleMouseLeave() {
		this.setState({
			isEmailVisible: false
		});
	}
}

Chat.propTypes = {
	messageId: PropTypes.string,
	userId: PropTypes.string,
	fullName: PropTypes.string,
	timestamp: PropTypes.string,
	email: PropTypes.string,
	message: PropTypes.string,
	avatar: PropTypes.string
};

export default Chat;
