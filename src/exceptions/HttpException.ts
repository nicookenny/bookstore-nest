class HttpException extends Error {
	public status: number;
	public error: string;

	constructor(status: number, message: string) {
		super(message);
		this.status = status;
		this.error = message;
	}
}

export default HttpException;
