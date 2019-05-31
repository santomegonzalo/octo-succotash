import * as React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import ErrorBoundary from './ErrorBoundary';

describe('ErrorBoundary Component', () => {
	function SomethingTest() {
		return <div>this is a test</div>;
	}

	const getWrapperElement = (renderFunc, handleCatchError = jest.fn()) =>
		renderFunc(
			<ErrorBoundary onCatchError={handleCatchError}>
				<SomethingTest />
			</ErrorBoundary>
		);

	it('should render correct UI', () => {
		let wrapper = getWrapperElement(mount);

		expect(toJson(wrapper)).toMatchSnapshot();

		wrapper.setState({ hasError: true });
		wrapper = wrapper.update();

		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should not display anything if there is an error', () => {
		let wrapper = getWrapperElement(mount);

		expect(wrapper.find(SomethingTest)).toHaveLength(1);

		wrapper.setState({ hasError: true });
		wrapper = wrapper.update();

		expect(wrapper.find(SomethingTest)).toHaveLength(0);
	});

	it('should return true on call getDerivedStateFromError', () => {
		expect(ErrorBoundary.getDerivedStateFromError()).toEqual({
			hasError: true
		});
	});
});
