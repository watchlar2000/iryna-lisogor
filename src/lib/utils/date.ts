export const formatDateToReadable = (date: Date): string => {
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	};

	return new Intl.DateTimeFormat('en-GB', options).format(date);
};
