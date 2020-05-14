import fetch from "node-fetch";

export async function post(req, res) {
    // Refresh the cookie only if there is 5 minutes till expiration.
    if (req.session.cookie.maxAge > 300000) {
        res.end(JSON.stringify({ status: "Logged in" }));
        return;
    }

    try {
        const { SAPPER_APP_API_URL } = process.env;
        const { token } = req.session;

        const response = await fetch(`${SAPPER_APP_API_URL}/auth/v1/token`, {
            method: "POST",
            body: JSON.stringify({ token }),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });

        const result = await response.json();

        if (result.errorMessage) {
            throw new Error(result.errorMessage);
        }

        req.session.token = result.token;
        req.session.touch();
        res.end(JSON.stringify({ token: result.token }));
    } catch (error) {
        res.end(JSON.stringify({ error: error.message }));
    }
}
