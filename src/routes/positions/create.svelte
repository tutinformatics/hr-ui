<script context="module">
    export async function preload(page, session) {
        const { token } = session;

        if (!token) this.redirect(302, "/login");

        const positionStatusesResponse = await this.fetch(
            `${process.env.SAPPER_APP_API_URL}/generic/v1/entityquery/StatusItem`,
            {
                method: "POST",
                body: JSON.stringify({
                    inputFields: {
                        statusId_fld0_op: "like",
                        statusId_fld0_value: "EMPL_POS"
                    },
                    fieldList: ["statusId", "description"]
                }),
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
        );
        const positionStatusesResult = await positionStatusesResponse.json();

        if (!positionStatusesResponse.ok) {
            console.error(positionStatusesResult.errorMessage);
            return {};
        }
        return {
            statuses: positionStatusesResult
        };
    }
</script>

<script>
    import { Container, Row, Col, Tabs, Tab, Radio } from "svelte-chota";
    import PaperFormButtons from "../../components/paperForm/PaperFormButtons.svelte";

    export let statuses = [];

    let name = "";
    let status = statuses.length > 0 ? statuses[0].description : "";
    let department = "";
</script>

<style>
    h1 {
        margin: 0;
    }

    input {
        margin-bottom: 1vh;
    }
</style>

<svelte:head>
    <link rel="stylesheet" href="paper-form.css" />
</svelte:head>
<PaperFormButtons forObject="positions" isEditing={true} mode="create" />

<Container class="paper">
    <Row>
        <Col size="5">
            <input placeholder="Position name" bind:value={name} />
        </Col>
    </Row>

    <div class="paper__main-info">
        <Row>
            <Col size="2" class="paper__main-info-type">Status</Col>
            <Col size="3" class="paper__main-info-value">
                <div class="position-statuses">
                    {#each statuses as posStatus}
                        <Radio
                            value={posStatus.description}
                            bind:group={status}>
                            {posStatus.description}
                        </Radio>
                    {/each}
                </div>
            </Col>
        </Row>

        <Row>
            <Col size="2" class="paper__main-info-type">Department/Company</Col>
            <Col size="3" class="paper__main-info-value">
                <input
                    placeholder="Department or company name"
                    bind:value={department} />
            </Col>
        </Row>
    </div>
</Container>
