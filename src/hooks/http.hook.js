import  { useState, useCallback } from "react"

export const useHttp = () => {
    const [process, setProcess] = useState('Waiting')

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setProcess('Loading')
        try {
            const options = { method };
            if (body) {
                options.body = JSON.stringify(body);
                options.headers = { 'Content-Type': 'application/json', ...headers };
            } else if (Object.keys(headers).length > 0) {
                options.headers = headers;
            }
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            setProcess('Error')
            throw error;
        }
    }, []);

    const clearError = useCallback(() => {
        setProcess('Loading')
    }, []);
    return { process, request, clearError, setProcess };
};