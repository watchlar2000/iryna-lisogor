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
		this.name = 'BaseError';
		this.status = status;
		this.data = data; // this field is here to log specific parameters that caused the error, or include the state of certain variables at the time the error was thrown
	}
}
