<script>
    import { stores } from "@sapper/app";
    import FaMinus from "svelte-icons/fa/FaMinus.svelte";
    import FaPlus from "svelte-icons/fa/FaPlus.svelte";

    const { session } = stores();

    export let allDepartments;
    export let departmentRelations;
    export let departmentId;
    export let departmentName;
    export let activeDepartments;
    export let level; // How deep into the tree we go.

    // Initially the node is collapsed, unless it is the root node.
    let expanded = false || level === 0;
    $: expanded = activeDepartments.map(dep => dep.id).includes(departmentId);

    /**
     * Show or hide related departments in the tree.
     */
    async function expand() {
        expanded = !expanded;

        if (expanded) {
            // Only one node from the same level can be expanded.
            activeDepartments = activeDepartments.filter(
                dep => dep.level < level
            );
            activeDepartments = [
                ...activeDepartments,
                { id: departmentId, level }
            ];
        } else if (!expanded && parentDepId) {
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

<span on:click={expand}>
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
                    {departmentRelations}
                    departmentId={dep.id}
                    departmentName={dep.name}
                    bind:activeDepartments
                    level={level + 1} />
            </li>
        {/each}
    </ul>
{/if}
