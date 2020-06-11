<style>
    h1 {
        margin: 0;
    }

    button:focus {
        border: none;
        outline: none;
        box-shadow: none;
    }

    input {
        margin-bottom: 1vh;
    }

    .phone__extension {
        max-width: 50px;
        text-align: center;
        margin-right: 1vw;
    }

    .icon {
        width: 2rem;
        height: 2rem;
        display: inline-block;
        color: #757575;
        vertical-align: text-top;
    }
    h3 {
        margin-top: 4vh;
        font-weight: 600;
    }


</style>

<script>
    import {Container, Row, Col, Tabs, Tab} from "svelte-chota";
    import FaBriefcase from "svelte-icons/fa/FaBriefcase.svelte";
    import FaUserLock from "svelte-icons/fa/FaUserLock.svelte";
    import FaPen from "svelte-icons/fa/FaPen.svelte";

    import EmployeeWorkInfo from "../../components/EmployeeWorkInfo.svelte";
    import EmployeePrivateInfo from "../../components/EmployeePrivateInfo.svelte";
    import EmployeeHRInfo from "../../components/EmployeeHRInfo.svelte";

    let activeTab = 0;
</script>

<Container class="employee">
    <Row class="employee__name-and-image">
        <Col size="5" class="employee-name">
            <h1>DemoEmployee</h1>
        </Col>

        <Col class="employee-image">
            <img src="favicon.png" alt="Employee profile image" />
        </Col>
    </Row>

    <div class="employee__main-info">
        <Row>
            <Col size="2" class="employee__main-info-type">Work Phone</Col>
            <Col size="3" class="employee__main-info-value phone">
                555-5555
            </Col>
        </Row>

        <Row>
            <Col size="2" class="employee__main-info-type">Work Email</Col>
            <Col size="3" class="employee__main-info-value">
                ofbiztest@example.com
            </Col>
        </Row>

        <Row>
            <Col size="2" class="employee__main-info-type">Work Location</Col>
            <Col size="3" class="employee__main-info-value">
                Your Company Name Here
            </Col>
        </Row>
    </div>

    <Tabs bind:active={activeTab} full class="employee__tabs">
        <Tab>
            <div class="icon">
                <FaBriefcase />
            </div>
            Work Information
        </Tab>

        <Tab>
            <div class="icon">
                <FaUserLock />
            </div>
            Skill Information
        </Tab>

        <Tab>
            <div class="icon">
                <FaPen />
            </div>
            HR Settings
        </Tab>
    </Tabs>

    <div class="employee__other-info">
        {#if activeTab === 0}
            Works info here
        {:else if activeTab === 1}
            <Row>
                <Col>
                    <!-- Skill info -->
                    <h3>Skills</h3>
                    <Row>
                        <Col size="2" class="employee__main-info-type">Skill type:</Col>
                        <Col size="3" class="employee__main-info-value">
                            Java/Groovy/BSH
                        </Col>
                    </Row>

                    <Row>
                        <Col size="2" class="employee__main-info-type">Years Experience</Col>
                        <Col size="3" class="employee__main-info-value">
                            25 years
                        </Col>
                    </Row>

                    <Row>
                        <Col size="2" class="employee__main-info-type">Skill Rating</Col>
                        <Col size="3" class="employee__main-info-value phone">
                            1
                        </Col>
                    </Row>

                    <Row>
                        <Col size="2" class="employee__main-info-type">Skill Level</Col>
                        <Col size="3" class="employee__main-info-value phone">
                            2
                        </Col>
                    </Row>

                    <!-- Marital status of the employee -->
                    <h3>Marital Status</h3>
                    <Row>
                        <Col size="2" class="employee__other-info-type">Marital Status</Col>
                        <Col size="3" class="employee__other-info-value">
                        </Col>
                    </Row>

                    <!-- Citizenship information -->
                    <h3>Citizenship</h3>
                    <Row>
                        <Col size="2" class="employee__other-info-type">
                            Identification Number
                        </Col>
                        <Col size="3" class="employee__other-info-value">

                        </Col>
                    </Row>

                    <Row>
                        <Col size="2" class="employee__other-info-type">Passport Number</Col>
                        <Col size="3" class="employee__other-info-value">

                        </Col>
                    </Row>

                    <Row>
                        <Col size="2" class="employee__other-info-type">Gender</Col>
                        <Col size="3" class="employee__other-info-value">

                        </Col>
                    </Row>
                    <Row>
                        <Col size="2" class="employee__other-info-type">Date of Birth</Col>
                    </Row>
                </Col>
            </Row>
        {:else}
            Hr info here
        {/if}
    </div>

</Container>