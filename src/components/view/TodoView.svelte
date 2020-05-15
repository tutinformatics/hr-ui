<script>
    import {flip} from 'svelte/animate';
    import {dndzone} from 'svelte-dnd-action'
    export let employees;
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
</script>

<style>
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
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #dddddd;
        border: 1px solid #333333 ;
    }
</style>

<section class="board"
         use:dndzone={{items:employees, flipDurationMs, type:'columns'}}
         on:consider={handleDndConsiderColumns}
         on:finalize={handleDndFinalizeColumns}>
    {#each employees as column (column.id)}
    <div class="column">
        <div class="column-title">{column.name}</div>
        <div class="column-content" use:dndzone={{items:column.items, flipDurationMs}}
             on:consider={(e) => handleDndConsiderCards(column.id, e)} on:finalize={(e) => handleDndFinalizeCards(column.id, e)}>
            {#each column.items as item (item.id)}
                <div class="card" on:click={handleClick}>
                    {item.partyId}
                </div>
            {/each}
        </div>
    </div>
    {/each}
</section>