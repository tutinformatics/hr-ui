import sirv from "sirv";
import polka from "polka";
import compression from "compression";
import * as sapper from "@sapper/server";
import session from "express-session";
import sessionFileStore from "session-file-store";
import bodyParser from "body-parser";
import fetch from "node-fetch";

// TODO: Change this to more flexible implementation of session store.
const FileStore = sessionFileStore(session);
const {
    PORT,
    NODE_ENV,
    SAPPER_APP_JWT_SECRET,
    SAPPER_APP_COOKIE_MAX_AGE,
} = process.env;
const dev = NODE_ENV === "development";

// TODO: Handle it properly somehow.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const app = polka() // You can also use Express
    .use(
        bodyParser.json(),
        session({
            secret: SAPPER_APP_JWT_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: Number.parseInt(SAPPER_APP_COOKIE_MAX_AGE),
            },
            store: new FileStore({
                // Since we are deploying to ZEIT, there is no way to save files everywhere there.
                // ZEIT only allows to save files in /tmp directory.
                path: dev ? ".sessions" : "/tmp/.sessions",
            }),
        }),
        compression({ threshold: 0 }),
        sirv("static", { dev }),
        sapper.middleware({
            session: (req, res) => {
                return {
                    token: req.session.token,
                };
            },
        })
    )
    .listen(PORT, (err) => {
        if (err) console.log("error", err);
    });

export default app;
