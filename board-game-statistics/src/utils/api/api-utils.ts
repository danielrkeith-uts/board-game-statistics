const baseUrl = import.meta.env.BGS_BACKEND_URL + '/api';

export const apiPost = (endpoint: string, body?: object) =>
	fetch(baseUrl + endpoint, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'include',
	});

export const apiGet = (endpoint: string) =>
	fetch(baseUrl + endpoint, {
		method: 'GET',
		credentials: 'include',
	});

export const apiPut = (endpoint: string, body?: object) =>
	fetch(baseUrl + endpoint, {
		method: 'PUT',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'include',
	});

export const apiDelete = (endpoint: string) =>
	fetch(baseUrl + endpoint, {
		method: 'DELETE',
		credentials: 'include',
	});
