import React, { ComponentProps } from 'react';

interface SvgProps extends ComponentProps<'svg'> {
	name: string;
}

const Svg: React.FC<SvgProps> = ({ name, ...props }) => (
	<svg {...props}>
		<use xlinkHref={`#icon-${name}`} />
	</svg>
);

export default Svg;
