export async function post(req, res) {
    try {
        req.session.destroy();
        res.end(JSON.stringify({success: "Logged out"}));
    } catch (error) {
        res.end(JSON.stringify({error: error.message}))
    }
}
