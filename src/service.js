import { getMessages, getMembers } from './data';

function sortByTime(messageA, messageB) {
	return (
		new Date(messageA.timestamp).getTime() -
		new Date(messageB.timestamp).getTime()
	);
}

export default async function getChatLog() {
	try {
		const [messages, members] = await Promise.all([
			getMessages(),
			getMembers()
		]);

		if (messages.length === 0 || members.length === 0) {
			return [];
		}

		const membersMap = new Map();

		members.forEach(member => {
			membersMap.set(member.id, member);
		});

		return messages
			.sort(sortByTime)
			.map(({ id, userId, timestamp, message }) => {
				const member = membersMap.get(userId);

				return {
					messageId: id,
					userId: member.id,
					fullName: `${member.firstName} ${member.lastName}`,
					timestamp,
					email: member.email,
					message,
					avatar: member.avatar
				};
			});
	} catch (err) {
		console.error(`Something happened retrieving the data: ${err}`);

		throw err;
	}
}
