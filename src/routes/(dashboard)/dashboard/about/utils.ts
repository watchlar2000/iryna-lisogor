export const readFileAsDataURL = (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = (event) => {
			const img = new Image();
			img.src = event.target?.result as string;

			// img.onload = function () {
			// 	console.log('Width:', img.width);
			// 	console.log('Height:', img.height);
			// };

			resolve(reader.result as string);
		};

		reader.onerror = (error) => {
			reject(error);
		};

		reader.readAsDataURL(file);
	});
};
