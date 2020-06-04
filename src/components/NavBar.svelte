<svelte:head>
    <link rel='stylesheet' href='navbar.css'>
    <script src="drag.js"></script>
</svelte:head>
<script>
    import { onDestroy } from 'svelte';
    import { Nav, Icon, Button, Row, Col} from "svelte-chota";
    import { mdiFaceProfile } from "@mdi/js";
    import {dndzone} from 'svelte-dnd-action'
    import MdAccountCircle from "svelte-icons/md/MdAccountCircle.svelte";
    import {mdiApps, mdiAutoFix, mdiAccount, mdiCastConnected, mdiChartAreaspline,
        mdiFolderTableOutline, mdiSourceBranch, mdiStarOutline} from '@mdi/js';
    import { stores, goto } from "@sapper/app";
    import SortableList from 'svelte-sortable-list/SortableList.svelte';
    import {spaces} from '../store.js'
    let work_space;

    const unsubscribe = spaces.subscribe(value => {
        work_space = [...value];
    });

    onDestroy(unsubscribe);

    const { session } = stores();

    let userLoggedIn;
    session.subscribe(v => (userLoggedIn = typeof $session.token === "string"));

    let logo = "https://upload.wikimedia.org/wikipedia/commons/1/1b/Svelte_Logo.svg";

    /**
     * Log the user out of the system.
     */
    async function logout() {
        const response = await fetch("/auth/logout", {method: "POST"});
        const result = await response.json();

        if (result.error) {
            console.error(result.error);
            return;
        }
        $session.token = null;
        goto('/');
    }

    let list = [
        {icon: mdiAutoFix, name: "Sfa"},
        {icon: mdiCastConnected, name: "Marketing"},
        {icon: mdiAccount, name: "Crm"},
        {icon: mdiChartAreaspline, name: "Marketdata"},
        {icon: mdiSourceBranch, name: "Object dist"},
        {icon: mdiFolderTableOutline, name: "Cms"}
    ];

    const sortList = ev => {list = ev.detail};
</script>

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
        <div class="dropdown drag-icon" slot="left">
            <Button class="project-button" dropdown="" icon={mdiApps} clear>
                <SortableList
                        {list}
                        on:sort={sortList}
                        let:item
                >
                    <div>
                        <Icon class="project-icon" src={item.icon}/>
                        <small class="table-view-tab"> {item.name}</small>
                    </div>
                </SortableList>
            </Button>
        </div>
        <a slot="left" href="/" class="brand">HR</a>

        <a slot="left" href="/company">Main</a>
        <a slot="left" href="/employees">Employees</a>
        <a slot="left" href="/positions">Employee Positions</a>
        <a slot="left" href="/skills">Skills</a>

        <div class="dropdown is-horizontal-align is-vertical-align" slot="right">
            <Button dropdown="Workspaces" iconRight={mdiStarOutline} clear autoclose>
                <div>
                    {#each work_space as space}
                    <p>{@html space.name}</p>
                    {/each}
                </div>
            </Button>
        </div>

        <a slot="right" href="#">Messages</a>
        <a slot="right" href="#" on:click={logout}>Log out</a>
        <a slot="right" class="icon" href="/">
            <div class="profile-icon">
                <MdAccountCircle />
            </div>
        </a>
    </Nav>
{/if}

