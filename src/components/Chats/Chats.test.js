import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import Chats from './Chats';
import Chat from '../Chat';

import * as data from '../../data';
import getChatLog from '../../service';

const mockedMessages = require('../../messages.json');
const mockedMembers = require('../../members.json');

describe('Chats component', () => {
	const getWrapperElement = renderFunc => renderFunc(<Chats />);

	beforeEach(() => {
		data.getMessages = jest.fn().mockReturnValue(mockedMessages);
		data.getMembers = jest.fn().mockReturnValue(mockedMembers);
	});

	it('should render component with loading', () => {
		const wrapper = getWrapperElement(mount);

		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should rendeer component with chats', done => {
		const wrapper = getWrapperElement(mount);

		setImmediate(() => {
			wrapper.update();

			expect(toJson(wrapper)).toMatchSnapshot();
			done();
		});
	});

	it('should render component with no chats', done => {
		data.getMessages = jest.fn().mockReturnValue([]);

		const wrapper = getWrapperElement(mount);

		setImmediate(() => {
			wrapper.update();

			expect(toJson(wrapper)).toMatchSnapshot();
			done();
		});
	});

	it('should loading exists on mount', () => {
		const wrapper = getWrapperElement(mount);

		expect(wrapper.find('.ChatsLoading').exists()).toEqual(true);
	});

	it('should loading exists on mount', () => {
		const wrapper = getWrapperElement(mount);

		expect(wrapper.find('.ChatsLoading').exists()).toEqual(true);
	});

	it('should render all Chat components', done => {
		const wrapper = getWrapperElement(mount);
		const setStateSpy = jest.spyOn(wrapper.instance(), 'setState');

		setImmediate(() => {
			wrapper.update();

			expect(setStateSpy).toHaveBeenCalledTimes(1);
			expect(wrapper.find(Chat).exists()).toEqual(true);
			expect(wrapper.find(Chat).length).toEqual(mockedMessages.length);
			done();
		});
	});
});
