const sha1 = require('sha1');
export const dataHash = (requestToken:string,privateKey:string) => {
	const hash = sha1(requestToken+privateKey);
    return hash;
};
