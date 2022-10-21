import { orderBody, OrderStatus } from "../../Types/types";
import { formatDate } from "./model/date";

interface OrdersProps {
	orders: orderBody[];
}
export const Orders = ({ orders }: OrdersProps) => {
	return (
		<>
			{orders ? orders.map((order: orderBody) => {
				const date = formatDate(parseInt(order.DateCreated.substr(6)));
				return (
					<tr key={order.Id}>
						<td>{order.Id}</td>
						<td>{date}</td>
						<td>{OrderStatus[order.Status as keyof typeof OrderStatus]}</td>
						<td>
							{order.PaymentStatus && order.PaymentStatus === "Paid"
								? "Оплачено"
								: "Не оплачено"}
						</td>
						<td>{order.Price && order.Price}</td>
						<td>{order.DeliveryPrice && order.DeliveryPrice}</td>
						<td>
							{order.DeliveryAddress !== null
								? order.DeliveryAddress?.Country +
								", " +
								order.DeliveryAddress?.City +
								", " +
								order.DeliveryAddress?.AddressLine1
								: "Данные отсутствуют"}
						</td>
						<td>
							{order.DeliveryAddress?.Phone
								? order.DeliveryAddress?.Phone.toString()
								: "Данные отсутствуют"}
						</td>
					</tr>
				);
			}) : <></>}
		</>
	);
};
