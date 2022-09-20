import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { endPoints } from "./endPoints";

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
	baseUrl: endPoints.baseUrl,
	prepareHeaders: (headers, { getState }) => {
		// By default, if we have a token in the store, let's use that for authenticated requests
		const token = "";
		if (token) {
			headers.set("auth", `Bearer ${token}`);
		}
		return headers;
	}
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

/**
 * Create a base API to inject endpoints into elsewhere.
 * Components using this API should import from the injected site,
 * in order to get the appropriate types,
 * and to ensure that the file injecting the endpoints is loaded
 */

export const api = createApi({
	reducerPath: "LmsApi",
	baseQuery: baseQueryWithRetry,
	/**
	 * Tag types must be defined in the original API definition
	 * for any tags that would be provided by injected endpoints
	 */
	tagTypes: ["auth"],
	/**
	 * This api has endpoints injected in adjacent files,
	 * which is why no endpoints are shown below.
	 * If you want all endpoints defined in the same file, they could be included here instead
	 */
	endpoints: () => ({})
});
