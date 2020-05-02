<script context="module">
    export async function preload(page, session) {
        const { token } = session;

        if (!token) return this.redirect(302, '/login');

        // Parameters for findParty service in Ofbiz.
        // We look for people with role EMPLOYEE and who is a PERSON.
        const body = {
            roleTypeId: "EMPLOYEE",
            partyTypeId: "PERSON",
            lookupFlag: "Y"
        }

        const response = await this.fetch(`${process.env.SAPPER_APP_API_URL}/generic/v1/services/findParty`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                Aceept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        });

        const result = await response.json();

        if (result.errorMessage) {
            console.log(result.errorMessage);
            return;
        }

        return { employees: result.partyList };
    }
</script>

<script>
    import { Container, Card, Row, Col } from 'svelte-chota';

    export let employees = [];
</script>

<style>
    h1,
    h2,
    p {
        text-align: center;
    }

    h4 {
        margin: 0;
        color: black;
    }

    .sticky-text {
        position: sticky;
        top: 25vh;
        color: black;
    }

    .sticky-text h1 {
        font-weight: 600;
    }

    .tips {
        margin-top: 10vh;
    }

    .stats {
        margin: 0;
        margin-top: 10vh;
        padding: 0 5vw 0 5vw;
    }

    .stats h2 {
        font-weight: 500;
        margin-bottom: 16px;
    }
</style>

<Row class="employees-container">
    <Col size="7" class="left-side">
    <div class=sticky-text>
        <h1>Employees</h1>

        <p>Here you can see a list of all employees at your company</p>

        <p class="tips">
            By clicking on the employee you can navigate to the detailed view of this particular employee
        </p>

        <div class="stats">
            <h2>Some statistics</h2>

            <Row>
                <Col size="4" class="stats-block">
                <Row class="stats-header">
                    <Col>
                    Current Employees
                    </Col>
                </Row>
                <Row class="stats-content">
                    <Col>
                    {employees.length}
                    </Col>
                </Row>
                </Col>
            </Row>
        </div>
    </div>
    </Col>

    <Col size="4" class="right-side">
    {#if !employees}
        <h2>You don't have employees in your company yet.</h2>
        <!-- TODO: Make it a link that leads to employee creation view -->
        <p>Create employee</p>
    {:else}    
        {#each employees as employee}
            <Row>
                <Col class="employeeCard">
                    <Card class="employeeCard__body">
                        <h4>{employee.partyId}</h4>
                    </Card>
                </Col>
            </Row>
        {/each}
    {/if}
    </Col>
</Row>