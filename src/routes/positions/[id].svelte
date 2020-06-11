<script context="module">
    export async function preload(page, session) {
        const { token } = session;

        if (!token) this.redirect(302, "/login");

        const { id } = page.params;
        const url = `${process.env.SAPPER_APP_API_URL}/generic/v1/entityquery`;
        const positionResponse = await this.fetch(`${url}/EmplPosition`, {
            method: "POST",
            body: JSON.stringify({
                inputFields: {
                    emplPositionId: id
                },
                entityRelations: {
                    _toOne_Party: {
                        fieldList: ["partyId"],
                        entityRelations: {
                            _toOne_PartyGroup: {
                                fieldList: ["groupName"]
                            }
                        }
                    },
                    _toOne_EmplPositionType: {
                        fieldList: ["description"]
                    },
                    _toOne_StatusItem: {
                        fieldList: ["description"]
                    },
                    _toMany_ReportingToEmplPositionReportingStruct: {
                        fieldList: ["emplPositionIdReportingTo", "comments"]
                    },
                    _toMany_ManagedByEmplPositionReportingStruct: {
                        fieldList: [
                            "emplPositionIdManagedBy",
                            "emplPositionIdManagedBy",
                            "comments"
                        ]
                    }
                }
            }),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        const positionResult = await positionResponse.json();

        const positionStatusesResponse = await this.fetch(`${url}/StatusItem`, {
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
        });
        const positionStatusesResult = await positionStatusesResponse.json();

        if (!positionResponse.ok) {
            console.error(positionResult.errorMessage);
            return {};
        }
        if (!positionStatusesResponse.ok) {
            console.error(positionStatusesResult.errorMessage);
            return {
                position: positionResult.length > 0 ? positionResult[0] : {}
            };
        }
        return {
            position: positionResult.length > 0 ? positionResult[0] : {},
            statuses: positionStatusesResult
        };
    }
</script>

<script>
    import { Container, Row, Col, Tabs, Tab, Radio } from "svelte-chota";
    import PaperFormButtons from "../../components/paperForm/PaperFormButtons.svelte";

    export let position = {};
    export let statuses = {};

    let isEditing = false;

    let name = position._toOne_EmplPositionType
        ? position._toOne_EmplPositionType.description || ""
        : "";
    let status = position._toOne_StatusItem
        ? position._toOne_StatusItem.description || ""
        : "";
    let department = position._toOne_Party
        ? position._toOne_Party._toOne_PartyGroup.groupName || ""
        : "";
    let isPaid = position.salaryFlag || "";
    let isTemporary = position.temporaryFlag || "";
    let isFulltime = position.fulltimeFlag || "";
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
<PaperFormButtons forObject="positions" bind:isEditing mode="edit" />

<Container class="paper">
    <Row>
        <Col size="5">
            {#if isEditing}
                <input placeholder="Position name" bind:value={name} />
            {:else}
                <h1>{name}</h1>
            {/if}
        </Col>
    </Row>

    <div class="paper__main-info">
        <Row>
            <Col size="2" class="paper__main-info-type">Department/Company</Col>
            <Col size="3" class="paper__main-info-value">
                {#if isEditing}
                    <input
                        placeholder="Department or company name"
                        bind:value={department} />
                {:else}{department}{/if}
            </Col>
        </Row>

        <Row>
            <Col size="2" class="paper__main-info-type">Status</Col>
            <Col size="2" class="paper__main-info-value">
                {#if isEditing}
                    <div class="radios">
                        {#each statuses as posStatus}
                            <Radio
                                value={posStatus.description}
                                bind:group={status}>
                                {posStatus.description}
                            </Radio>
                        {/each}
                    </div>
                {:else}{status}{/if}
            </Col>
        </Row>

        <Row>
            <Col size="2" class="paper__main-info-type">Paid</Col>
            <Col size="2" class="paper__main-info-value">
                {#if isEditing}
                    <div class="radios">
                        <Radio value="Y" bind:group={isPaid}>Yes</Radio>
                        <Radio value="N" bind:group={isPaid}>No</Radio>
                    </div>
                {:else}{isPaid === 'Y' ? 'Yes' : 'No'}{/if}
            </Col>
        </Row>

        <Row>
            <Col size="2" class="paper__main-info-type">Temporary</Col>
            <Col size="2" class="paper__main-info-value">
                {#if isEditing}
                    <div class="radios">
                        <Radio value="Y" bind:group={isTemporary}>Yes</Radio>
                        <Radio value="N" bind:group={isTemporary}>No</Radio>
                    </div>
                {:else}{isTemporary === 'Y' ? 'Yes' : 'No'}{/if}
            </Col>
        </Row>

        <Row>
            <Col size="2" class="paper__main-info-type">Full time</Col>
            <Col size="2" class="paper__main-info-value">
                {#if isEditing}
                    <div class="radios">
                        <Radio value="Y" bind:group={isFulltime}>Yes</Radio>
                        <Radio value="N" bind:group={isFulltime}>No</Radio>
                    </div>
                {:else}{isFulltime === 'Y' ? 'Yes' : 'No'}{/if}
            </Col>
        </Row>
    </div>
</Container>
