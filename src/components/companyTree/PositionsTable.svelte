<script>
    export let allDepartments;
    export let activeDepartments;

    let forDepartment;
    let positions;

    $: forDepartment = activeDepartments
        ? activeDepartments[activeDepartments.length - 1]
        : {};
    $: if (activeDepartments && forDepartment) {
        positions = allDepartments.find(dep => dep.id === forDepartment.id)
            .positions;
    } else {
        positions = [];
    }
</script>

<style>
    table,
    th,
    td {
        border: 1px solid black;
        border-collapse: collapse;
    }

    div {
        margin: 5vh auto;
        overflow-y: scroll;
        max-height: 300px;
        width: 100%;
    }

    .new-pos {
        color: #007bff;
        background-color: transparent;
        border: none;
        outline: none;
        box-shadow: none;
        margin-left: 5px;
        padding-left: 10px;
        padding-right: 10px;
    }
    .new-pos:focus {
        border: none;
        outline: none;
        box-shadow: none;
    }

    .new-pos:hover {
        background-color: #007bff;
        color: white;
    }
</style>

<div>
    <table>
        <tr>
            <th>
                Position
                <button class="new-pos">Add New</button>
            </th>
            <th>Department</th>
        </tr>
        {#each positions as pos}
            <tr>
                <td>{pos.name}</td>
                <td>
                    {allDepartments.find(dep => dep.id === forDepartment.id).name}
                </td>
            </tr>
        {/each}
    </table>
</div>
