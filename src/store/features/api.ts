import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";


const NODE_ENV = import.meta.env.VITE_NODE_ENV as string | "development";
const server_url = () => {
	if (NODE_ENV === "development") {
		return import.meta.env.VITE_DEV_BASE_URL as string;
	} else if (NODE_ENV === "production") {
		return import.meta.env.VITE_PROD_BASE_URL as string;
	} else {
		throw new Error("NODE_ENV is not set");
	}
};

const baseURL = server_url();


export const api = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: baseURL
	}),
	endpoints: () => ({})
});

export const {} = api;




