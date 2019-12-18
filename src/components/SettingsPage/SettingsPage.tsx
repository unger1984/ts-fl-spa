import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './settings-page.scss';
import Checkbox from 'common/Checkbox/Checkbox';
import {
	editInterval,
	setAuto,
	settingsIntervalSelector,
	settionsAutoSelector,
} from 'ducks/settings';

const SettingsPage: React.FC = () => {
	const dispatch = useDispatch();
	const isAuto = useSelector(settionsAutoSelector);
	const interval = useSelector(settingsIntervalSelector);

	const handleSetAuto = (): void => {
		dispatch(setAuto(!isAuto));
	};

	const handleIntervalChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		dispatch(editInterval(parseInt(event.target.value)));
	};

	return (
		<div className="settings-page">
			<div className="settings-page__row">
				<div className="settings-page__title">Автообновление:</div>
				<Checkbox checked={isAuto} onClick={handleSetAuto} />
			</div>
			{isAuto && (
				<div className="settings-page__row">
					<div className="settings-page__title">Интервал обновления:</div>
					<input value={interval} type="number" min={5} step={1} onChange={handleIntervalChange} />
				</div>
			)}
		</div>
	);
};

export default SettingsPage;
