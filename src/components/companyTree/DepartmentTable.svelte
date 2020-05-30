<script>
    export let departmentRelations;
    export let activeDepartments;

    /**
     * Find all departments that are on a same level.
     *
     * We need the maximum depth level here.
     *
     * @param {array} activeDeps - ids and depth levels of ALL active departments
     */
    function findOneLevelDepartments(activeDeps) {
        if (activeDeps.length === 0) return [];

        const maxLevel = Math.max(...activeDeps.map(dep => dep.level));
        let departmentIds = [];

        for (const dep of activeDeps) {
            if (dep.level === maxLevel) {
                departmentIds.push(dep.id);
            }
        }
        return departmentIds;
    }

    /**
     * Get all subdepartments recursively.
     */
    function getSubDepartments(depId, deps = []) {
        const subDepartments = departmentRelations[depId];

        if (subDepartments.length === 0) return deps;

        for (const subDep of subDepartments) {
            if (!deps.map(dep => dep.id).includes(subDep.id)) {
                deps.push(subDep);
            }

            const subDepSubDeps = getSubDepartments(subDep.id, deps);
            for (const subDepSubDep of subDepSubDeps) {
                if (!deps.map(dep => dep.id).includes(subDepSubDep.id)) {
                    deps.push(subDepSubDep);
                }
            }
        }
        return deps;
    }

    $: oneLevelDepartments = findOneLevelDepartments(activeDepartments);
</script>

<style>
    table,
    th,
    td {
        border: 1px solid black;
        border-collapse: collapse;
    }

    div {
        overflow-y: scroll;
        max-height: 300px;
        width: 100%;
    }

    .new-dep {
        color: #007bff;
        background-color: transparent;
        border: none;
        outline: none;
        box-shadow: none;
        margin-left: 5px;
        padding-left: 10px;
        padding-right: 10px;
    }
    .new-dep:focus {
        border: none;
        outline: none;
        box-shadow: none;
    }

    .new-dep:hover {
        background-color: #007bff;
        color: white;
    }
</style>

<div>
    <table>
        <tr>
            <th>
                Department
                <button class="new-dep">Add New</button>
            </th>
            <th>Location</th>
        </tr>
        {#each oneLevelDepartments as oneLevelDep}
            {#each getSubDepartments(oneLevelDep) as dep}
                <tr>
                    <td>{dep.name}</td>
                    <td>{dep.location}</td>
                </tr>
            {/each}
        {/each}
    </table>
</div>
