<svelte:head>
    <script src="https://code.iconify.design/1/1.0.6/iconify.min.js"></script>
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
        console.log("table: true");
        tableView = true;
        cardView = false;
        todoView = false;
    }

    function showCardView() {
        console.log("card: true");
        tableView = false;
        cardView = true;
        todoView = false;
    }

    function showTodoView() {
        console.log("todo: true");
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
        /*margin-left: .5rem;*/
        font-style: italic;
        color: #29627e;
        position: sticky;
        top: 45%;
        border-left: gray solid 2px;
    }

    .btn-group-aside {
        margin-left: 40%
    }

    .iconify {
        width: auto;
        height: 30px;
    }


</style>


<aside>
    <div class="btn-group-aside">
        <Row>
            <Button class="btn" on:click={showTableView} outline>
                <div class="view is-horizontal-align">
                    <Icon src={mdiViewHeadline}/>
                </div>
            </Button>
        </Row>
        <br/>
        <Row>
            <Button class="btn" on:click={showCardView} outline>
                <div class="view is-horizontal-align">
                    <span class="iconify" data-icon="ic:outline-view-module" data-inline="false"></span>
                </div>
            </Button>
        </Row>
        <br/>
        <Row>
            <Button class="btn" on:click={showTodoView} outline>
                <div class="view is-horizontal-align">
                    <span class="iconify" data-icon="ic:outline-view-column" data-inline="false"></span>
                </div>
            </Button>
        </Row>
    </div>
</aside>