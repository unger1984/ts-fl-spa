import React, { ComponentProps } from 'react';

import './header.scss';
import images from '../../../images';

interface HeaderProps extends ComponentProps<any> {
	onReload(): void;
	preloader: boolean;
	title: string;
}

const Header: React.FC<HeaderProps> = ({ preloader, title, onReload }) => {
	const reload = () => {
		if (!preloader) {
			onReload();
		}
	};

	return (
		<div className="header">
			<img className="header__logo" src={images.icoLogo} onClick={reload} />
			<div className="header__title">{title}</div>
			{preloader ? (
				<img className="header__preloader" src={images.icoPreloader} />
			) : (
				<div className="header__hiden" />
			)}
		</div>
	);
};

export default Header;