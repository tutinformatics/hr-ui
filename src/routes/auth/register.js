import fetch from 'node-fetch';

const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}

export async function post(req, res) {
    try {
        const { userLoginId, currentPassword, currentPasswordVerify } = req.body;

        const response = await fetch('https://35.228.60.244:8443/api/auth/v1/register', {
            method: 'POST',
            body: JSON.stringify({ userLoginId, currentPassword, currentPasswordVerify }),
            headers
        });

        const result = await response.json();

        if (typeof result.errorMessage !== 'undefined') {
            throw new Error(result.errorMessage);
        }

        req.session.token = result.token;
        res.end(JSON.stringify({ token: result.token }));
    } catch (error) {
        res.end(JSON.stringify({ error: error.message }));
    }
}