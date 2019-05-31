import * as data from './data';
import getChatLog from './service';

const mockedMessages = require('./messages.json');
const mockedMembers = require('./members.json');

describe('getChatLog()', () => {
	beforeEach(() => {
		data.getMessages = jest.fn().mockReturnValue(mockedMessages);
		data.getMembers = jest.fn().mockReturnValue(mockedMembers);
	});

	it('should match snapshot', async () => {
		const chats = await getChatLog();

		expect(chats).toMatchSnapshot();
	});

	it('returns the correct format', async () => {
		const [firstMessage] = await getChatLog();

		expect(typeof firstMessage.messageId).toBe('string');
		expect(typeof firstMessage.userId).toBe('string');
		expect(typeof firstMessage.fullName).toBe('string');
		expect(typeof firstMessage.timestamp).toBe('string');
		expect(typeof firstMessage.email).toBe('string');
		expect(typeof firstMessage.message).toBe('string');
		expect(
			firstMessage.avatar === null ||
				typeof firstMessage.avatar === 'string'
		).toBeTruthy();
	});

	it('returns sorted array', async () => {
		const chats = await getChatLog();

		const firstChat = chats[0];
		const randomChat =
			chats[Math.floor(Math.random() * (chats.length + 1))];

		expect(
			new Date(firstChat.timestamp).getTime() -
				new Date(randomChat.timestamp).getTime()
		).toBeLessThan(0);
	});

	it('returns empty if there are no messages', async () => {
		data.getMessages = jest.fn().mockReturnValue([]);

		const chats = await getChatLog();

		expect(chats.length).toEqual(0);
	});

	it('returns empty if there are no members', async () => {
		data.getMembers = jest.fn().mockReturnValue([]);

		const chats = await getChatLog();

		expect(chats.length).toEqual(0);
	});

	it("returns an error if there are members but don't exists on messages", async () => {
		data.getMembers = jest.fn().mockReturnValue([
			{
				...mockedMembers[0],
				id: 'fake'
			}
		]);

		await expect(getChatLog()).rejects.toThrow();
	});
});
