import { createEffect, createStore, forward, guard } from "effector";
import { dataHash } from "../../hash/sha";
type requestToken = {
	Expires: number;
	RequestToken: string;
	Success: boolean;
};
type accessToken = {
	AccessToken: string;
	Expires: number;
	RefreshToken: string;
	Success: boolean;
};
const PUBLIC_KEY = "38cd79b5f2b2486d86f562e3c43034f8";
const PRIVATE_KEY = "8e49ff607b1f46e1a5e8f6ad5d312a80";
export const fetchRequestFx = createEffect(async () => {
	const reqToken: requestToken = await fetch(
		"https://pika-secret-ocean-49799.herokuapp.com/http://api.pixlpark.com/oauth/requesttoken"
	).then((data) => data.json());
	if (reqToken) {
		return reqToken.RequestToken;
	} else {
		return "";
	}
});
export const fetchAccessFx = createEffect(async (token: string) => {
	const password = dataHash(token, PRIVATE_KEY);
	console.log("pass ", password);
	const response: accessToken = await fetch(
		`https://pika-secret-ocean-49799.herokuapp.com/http://api.pixlpark.com/oauth/accesstoken?oauth_token=${token}&grant_type=api&username=${PUBLIC_KEY}&password=${password}`
	)
		.then((data) => data.json())
		.catch((err) => console.log(err));
	return {
		AccessToken: response.AccessToken,
		RefreshToken: response.RefreshToken,
		Expires: response.Expires,
		Success: response.Success,
	};
});
export const fetchOrdersFx = createEffect(async (params: accessToken) => {
	const { AccessToken } = params;
	const response = await fetch(
		`https://pika-secret-ocean-49799.herokuapp.com/http://api.pixlpark.com/orders?oauth_token=${AccessToken}&take=50`
	)
		.then((data) => data.json())
		.catch((err) => console.log(err));
	return response.Result;
});
export const $tokens = createStore<accessToken>({
	AccessToken: "",
	RefreshToken: "",
	Expires: 0,
	Success: false,
});
export const $ordersStore = createStore([]).on(
	fetchOrdersFx.doneData,
	(_, data) => data
);
guard({
	clock: fetchRequestFx.doneData,
	filter: (data) => data !== "",
	target: fetchAccessFx,
});
forward({
	from: fetchAccessFx.doneData,
	to: [$tokens, fetchOrdersFx],
});
