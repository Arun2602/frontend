import md5 from "md5";

export function encryptPassword(text: any) {
	var byteArray: any = new Uint8Array(text.length * 2);
	for (var i = 0; i < text.length; i++) {
		byteArray[i * 2] = text.charCodeAt(i); // & 0xff;
		byteArray[i * 2 + 1] = text.charCodeAt(i) >> 8; // & 0xff;
	}
	return md5(String.fromCharCode.apply(String, byteArray));
}
