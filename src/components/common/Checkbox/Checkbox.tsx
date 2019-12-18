import React, { ComponentProps } from 'react';

import Svg from 'common/Svg';
import './checkbox.scss';

interface CheckboxProps extends ComponentProps<'div'> {
	className?: string;
	checked?: boolean;
	disabled?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ className, checked = false, disabled = false, ...props }) => (
	<div className={`checkbox ${checked && 'checkbox--checked'} ${disabled && 'checkbox--disabled'} ${className}`} {...props}>
		<Svg name="checked" width="12" height="9" />
	</div>
);

export default Checkbox;
