<svelte:head>
    <script src="https://code.iconify.design/1/1.0.6/iconify.min.js"></script>
    <link rel='stylesheet' href='employees-dashboard.css'>
</svelte:head>
<script>
    import {Input, Field, Card, Row, Col, Button, Tag, Icon} from 'svelte-chota'
    import MdApps from 'svelte-icons/md/MdApps.svelte'
    import FaTable from 'svelte-icons/fa/FaTable.svelte'
    import FaExpandArrowsAlt from 'svelte-icons/fa/FaExpandArrowsAlt.svelte'
    import ViewDashboardOutline from 'svelte-material-icons/ViewDashboardOutline.svelte'
    import {mdiViewCompactOutline, mdiViewList, mdiViewColumn, mdiViewHeadline, mdiViewModule} from '@mdi/js';

    export let tableView = true;
    export let cardView = false;
    export let todoView = false;

    function showTableView() {
        tableView = true;
        cardView = false;
        todoView = false;
    }

    function showCardView() {
        tableView = false;
        cardView = true;
        todoView = false;
    }

    function showTodoView() {
        tableView = false;
        cardView = false;
        todoView = true;
    }
</script>

<style>
    aside {
        float: right;
        width: 10%;
        padding-left: .5rem;
        font-style: italic;
        color: #29627e;
        position: sticky;
        top: 45%;
        border-left: gray solid 2px;
    }

    .btn-group-aside {
        margin-left: 42%
    }

    .iconify {
        width: auto;
        height: 30px;
        margin-left: -15px;
    }


</style>


<aside>
    <div class="btn-group-aside">
        <Row>
            <Button class="btn" on:click={showTableView} outline>
                <span class="iconify" data-icon="mdi:view-headline" data-inline="false"></span>
            </Button>
        </Row>
        <br/>
        <Row>
            <Button class="btn" on:click={showCardView} outline>
                <span class="iconify" data-icon="ic:outline-view-module" data-inline="false"></span>
            </Button>
        </Row>
        <br/>
        <Row>
            <Button class="btn" on:click={showTodoView} outline>
                <span class="iconify" data-icon="ic:outline-view-column" data-inline="false"></span>
            </Button>
        </Row>
    </div>
</aside>