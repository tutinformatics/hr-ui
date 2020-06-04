<script>
    import { goto, stores } from "@sapper/app";
    import { onMount } from "svelte";
    import NavBar from "../components/NavBar.svelte";

    const { page, session } = stores();

    const FIVE_MINUTES = 300000;
    const ONE_MINUTE = 60000;
    let expirationTime;
    let interval;

    onMount(() => {
        // If the session does not exist, go to the login page.
        if (!$session.token && $page.path !== "/") {
            goto("/login");
        } else if ($session.token) {
            expirationTime = Number.parseInt(
                localStorage.getItem("tokenExpiresIn")
            );

            // If the jwt is about to expire, update it and then set the timer.
            if (isSoonExpired()) {
                updateJwt();
            }
            resetInterval();
        }
    });

    /***
     * Updates JWT token and resets the timer.
     */
    async function updateJwt() {
        const response = await fetch("/auth/updateJwt", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        });
        const result = await response.json();

        if (result.error) {
            console.error(result.error);
        } else {
            $session.token = result.token;
            localStorage.setItem(
                "tokenExpiresIn",
                JSON.stringify(
                    Date.now() +
                        Number.parseInt(process.env.SAPPER_APP_COOKIE_MAX_AGE)
                )
            );
            expirationTime =
                Date.now() +
                Number.parseInt(process.env.SAPPER_APP_COOKIE_MAX_AGE);

            console.log("TOKEN updated");
        }
    }

    /**
     * Reset the interval.
     * If it was already in use, just stop and create a new one.
     */
    function resetInterval() {
        if (interval) clearInterval(interval);

        interval = setInterval(() => {
            // If the token is 5 minutes from being expired, update it.
            if (isSoonExpired()) {
                updateJwt();
            }
        }, ONE_MINUTE); // Check every five minutes
    }

    /**
     * Whether the JWT token is about to expire.
     */
    function isSoonExpired() {
        console.log(
            expirationTime - Date.now() <= FIVE_MINUTES,
            (expirationTime - Date.now()) / 60000
        );
        return expirationTime - Date.now() <= FIVE_MINUTES;
    }
</script>

<main>
    <NavBar />
    <slot />
</main>
