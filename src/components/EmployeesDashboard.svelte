<svelte:head>
    <link rel='stylesheet' href='employees-dashboard.css'>
</svelte:head>
<script>
    import {Input, Field, Card, Row, Col, Button, Tag} from 'svelte-chota'
    import { Checkbox, Menu, Menuitem, Icon, Datefield, Sidepanel, Textfield} from 'svelte-mui/src';
    import { mdiPlus, mdiMagnify} from '@mdi/js';
    import FaUserPlus from 'svelte-icons/fa/FaUserPlus.svelte'
    import MdApps from 'svelte-icons/md/MdApps.svelte'
    import FaTable from 'svelte-icons/fa/FaTable.svelte'
    import FaExpandArrowsAlt from 'svelte-icons/fa/FaExpandArrowsAlt.svelte'
    import TodoView from './view/TodoView.svelte'
    import CardView from './view/CardView.svelte'
    import TableView from './view/TableView.svelte'

    import TVNavbar from './view/TVNavbar.svelte'
    import Aside from "./view/Aside.svelte"

    export let workers = [];

    let value = '';
    let colors = ['coral', 'goldenrod', 'limegreen'];
    let favorite = ['coral', 'goldenrod'];

    let table = true;
    let card = false;
    let todo = false;

    workers.forEach(addId);

    function addId(item, index) {
        item.id = index;
    }

    let board = [

        {
            id: 1,
            name: "New employee",
            items: workers
        },
        {
            id: 2,
            name: "Hiring people",
            items: []
        },
        {
            id: 3,
            name: "Other stuff",
            items: []
        }
    ];

    $: checked = favorite.length === colors.length;

    function onAll(e) {
        let on = e.target.checked;
    }

    function visible() {
        rightVisible = true;
    }
    console.log(table, card, todo)
</script>


<Aside
        bind:tableView={table}
        bind:cardView={card}
        bind:todoView={todo}
/>
<TVNavbar/>
<br/>
<br/>
<br/>
<br/>
<Row>
    <Col>
        {#if table}
        <Card class="text-justify">
            <hr/>
                {#each workers as employee}
                <TableView worker={employee}/>
                {/each}
        </Card>
        {/if}
        {#if card}
            <Row>
                {#each workers as employee}
                <CardView worker={employee} />
                {/each}
            </Row>
        {/if}
        {#if todo}
            <TodoView employees={board}/>
        {/if}
    </Col>
</Row>
