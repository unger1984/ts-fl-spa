import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useLocation } from 'react-router-dom';

import Test from 'common/Test';
import { uiPreloaderSelector } from 'ducks/ui';
import Header from 'common/Header/Header';
import Footer from 'common/Footer/Footer';
import ProjectsPage from 'components/ProjectsPage/ProjectsPage';
import { clearProjectsList, getProjectsList } from 'ducks/projects';
import SettingsPage from 'components/SettingsPage/SettingsPage';
import { settingsIntervalSelector, settionsAutoSelector } from 'ducks/settings';

const getTitle = (pathname: string): string => {
	switch (pathname) {
		default:
		case '/projects':
			return 'Проекты';
		case '/settings':
			return 'Настройки';
		case '/filters':
			return 'Категории';
	}
};

const App: React.FC = () => {
	const dispatch = useDispatch();
	const appPageRef = useRef<HTMLDivElement>(null);
	const preloader: boolean = useSelector(uiPreloaderSelector);
	const isAuto = useSelector(settionsAutoSelector);
	const interval = useSelector(settingsIntervalSelector);
	const { pathname } = useLocation();

	useEffect(() => {
		let idle: number | null = null;
		if (isAuto) {
			idle = window.setInterval(() => {
				dispatch(getProjectsList());
			}, interval * 1000);
		}
		return (): void => {
			if (idle) {
				window.clearInterval(idle);
			}
		};
	}, [isAuto]);

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
			<Header onReload={handleReload} preloader={preloader} title={getTitle(pathname)} />
			<div ref={appPageRef} className="app__page">
				<Switch>
					<Route exact path={['/', '/projects']} component={ProjectsPage} />
					<Route path="/filters" component={Test} />
					<Route path="/settings" component={SettingsPage} />
				</Switch>
			</div>
			<Footer onReload={handleReload} preloader={preloader} />
		</div>
	);
};

export default App;
