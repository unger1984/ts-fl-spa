declare module 'react-pullable' {
	import React from 'react';

	export interface PullableProps extends React.ComponentProps<any> {
		className?: string;
		centerSpinner?: boolean;
		fadeSpinner?: boolean;
		rotateSpinner?: boolean;
		spinnerSize?: number;
		spinnerOffset?: number;
		spinnerColor?: string;
		spinSpeed?: number;
		popDuration?: number;
		distThreshold?: number;
		resistance?: number;
		refreshDuration?: number;
		resetDuration?: number;
		resetEase?: string;
		shouldPullToRefresh?: () => boolean;
		disabled?: boolean;
	}

	export default class Pullable extends React.Component<PullableProps> {}
}
