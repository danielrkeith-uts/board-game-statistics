// TODO - move this to an ENV variable for deployment
const baseUrl = "http://localhost:8080/api"

export const apiPost = (endpoint: string, body?: object) => 
    fetch(baseUrl + endpoint, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        }
    });
