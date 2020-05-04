<script>
    import { Nav, Icon, Button} from 'svelte-chota';
    import { stores } from '@sapper/app';

    const { session } = stores();

    let userLoggedIn = typeof $session.token === 'string';
    let logo = 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Svelte_Logo.svg';

</script>

<style>
    a {
        color: black;
    }

    nav {
        background-color: #333;
        overflow: hidden;
    }
</style>
<!-- Seems like we cannot render elements with 'slot' attributes in if blocks,
because Svelte starts complaining that the element must be a direct child on a component. -->
{#if !userLoggedIn}
    <Nav class="navbar">
        <a slot="left" href="/" class="brand">
            <Icon src={logo} size="2" class="is-rounded navbar__image" />
        </a>
        <a slot="left" href="/">HUMAN RESOURCES</a>

        <div class="dropdown is-horizontal-align" slot="left">
            <Button dropdown="Categories" autoclose clear>
                <p><a href="/">Category 1</a></p>
                <p><a href="/">Category 2</a></p>
                <p><a href="/">Category 3</a></p>
                <hr>
                <p><a href="/">Category 4</a></p>
            </Button>
        </div>

        <div class="dropdown" slot="left">
            <Button dropdown="Variants" autoclose clear>
                <p><a href="/">Variant 1</a></p>
                <p><a href="/">Variant 2</a></p>
                <p><a href="/">Variant 3</a></p>
                <hr>
                <p><a href="/">Variant 4</a></p>
            </Button>
        </div>


        <a slot="right" href="/login">Login</a>
        <a slot="right" href="/register">Register</a>
    </Nav>
{:else}
    <Nav class="navbar">
        <a slot="left" href="/">Main Page</a>

        <a slot="center" href="/" class="brand">
            <Icon src={logo} size="2" class="is-rounded navbar__image" />
        </a>

        <a slot="right" href="/">Log out</a>
        <a slot="right" href="/employees">Employees</a>
    </Nav>
{/if}

