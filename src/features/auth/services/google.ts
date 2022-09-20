import { gapi, loadAuth2 } from "gapi-script";

export class GoogleServiceModel {
	auth2: any;
	scope: string = "";
	user: any;

	constructor() {
		console.log(import.meta.env.VITE_G_CLIENT_ID);
		this.initAuth2(import.meta.env.VITE_G_CLIENT_ID);
	}

	async initAuth2(client_id: string) {
		this.auth2 = await loadAuth2(gapi, client_id, this.scope);
	}

	async attachSignin(element: HTMLButtonElement) {
		this.auth2.attachClickHandler(element, {}, this.successResponse, this.errorHandling);
	}

	successResponse(user: any) {
		this.user = user;
	}
	errorHandling(error: any) {
		console.log(error);
	}
}
