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
        width: 100%;
    }

    .new-empl {
        background-color: #007bff;
        color: white;
        border: none;
        outline: none;
        box-shadow: none;
        margin-bottom: 5px;
        padding-left: 10px;
        padding-right: 10px;
    }
    .new-empl:focus {
        border: none;
        outline: none;
        box-shadow: none;
    }

    .new-empl:hover {
        background-color: #007bff;
        color: white;
    }

    a {
        display: contents;
    }
</style>

<div>
    <a href="/employees/create">
        <button class="new-empl">Add New</button>
    </a>
    <table>
        <tr>
            <th>Employee</th>
            <th>Position</th>
            <th>Department</th>
        </tr>
        {#each positions as pos}
            {#each pos.employees as empl}
                <tr>
                    <a href={`employees/${empl.id}`}>
                        <td>{empl.name}</td>
                    </a>
                    <td>{pos.name}</td>
                    <td>
                        {allDepartments.find(dep => dep.id === forDepartment.id).name}
                    </td>
                </tr>
            {/each}
        {/each}
    </table>
</div>
