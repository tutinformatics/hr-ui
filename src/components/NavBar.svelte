<script>
    import { Nav, Icon } from 'svelte-chota';
    import { stores } from '@sapper/app';

    const { session } = stores();

    let userLoggedIn;
    session.subscribe(v => userLoggedIn = typeof $session.token === 'string');

    let logo = 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Svelte_Logo.svg';
</script>

<style>
    a {
        color: black;
    }
</style>

<!-- Seems like we cannot render elements with 'slot' attributes in if blocks,
because Svelte starts complaining that the element must be a direct child on a component. -->
{#if !userLoggedIn}
    <Nav class="navbar">
        <a slot="left" href="/">Main Page</a>

        <a slot="center" href="/" class="brand">
            <Icon src={logo} size="2" class="is-rounded navbar__image" />
        </a>

        <a slot="right" href="/login">Login</a>
        <a slot="right" href="/register">Register</a>
    </Nav>
{:else}
    <Nav class="navbar">
        <a slot="left" href="/">Main Page</a>

        <a slot="center" href="/" class="brand">
            <Icon src={logo} size="2" class="is-rounded navbar__image" />
        </a>
        
        <a slot="right" href="/employees">Employees</a>
    </Nav>
{/if}