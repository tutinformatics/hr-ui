<script>
    import { Nav, Icon, Button } from "svelte-chota";
    import { mdiFaceProfile } from "@mdi/js";
    import MdAccountCircle from "svelte-icons/md/MdAccountCircle.svelte";
    import { stores, goto } from "@sapper/app";

    const { session } = stores();

    let userLoggedIn;
    session.subscribe(v => (userLoggedIn = typeof $session.token === "string"));

    let logo = "https://upload.wikimedia.org/wikipedia/commons/1/1b/Svelte_Logo.svg";

    /**
     * Log the user out of the system.
     */
    async function logout() {
        const response = await fetch("/auth/logout", {method: "POST"});
        const result = await response.json()

        if (result.error) {
            console.error(result.error)
            return;
        }
        $session.token = null;
        goto('/');
    }
</script>

<svelte:head>
    <link rel="stylesheet" href="navbar.css" />
</svelte:head>

<!-- Seems like we cannot render elements with 'slot' attributes in if blocks,
because Svelte starts complaining that the element must be a direct child on a component. -->
{#if !userLoggedIn}
    <Nav class="navbar is-horizontal-align is-vertical-align">
        <a slot="left" href="/" class="brand">HR</a>

        <a slot="right" href="/login">Login</a>
        <a slot="right" href="/register">Register</a>
    </Nav>
{:else}
    <Nav class="navbar">
        <a slot="left" href="/" class="brand">HR</a>

        <a slot="left" href="/company">Main</a>
        <a slot="left" href="/employees">Employees</a>
        <a slot="left" href="/positions">Employee Positions</a>
        <a slot="left" href="/skills">Skills</a>
        <a slot="left" href="/test">Draggable test</a>

        <a slot="right" href="#" on:click={logout}>Log out</a>
        <a slot="right" class="icon" href="/">
            <div class="profile-icon">
                <MdAccountCircle />
            </div>
        </a>
    </Nav>
{/if}
