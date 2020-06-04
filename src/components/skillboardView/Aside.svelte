<script>
    import {Input, Field, Card, Row, Col, Button, Tag} from 'svelte-chota'
    import MdApps from 'svelte-icons/md/MdApps.svelte'
    import FaTable from 'svelte-icons/fa/FaTable.svelte'
    import FaExpandArrowsAlt from 'svelte-icons/fa/FaExpandArrowsAlt.svelte'

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
        /*margin-left: .5rem;*/
        font-style: italic;
        color: #29627e;
        position: sticky;
        top: 45%;
        border-left: gray solid 2px;
    }

    .btn-group {
        margin-left: 40%
    }
</style>


<aside>
    <div class="btn-group">
        <Row>
            <Button on:click={showTableView}>
                <div class="view"><FaTable/></div>
            </Button>
        </Row>
        <br/>
        <Row>
            <Button on:click={showCardView}>
                <div class="view"><MdApps/></div>
            </Button>
        </Row>
        <br/>
        <Row>
            <Button on:click={showTodoView}>
                <div class="view"><FaExpandArrowsAlt/></div>
            </Button>
        </Row>
    </div>
</aside>