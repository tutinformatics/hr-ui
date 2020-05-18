<script>
    import { stores } from "@sapper/app";
    import FaMinus from "svelte-icons/fa/FaMinus.svelte";
    import FaPlus from "svelte-icons/fa/FaPlus.svelte";

    const { session } = stores();

    export let allDepartments;
    export let departmentId;
    export let departmentName;
    export let departmentRelations;
    export let activeDepartments;
    export let level; // How deep into the tree we go.

    let expanded = false;

    /**
     * Show or hide related departments in the tree.
     */
    async function expand() {
        expanded = !expanded;

        // Load new department only if the tree node has been expanded
        // and it was for the first time.
        if (expanded) {
            activeDepartments = [
                ...activeDepartments,
                { id: departmentId, level }
            ];
        }
        // Rollback to the department that acts as a parent to the
        // current department.
        else if (!expanded) {
            activeDepartments = activeDepartments.filter(
                dep => dep.id !== departmentId
            );
        }
    }
</script>

<style>
    span {
        padding: 0;
        font-weight: bold;
        cursor: pointer;
    }

    ul {
        padding: 0.2em 0 0 0.5em;
        margin: 0 0 0 0.5em;
        list-style: none;
        border-left: 1px solid #eee;
    }

    li {
        padding: 0.2em 0;
    }

    .icon {
        width: 1.5rem;
        height: 1.5rem;
        display: inline-block;
        color: #a4a4a4;
        vertical-align: text-top;
    }
</style>

<span class:expanded on:click={expand}>
    <div class="icon">
        {#if expanded}
            <FaMinus />
        {:else}
            <FaPlus />
        {/if}
    </div>
    {departmentName}
</span>

<!--Company structure tree view-->
{#if expanded}
    <ul>
        {#each departmentRelations[departmentId] as dep}
            <li>
                <svelte:self
                    {allDepartments}
                    departmentId={dep.id}
                    departmentName={dep.name}
                    parentDepId={departmentId}
                    level={level + 1}
                    {departmentRelations}
                    bind:activeDepartments />
            </li>
        {/each}
    </ul>
{/if}
