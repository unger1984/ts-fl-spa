import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Test from 'common/Test';
import { uiPreloaderSelector } from 'ducks/ui';
import Header from 'common/Header/Header';
import Footer from 'common/Footer/Footer';
import ProjectsPage from 'components/ProjectsPage/ProjectsPage';
import { clearProjectsList, getProjectsList } from 'ducks/projects';

const App: React.FC = () => {
	const dispatch = useDispatch();
	const appPageRef = useRef<HTMLDivElement>(null);
	const preloader: boolean = useSelector(uiPreloaderSelector);

	const toTop = (): void => {
		if (appPageRef.current) {
			appPageRef.current.scrollTop = 0;
		}
	};

	const handleReload = (): void => {
		toTop();
		dispatch(clearProjectsList());
		dispatch(getProjectsList());
	};

	return (
		<div className="app">
			<Header onReload={handleReload} preloader={preloader} title="test" />
			<div ref={appPageRef} className="app__page">
				<Switch>
					<Route exact path={['/', '/projects']} component={ProjectsPage} />
					<Route path="/filters" component={Test} />
					<Route path="/settings" component={Test} />
				</Switch>
			</div>
			<Footer onReload={handleReload} preloader={preloader} />
		</div>
	);
};

export default App;
