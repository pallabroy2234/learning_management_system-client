import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";

export const handleError = (error: FetchBaseQueryError | SerializedError, defaultMessage: string = "Internal Server Error"): string => {
	if ("data" in error && typeof error.data === "object") {
		return (error.data as {message?: string})?.message || defaultMessage;
	}
	return "An error occurred";
};