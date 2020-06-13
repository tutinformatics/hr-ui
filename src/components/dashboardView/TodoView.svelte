<svelte:head>
    <link rel='stylesheet' href='employees.css'>
</svelte:head>
<style>

    .board {
        height: 70vh;
        width: 100%;
        padding: 0.5em;
        margin-bottom: 40px;
    }
    .column {
        height: 100%;
        /*width: 320px;*/
        width: 340px;
        padding: 0.5em;
        margin: 1em;
        float: left;
        /*border: 1px solid #333333;*/
        border-radius: 10px;
        background-color: #f7fafc;
        box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
        /*Notice we make sure this container doesn't scroll so that the title stays on top and the dndzone inside is scrollable*/
        overflow-y: hidden;
    }
    .column-content {
        height: 100%;
        /* Notice that the scroll container needs to be the dndzone if you want dragging near the edge to trigger scrolling */
        overflow-y: scroll;
    }
    ::-webkit-scrollbar {
        width: 0px;
        background: transparent
    }

    .column-title {
        margin-bottom: 1em;
        display: flex;
        justify-content: left;
        align-items: center;
    }

    .column-footer {
        margin-top: 1em;
        display: flex;
        justify-content: left;
        align-items: center;
    }

    .title {
        color: #4a5568;
    }

    .department-tag {
        border-radius: 15px;
        width: 60px;
        height: 25px;
        background: #faf5ff;
    }

    .circle {
        margin-left: 7px;
        margin-right: 7px;
        width: 7px;
        height: 7px;
        background: #b794f4;
        border-radius: 50%
    }
</style>

<script>
    import {flip} from 'svelte/animate';
    import {dndzone} from '../svelte-dnd-action'
    import {Container, Row, Col, Button, Card, Tag} from 'svelte-chota'
    import CardView from "../skillboardView/CardView.svelte";
    import { fade } from 'svelte/transition';

    export let employees;
    let add = employees.length;

    function addColumn() {
        employees = employees.concat({
            done: false,
            id: add + 1,
            name: '<input id="title-input" type="text" placeholder="Title here..."/>',
            items: []
        });
        add += 1;
    }

    function deleteColumn(id) {
        employees = employees.filter(e => e.id != id);
        console.log(employees);
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
        alert('Draggable elements are still clickable :)');
    }

    function changeTitle(index) {
        var inputVal = document.getElementById('title-input').value;
        employees[index - 1].name = '<span>'.concat(inputVal, '</span>');
    }
</script>

<section class="board"
         use:dndzone={{items:employees, flipDurationMs, type:'columns'}}
         on:consider={handleDndConsiderColumns}
         on:finalize={handleDndFinalizeColumns}>
    {#each employees as column (column.id)}
        <div class="column" class:done={column.done}>
            <div class="pull-right">
                <Button dropdown="..." autoclose clear>
                    <Row>
                        <Button outlined
                                on:click={addColumn}
                        >
                            Add column
                        </Button>
                    </Row>
                    <Row>
                        <Button outlined
                                on:click={deleteColumn(column.id)}
                        >
                            Delete column
                        </Button>
                    </Row>
                </Button>
            </div>
            <div class="column-title text-center">
                <strong class="title" on:change={changeTitle(column.id)}>{@html column.name}</strong>
            </div>
            <div class="column-content" use:dndzone={{items:column.items, flipDurationMs}}
                 on:consider={(e) => handleDndConsiderCards(column.id, e)} on:finalize={(e) => handleDndFinalizeCards(column.id, e)}>
                {#each column.items as item (item.id)}
                    <div on:click={handleClick}>
                        <Card class="employee-card">
                            <Row>
                                {item.partyId}
                            </Row>
                            <small>
                                <Row>
                                    <strong>Email: </strong> ofbizl@sapper.svelte <br/>
                                </Row>
                                <Row>
                                    <strong>Telephone: </strong> +37256938555 <br/>
                                </Row>
                            </small>
                            <Row>
                                <Col size="8">
                                </Col>
                                <Col>
                                    <div class="department-tag is-vertical-align">
                                        <div class="circle"></div>
                                        <small>Ofbiz</small>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </div>
                {/each}
            </div>
            <div class="column-footer">
                <strong>Footer btw</strong>
            </div>
        </div>
    {/each}
</section>