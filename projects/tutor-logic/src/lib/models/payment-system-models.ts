export interface PaymentSystemModel {
    id: string;
    name: string;
    providerName: string;
    groupId: string;
    displayName: string;
    description: string;
    enabled: boolean;
}

export interface SearchPaymentSystemsRequest {
    enabled: boolean | null;
    count: number | null;
    offSet: number;
}

export interface OrderPaymentSystemsRequest {
    systemIds: Array<string>;
}