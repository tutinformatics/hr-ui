<svelte:head>
    <link rel="stylesheet" href="company-structure.css">
</svelte:head>

<script context="module">
    export async function preload(page, session) {
        const {token} = session;

        if (!token) this.redirect(302, "/login");

        // On the first request we want to query the name and id of the root company.
        const response = await this.fetch(`${process.env.SAPPER_APP_API_URL}/generic/v1/entityquery/PartyGroup`, {
            method: "POST",
            body: JSON.stringify({
                inputFields: {
                    // TODO: Hardcoded this for now.
                    partyId: 'Company'
                },
                fieldList: ["groupName"]
            }),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            }
        });

        const result = await response.json();

        if (result.errorMessage) {
            console.error(result.errorMessage);
            return;
        }

        return {
            rootId: 'Company',
            rootName: result.length === 1 ? result[0].groupName || '' : ''
        };
    }
</script>

<script>
    import {Container, Row, Col} from 'svelte-chota';
    import Department from '../../components/Department.svelte';

    export let rootId;
    export let rootName;

    // These values are needed for registering which department is currently active.
    let currId = rootId;
    let currName = rootName;
</script>

<Row class="company-structure">
    <Col size="4">
        <Department
                {rootId}
                {rootName}
                bind:currentId={currId}
                bind:currentName={currName} />
    </Col>

    <Col>
        {currName}
    </Col>
</Row>
