interface BaseErrorOptions {
	message: string;
	status?: number;
	data?: unknown;
}

export class BaseError extends Error {
	public status: number;
	public data: unknown;

	constructor({ message, status = 400, data = null }: BaseErrorOptions) {
		super(message);
		this.status = status;
		this.data = data;
	}
}
