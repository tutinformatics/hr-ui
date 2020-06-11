<script>
    import {Input, Field, Card, Row, Col, Button, Tag, Icon} from 'svelte-chota'
    import MdApps from 'svelte-icons/md/MdApps.svelte'
    import FaTable from 'svelte-icons/fa/FaTable.svelte'
    import FaExpandArrowsAlt from 'svelte-icons/fa/FaExpandArrowsAlt.svelte'
    import {mdiViewCompactOutline, mdiViewList, mdiViewColumn} from '@mdi/js';

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

    .btn-group-aside {
        margin-left: 40%
    }
</style>


<aside>
    <div class="btn-group-aside">
        <Row>
            <Button class="btn" on:click={showTableView} outline>
                <div class="view is-horizontal-align">
                    <Icon src={mdiViewList}/>
                </div>
            </Button>
        </Row>
        <br/>
        <Row>
            <Button class="btn" on:click={showCardView} outline>
                <div class="view is-horizontal-align">
                    <Icon src={mdiViewCompactOutline}/>
                </div>
            </Button>
        </Row>
        <br/>
        <Row>
            <Button class="btn" on:click={showTodoView} outline>
                <div class="view is-horizontal-align">
                    <Icon src={mdiViewColumn}/>
                </div>
            </Button>
        </Row>
    </div>
</aside>