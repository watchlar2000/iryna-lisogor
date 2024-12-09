export const getImageData = (
	file: File
): Promise<{ url: string; width: number; height: number }> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = (event) => {
			const img = new Image();
			img.src = event.target?.result as string;

			img.addEventListener('load', () => {
				resolve({
					url: reader.result as string,
					width: img.width,
					height: img.height
				});
			});

			img.addEventListener('error', () => {
				reject(new Error('Failed to process image.'));
			});
		};

		reader.onerror = (error) => {
			reject(error);
		};

		reader.readAsDataURL(file);
	});
};
