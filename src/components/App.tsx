import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Test from 'common/Test';
import { uiPreloaderSelector } from 'ducks/ui';
import Header from 'common/Header/Header';
import Footer from 'common/Footer/Footer';

const App: React.FC = () => {
	const appPageRef = useRef<HTMLDivElement>(null);
	const preloader: boolean = useSelector(uiPreloaderSelector);

	const toTop = () => {
		if (appPageRef.current) {
			appPageRef.current!.scrollTop = 0;
		}
	};

	const handleReload = () => {
		toTop();
	};

	return (
		<div className="app">
			<Header onReload={handleReload} preloader={preloader} title="test" />
			<div ref={appPageRef} className="app__page">
				<Switch>
					<Route path={['/', '/projects']} component={Test} />
				</Switch>
			</div>
			<Footer onReload={handleReload} preloader={preloader} />
		</div>
	);
};

export default App;
