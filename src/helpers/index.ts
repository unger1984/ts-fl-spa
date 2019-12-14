import moment from 'moment';

export const dateToString = (date: Date): string => {
	let dt = moment(date).format('DD.MM.YYYY');
	if (moment().format('DD.MM.YYYY') === dt) {
		dt = 'сегодня,';
	} else if (
		moment()
			.add(-1, 'day')
			.format('DD.MM.YYYY') === dt
	) {
		dt = 'вчера,';
	}

	return moment(date).format(`${dt} HH:mm`);
};

export const flTextPreiew = (text: string): string => {
	return text.replace('\n', ' ');
};
