// export interface ExternalUser{
//     userId: string;
//     province: string;
// 	token: string;		// JWT from backend
// }

export interface LoginRequest {
	email: string;
	password: string;
}

export interface ApiError{
    message: string;
    statusCode?: number;
}

export interface SessionData {
	userId: string;
	token: string;
	role: string;
}

export interface LoginResponse{
	userId: string;
	token: string; // JWT from backend
	role: string;
	providerList: ProviderList[];
}

export interface ProviderList {
	title: string;
	firstName: string;
	lastName: string;
	billType: string;
	billingNumber: string;
	streetAddress1: string;
	streetAddress2: string;
	city: string;
	provOrState: string;
	postalZipCode: string;
	country: string;
	specialty: string;
	formId: number;
}