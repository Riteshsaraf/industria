export class ApiError extends Error {
    constructor(
        public status: number,
        public message: string,
        public code?: string
    ) {
        super(message);
        this.name="ApiError";

        if (Error.captureStackTrace){
            Error.captureStackTrace(this, ApiError);
        }
    }
}