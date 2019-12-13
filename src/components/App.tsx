import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import Test from 'common/Test';
import { CategoryesActionInterface, categoryesListSelector, getCategoyesList } from 'ducks/categoryes';
import { ThunkDispatch } from 'redux-thunk';

const App: React.FC = () => {
	const dispatch: ThunkDispatch<{}, {}, CategoryesActionInterface> = useDispatch();
	const list: object[] = useSelector(categoryesListSelector, shallowEqual);

	useEffect(() => {
		dispatch(getCategoyesList());
	}, []);

	return (
		<div>
			<Test />
		</div>
	);
};

export default App;
