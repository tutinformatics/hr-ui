<script>
    import { goto, stores } from "@sapper/app";
    import { onMount, beforeUpdate } from "svelte";
    import NavBar from "../components/NavBar.svelte";

    const { page, session } = stores();

    // Redirect to the login page when sessionn is expired.
    onMount(() => {
        if (!$session.token && $page.path !== "/") goto("/login");
    });

    // Check whether the JWT token is expired and if it is, refresh it.
    beforeUpdate(async () => {
        const response = await fetch("/auth/refreshToken", {
            method: "POST",
            body: JSON.stringify({ token: $session.token }),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });

        const result = await response.json();

        if (result.error) {
            console.error(result.error);
            return;
        }
        if (result.status) return;

        $session.token = result.token;
    });
</script>

<main>
    <NavBar />
    <slot />
</main>
