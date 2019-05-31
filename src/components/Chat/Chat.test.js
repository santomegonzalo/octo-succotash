import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import Chat from './Chat';

describe('Chat component', () => {
	const chat = {
		avatar: 'http://dummyimage.com/100x100.jpg/dddddd/000000',
		email: 'jgomezh@cdc.gov',
		fullName: 'Jeremy Gomez',
		message:
			'Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia.',
		messageId: '22a454b1-6659-400f-aa77-eaae34a77118',
		timestamp: '2016-04-14T16:53:55Z',
		userId: '205c9b7a-345d-4aa2-9e4c-56f05f72bbe8'
	};

	const chatNoAvatar = {
		avatar: null,
		email: 'jgomezh@cdc.gov',
		fullName: 'Jeremy Gomez',
		message:
			'Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia.',
		messageId: '22a454b1-6659-400f-aa77-eaae34a77118',
		timestamp: '2016-04-14T16:53:55Z',
		userId: '205c9b7a-345d-4aa2-9e4c-56f05f72bbe8'
	};

	const getWrapperElement = (renderFunc, props) =>
		renderFunc(<Chat {...props} />);

	it('should render component with avatar', () => {
		expect(toJson(getWrapperElement(mount, chat))).toMatchSnapshot();
	});

	it('should render component without avatar', () => {
		expect(
			toJson(getWrapperElement(mount, chatNoAvatar))
		).toMatchSnapshot();
	});

	it('should not render image if avatar is null', () => {
		const wrapper = getWrapperElement(mount, chatNoAvatar);

		expect(wrapper.find('.ChatAvatar').exists()).toEqual(false);
	});

	it('should render email on mouse enter', () => {
		const wrapper = getWrapperElement(mount, chat);
		const setStateSpy = jest.spyOn(wrapper.instance(), 'setState');

		wrapper.simulate('mouseenter');

		expect(setStateSpy).toHaveBeenCalledTimes(1);
		expect(wrapper.find('.ChatName').text()).toContain(chat.email);
	});
});
