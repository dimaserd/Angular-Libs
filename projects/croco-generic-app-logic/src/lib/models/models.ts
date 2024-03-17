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

export interface GenericBaseApiResponse<T> extends BaseApiResponse {
    responseObject: T;
}

export interface GetListResult<T> {

    /*
    Сколько всего записей
     */
    totalCount: number;

    /*
    Текущий список
     */
    list: Array<T>;
}