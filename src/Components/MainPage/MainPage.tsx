import { useEvent, useStore } from "effector-react";
import { useEffect } from "react";
import { $ordersStore, fetchRequestFx } from "../Store/OrdersStore";
import cls from "./MainPage.module.css";
import { formatDate } from "./model/date";

interface MainPageProps {
	className?: string;
}
enum OrderStatus {
	NotProcessed = 'Не обработано',
	AwaitingPayment = 'Ожидает оплаты',
	ReadyToProcessing = 'Готово к обработке',
	DesignCoordination = 'Согласование дизайна',
	DesignCoordinationComplete = 'Согласование дизайна завершено',
	DesignCoordinationAwaitingReply = 'Согласование дизайна ожидает ответа',
	PrepressCoordination = 'Согласование допечатной подготовки',
	PrepressCoordinationComplete = 'Согласование допечатной подготовки завершено',
	PrepressCoordinationAwaitingReply = 'Согласование допечатной подготовки ожидает ответа',
	Printing = 'Идет печать',
	PrintedWithDefect = 'Напечатано с дефектом',
	Printed = 'Напечатано',
	Shipped = 'Отправлено',
	ShippedToStorage = 'Отправлено на хранение',
	Returned = 'Возвращено',
	Cancelled = 'Отменено',
	CancelledWithDefect = 'Отменено с дефектом',
	Refused = 'Отказано',
	Delivered = 'Доставлено',
}
export const MainPage = ({ className }: MainPageProps) => {
	const orders = useStore($ordersStore);
	const pending = useStore(fetchRequestFx.pending);
	const fetchEvent = useEvent(fetchRequestFx);
    useEffect(() => {
console.log('orders ',orders);
console.log('pending ',pending);
    },[orders,pending])
	return <div className={cls.MainPage}>
        <button disabled={pending} onClick={fetchEvent}>fetchData</button>
		<div>
			{
				orders.map((order:any) => {
					const date = formatDate(parseInt(order.DateCreated.substr(6)))
					return <div className={cls.card} key={order.Id}>
						<p className={cls.card__p}>Номер заказа: {order.Id}</p>
						<p className={cls.card__p}>Дата создания: {date}</p>
						<p className={cls.card__p}>Статус заказа: {OrderStatus[order.Status as keyof typeof  OrderStatus]}</p>
						<p className={cls.card__p}>Статус оплаты: {order.PaymentStatus === 'Paid' ? 'Оплачено' :'Не оплачено'}</p>
						<p className={cls.card__p}>Стоимость заказа: {order.Price}</p>
						<p className={cls.card__p}>Стоимость доставки: {order.DeliveryPrice}</p>
						<p className={cls.card__p}>Адрес получателя: {order.DeliveryAddress?.Country + ',' + order.DeliveryAddress?.City + ',' + order.DeliveryAddress?.AddressLine1}</p>
						<p className={cls.card__p}>Телефон получателя: {order.DeliveryAddress?.Phone.toString()}</p>
					</div>
				})
			}
		</div>
    </div>;
};

export default MainPage;
