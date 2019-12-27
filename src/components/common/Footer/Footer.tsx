import React, { ComponentProps } from 'react';
import { NavLink } from 'react-router-dom';

import './footer.scss';
import { menu } from '../../../config';
import images from '../../../images';
import { toggleFullScreen } from 'helpers/helperFullScreen';
import Svg from 'common/Svg';

export interface FooterProps extends ComponentProps<'div'> {
	preloader: boolean;
	onReload(): void;
}

const Footer: React.FC<FooterProps> = ({ preloader, onReload }) => {
	const handleReload = (): void => {
		if (!preloader) {
			onReload();
		}
	};

	const handleFullScreen = (): void => {
		toggleFullScreen();
	};

	return (
		<div className="footer">
			{menu.map((item, index) => (
				<NavLink
					key={`menu_${index}`}
					to={`/${item.key}`}
					activeClassName="footer__menu--active"
					className="footer__menu"
					title={item.title}
				>
					<Svg name={item.ico} className="footer__menu-icon" />
				</NavLink>
			))}
			<div data-testid="fullscreen-btn" className="footer__menu" onClick={handleFullScreen}>
				<Svg name="fullscreen" className="footer__menu-icon" />
			</div>
			<div data-testid="reload-btn" className="footer__reload" onClick={handleReload}>
				{preloader ? (
					<img className="footer__menu-icon" src={images.icoPreloader} />
				) : (
					<Svg name="reload" className="footer__menu-icon" />
				)}
			</div>
		</div>
	);
};

export default Footer;
