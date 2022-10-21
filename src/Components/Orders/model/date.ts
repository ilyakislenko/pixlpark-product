function padTo2Digits(num:number) {
	return num.toString().padStart(2, "0");
}
export function formatDate(date:number) {
	if (date !== null) {
		const edited = new Date(date);
		return [
			padTo2Digits(edited.getDate()),
			padTo2Digits(edited.getMonth() + 1),
			edited.getFullYear(),
		].join(".");
	} else {
		return "";
	}
}