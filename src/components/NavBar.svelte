<svelte:head>
    <link rel='stylesheet' href='navbar.css'>
    <script src="drag.js"></script>
</svelte:head>

<script>
    import { Nav, Icon, Button} from 'svelte-chota';
    import { mdiFaceProfile } from '@mdi/js';
    import MdAccountCircle from 'svelte-icons/md/MdAccountCircle.svelte'
    import { stores } from '@sapper/app';

    const { session } = stores();

    let userLoggedIn;
    session.subscribe(v => userLoggedIn = typeof $session.token === 'string');
    let logo = 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Svelte_Logo.svg';

</script>

<style>
    .draggable {
        padding: 1rem;
        background-color: white;
        cursor: move;
    }

    .draggable.dragging {
        opacity: .5;
    }
</style>

<!-- Seems like we cannot render elements with 'slot' attributes in if blocks,
because Svelte starts complaining that the element must be a direct child on a component. -->
{#if !userLoggedIn}
    <Nav class="navbar is-horizontal-align is-vertical-align">
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
        <a slot="left" href="/" class="brand">
            <Icon src={logo} size="2" class="is-rounded navbar__image" />
        </a>

        <div class="main-dropdown" slot="left">
            <div class="dropdown is-horizontal-align">
                <Button dropdown="HUMAN RESOURCES" autoclose clear>
                    <div class="container">
                        <p class="draggable" draggable="true"><a href="/manage">Manage employees</a></p>
                        <p class="draggable" draggable="true"><a href="/skills">Manage employee skills</a></p>
                        <p class="draggable" draggable="true"><a href="/positions">Manage employee positions</a></p>
                        <p class="draggable" draggable="true"><a href="/folderView">Main</a></p>
                        <p class="draggable" draggable="true"><a href="/test">Draggable test</a></p>
                    </div>
                </Button>
            </div>
        </div>

        <a slot="right" href="/">Log out</a>
        <a slot="right" class="icon" href="/"><div class="profile-icon"><MdAccountCircle/></div></a>
    </Nav>
{/if}

