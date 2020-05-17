<script context="module">
    export async function preload(page, session) {
        const { token } = session;

        if (!token) this.redirect(302, "/login");

        // On the first request we want to query the name and id of the root company.
        const response = await this.fetch(
            `${process.env.SAPPER_APP_API_URL}/generic/v1/entityquery/PartyGroup`,
            {
                method: "POST",
                body: JSON.stringify({
                    inputFields: {
                        // TODO: Hardcoded this for now.
                        partyId: "Company"
                    },
                    fieldList: ["groupName"]
                }),
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const result = await response.json();

        if (result.errorMessage) {
            console.error(result.errorMessage);
            return;
        }

        return {
            rootDepId: "Company",
            rootDepName: result.length === 1 ? result[0].groupName || "" : ""
        };
    }
</script>

<script>
    import { Container, Row, Col } from "svelte-chota";
    import TreeBranch from "../../components/companyTree/TreeBranch.svelte";
    import DepartmentTable from "../../components/companyTree/DepartmentTable.svelte";
    import PositionsTable from "../../components/companyTree/PositionsTable.svelte";
    import EmployeesTable from "../../components/companyTree/EmployeesTable.svelte";

    export let rootDepId;
    export let rootDepName;

    // All department relation will be stored here.
    let departmentRelations = [{ id: rootDepId, name: rootDepName, deps: [] }];
</script>

<svelte:head>
    <link rel="stylesheet" href="company-structure.css" />
</svelte:head>

<Row class="company-structure">
    <Col size="4">
        <TreeBranch
            departmentId={rootDepId}
            departmentName={rootDepName}
            bind:departmentRelations />
    </Col>

    <Col />
</Row>
