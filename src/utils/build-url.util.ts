import { Simple } from "../types";
import { formatDate } from "./format-date.util";

export function buildUrl(baseURL: string, params?: Object) : string {
    if (params) {
        const sep = "&";

        const qs: string = Object
            .entries(params)
            .flatMap(([key, value]) => {
                if (Array.isArray(value)) {
                    return value.map(v => format(key, v));
                }

                return format(key, value);
            })
            .filter(v => v != null)
            .join(sep);

        if (qs) {
            return `${baseURL}?${qs}`;
        }
    }

    return baseURL;

    function format(key: string, value: Simple): string | null {
        if (value == null) return null;

        if (value instanceof Date) {
            value = formatDate(value);
        }

        return `${key}=${encodeURIComponent(value)}`;
    }
}
