import fetch from "node-fetch";

const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
};

export async function post(req, res) {
    try {
        const {
            userLoginId,
            currentPassword,
            currentPasswordVerify,
        } = req.body;
        const { SAPPER_APP_API_URL } = process.env;

        const response = await fetch(`${SAPPER_APP_API_URL}/auth/v1/register`, {
            method: "POST",
            body: JSON.stringify({
                userLoginId,
                currentPassword,
                currentPasswordVerify,
            }),
            headers,
        });

        const result = await response.json();

        if (typeof result.errorMessage !== "undefined") {
            throw new Error(result.errorMessage);
        }

        req.session.token = result.token;
        res.end(JSON.stringify({ token: result.token }));
    } catch (error) {
        res.end(JSON.stringify({ error: error.message }));
    }
}
