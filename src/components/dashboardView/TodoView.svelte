<style>
    .done {
        opacity: 0.4
    }

    .board {
        height: 90vh;
        width: 100%;
        padding: 0.5em;
        margin-bottom: 40px;
    }
    .column {
        height: 100%;
        width: 250px;
        padding: 0.5em;
        margin: 1em;
        float: left;
        border: 1px solid #333333;
        border-radius: 10px;
        background-color: white;
        box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
        /*Notice we make sure this container doesn't scroll so that the title stays on top and the dndzone inside is scrollable*/
        overflow-y: hidden;
    }
    .column-content {
        height: 100%;
        /* Notice that the scroll container needs to be the dndzone if you want dragging near the edge to trigger scrolling */
        overflow-y: scroll;
    }
    .column-title {
        margin-bottom: 1em;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .card {
        height: 15%;
        width: 100%;
        margin: 0.4em 0;
        /*display: flex;*/
        /*justify-content: center;*/
        /*align-items: center;*/
        background-color: #dddddd;
        border: 1px solid #333333 ;
    }
</style>

<script>
    import {flip} from 'svelte/animate';
    import {dndzone} from 'svelte-dnd-action'
    import {Container, Row, Col, Button, Card} from 'svelte-chota'
    import CardView from "../skillboardView/CardView.svelte";
    import { fade } from 'svelte/transition';

    export let employees;

    function addColumn() {
        employees = employees.concat({
            done: false,
            id: employees.length + 1,
            name: '<input id="title-input" type="text" placeholder="Title here..."/>',
            items: []
        });
    }

    function deleteColumn() {
        employees = employees.filter(e => !e.done);
    }

    $: remaining = employees.filter(e => !e.done).length;

    const flipDurationMs = 300;

    function handleDndConsiderColumns(e) {
        employees = e.detail.items;
    }

    function handleDndFinalizeColumns(e) {
        employees = e.detail.items;
    }

    function handleDndConsiderCards(cid, e) {
        const colIdx = employees.findIndex(c => c.id === cid);
        employees[colIdx].items = e.detail.items;
        employees = [...employees];
    }

    function handleDndFinalizeCards(cid, e) {
        const colIdx = employees.findIndex(c => c.id === cid);
        employees[colIdx].items = e.detail.items;
        employees = [...employees];
    }

    function handleClick(e) {
        alert('dragabble elements are still clickable :)');
    }

    function changeTitle(index) {
        var inputVal = document.getElementById('title-input').value;
        employees[index - 1].name = '<span>'.concat(inputVal, '</span>');
    }
</script>
<div class="is-vertical-align is-horizontal-align">
    <Card>
        <Row>
            <Col class="is-vertical-align is-horizontal-align">
                <strong>Columns on the desk right now: {remaining}</strong>
            </Col>
        </Row>
        <Row>
            <Col class="is-vertical-align is-horizontal-align">
                <Button outlined class="blue-button" on:click={addColumn}>
                    Add new column
                </Button>
                <Button outlined class="blue-button" on:click={deleteColumn}>
                    Delete column
                </Button>
            </Col>
        </Row>
    </Card>
</div>
<section class="board"
         use:dndzone={{items:employees, flipDurationMs, type:'columns'}}
         on:consider={handleDndConsiderColumns}
         on:finalize={handleDndFinalizeColumns}>
    {#each employees as column (column.id)}
        <div class="column" class:done={column.done}>
            <input
                    type=checkbox
                    bind:checked={column.done}

            >
            <div class="column-title text-center">
                <strong on:change={changeTitle(column.id)}>{@html column.name}</strong>
            </div>
            <div class="column-content" use:dndzone={{items:column.items, flipDurationMs}}
                 on:consider={(e) => handleDndConsiderCards(column.id, e)} on:finalize={(e) => handleDndFinalizeCards(column.id, e)}>
                {#each column.items as item (item.id)}
                    <div class="card" on:click={handleClick}>
                        <Row>
                            {item.partyId}
                        </Row>
                        <small>
                            <Row>
                                <strong>Department: </strong> Ofbiz <br/>
                            </Row>
                            <Row>
                                <strong>Email: </strong> ofbizl@sapper.svelte <br/>
                            </Row>
                            <Row>
                                <strong>Telephone: </strong> +37256938555 <br/>
                            </Row>
                        </small>
                    </div>
                {/each}
            </div>
        </div>
    {/each}
</section>