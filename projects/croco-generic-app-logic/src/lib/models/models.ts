export interface CreateLoginLinkFromAuthenticationRequest {
    useRedirectLink: boolean;
    redirectLink: string;
}

export interface CreateLoginLinkResult {
    isSucceeded: boolean;
    errorMessage: string;
    linkId: string;
    password: string;
}

export interface BaseApiResponse {
    isSucceeded: boolean;
    message: string;
}