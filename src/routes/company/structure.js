import fetch from "node-fetch";

export async function post(req, res) {
    try {
        const { toUrl, data } = req.body;

        const response = await fetch(
            `${process.env.SAPPER_APP_API_URL}${toUrl}`,
            {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${req.session.token}`,
                },
            }
        );

        const result = await response.json();

        if (result.errorMessage) {
            throw new Error(result.errorMessage);
        }

        res.end(JSON.stringify(result));
    } catch (error) {
        res.end(JSON.stringify({ error: error.message }));
    }
}
