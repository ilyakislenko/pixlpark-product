export enum OrderStatus {
	NotProcessed = "Не обработано",
	AwaitingPayment = "Ожидает оплаты",
	ReadyToProcessing = "Готово к обработке",
	DesignCoordination = "Согласование дизайна",
	DesignCoordinationComplete = "Согласование дизайна завершено",
	DesignCoordinationAwaitingReply = "Согласование дизайна ожидает ответа",
	PrepressCoordination = "Согласование допечатной подготовки",
	PrepressCoordinationComplete = "Согласование допечатной подготовки завершено",
	PrepressCoordinationAwaitingReply = "Согласование допечатной подготовки ожидает ответа",
	Printing = "Идет печать",
	PrintedWithDefect = "Напечатано с дефектом",
	Printed = "Напечатано",
	Shipped = "Отправлено",
	ShippedToStorage = "Отправлено на хранение",
	Returned = "Возвращено",
	Cancelled = "Отменено",
	CancelledWithDefect = "Отменено с дефектом",
	Refused = "Отказано",
	Delivered = "Доставлено",
}
export type requestToken = {
	Expires: number;
	RequestToken: string;
	Success: boolean;
};
export type accessToken = {
	AccessToken: string;
	Expires: number;
	RefreshToken: string;
	Success: boolean;
};
export type orderBody = {
    Id: number;
    PaymentStatus: string;
    Price?:number;
    DeliveryPrice?:number;
    DateCreated:string;
    Status:string;
    DeliveryAddress?: {
        Country?:string;
        City?:string;
        AddressLine1?:string;
        Phone?: string;
    }
}