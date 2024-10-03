export const readFileAsDataURL = (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = function (event: ProgressEvent<FileReader>) {
			resolve(event.target.result as string);
		};

		reader.onerror = function (error) {
			reject(error);
		};

		reader.readAsDataURL(file);
	});
};
