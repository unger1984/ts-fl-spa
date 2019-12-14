declare module 'react-lines-ellipsis' {
	import React from 'react';

	export interface LinesEllipsisProps extends React.ComponentProps<any> {
		text: string;
		maxLine?: number | string;
		ellipsis?: any;
		trimRight?: boolean;
		basedOn?: string;
		component?: string;
		onReflow?: () => void;
	}

	export default class LinesEllipsis extends React.Component<LinesEllipsisProps> {
		public isClamped(): boolean;
	}
}
