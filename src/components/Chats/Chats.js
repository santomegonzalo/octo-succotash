import React from 'react';

import getChatLog from '../../service';

import Chat from '../Chat';

import './Chats.css';

class Chats extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			chats: []
		};
	}

	async componentDidMount() {
		this.loadData();
	}

	render() {
		const { chats, isLoading } = this.state;

		if (!isLoading && chats.length === 0) {
			return <p>There is nothing to show...</p>;
		}

		return (
			<div className="Chats">
				{isLoading && <p className="ChatsLoading">loading chat...</p>}
				{chats.map(chat => (
					<Chat key={`chat-${chat.messageId}`} {...chat} />
				))}
			</div>
		);
	}

	async loadData() {
		const chats = await getChatLog();

		this.setState({
			isLoading: false,
			chats
		});
	}
}

export default Chats;
