import { useEvent, useStore } from "effector-react";
import { $ordersStore, fetchRequestFx } from "./model/store";
import cls from "./Table.module.css";
import { Orders } from "../Orders/Orders";
export const Table = () => {
	const orders = useStore($ordersStore);
	const pending = useStore(fetchRequestFx.pending);
	const fetchEvent = useEvent(fetchRequestFx);
	return (
		<div className={cls.container}>
			<button className={cls.button} disabled={pending} onClick={fetchEvent}>
				Get Data
			</button>
			<table>
				<thead>
					<tr>
						<td>Номер заказа</td>
						<td>Дата создания</td>
						<td>Статус заказа</td>
						<td>Статус оплаты</td>
						<td>Стоимость заказа</td>
						<td>Стоимость доставки</td>
						<td>Адрес заказчика</td>
						<td>Телефон заказчика</td>
					</tr>
				</thead>
				<tbody>{orders && <Orders orders={orders} />}</tbody>
			</table>
		</div>
	);
};
