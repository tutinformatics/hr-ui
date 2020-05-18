<script>
    export let allDepartments;
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
    tr,
    th {
        border: 1px solid black;
        border-collapse: collapse;
    }
</style>

<table>
    <tr>
        <th>Department</th>
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
