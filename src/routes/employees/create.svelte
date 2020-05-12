<script context="module">
    export function preload(page, session) {
        if (!session.token) this.redirect(302, '/login');
    }
</script>

<script>
    import {Container, Row, Col, Tabs, Tab} from "svelte-chota";
    import FaBriefcase from "svelte-icons/fa/FaBriefcase.svelte";
    import FaUserLock from "svelte-icons/fa/FaUserLock.svelte";
    import FaPen from "svelte-icons/fa/FaPen.svelte";
    import EmployeeWorkInfo from "../../components/EmployeeWorkInfo.svelte";
    import EmployeePrivateInfo from "../../components/EmployeePrivateInfo.svelte";
    import EmployeeHRInfo from "../../components/EmployeeHRInfo.svelte";
    import EmployeeFormButtons from "../../components/EmployeeFormButtons.svelte";

    let activeTab = 0;

    let firstName = '';
    let middleName = '';
    let lastName = '';

    let workPhoneCC = '';
    let workPhoneCN = '';
    let homePhoneCC = '';
    let homePhoneCN = '';

    let workEmail = '';
    let primaryEmail = '';

    let workLocation = '';
    let workAddress = '';
    let homeAddress = '';

    let maritalStatus = '';

    let socialSecurityNumber = '';
    let passportNumber = '';
    let gender = '';
    let birthDate = '';

    async function createEmployee() {

    }
</script>

<style>
    input {
        margin-bottom: 1vh;
    }

    .profile-image {
        color: transparent;
        border: none !important;
        outline: none;
        box-shadow: none;
        margin: 0;
        padding: 0 !important;
    }

    .profile-image:focus,
    .profile-image:active {
        border: none;
        outline: none;
        box-shadow: none;
    }

    .profile-image::-webkit-file-upload-button {
        visibility: hidden;
    }

    .profile-image::before {
        content: "Upload profile image";
        display: inline-block;
        white-space: nowrap;
        -webkit-user-select: none;
        cursor: pointer;
        background-color: white;
        color: #007bff;
        border: 1px solid #007bff;
        border-radius: 0.5rem;
        outline: none;
        padding: 1vw;
        font-weight: 500;
        font-size: 1em;
    }

    .profile-image:active::before,
    .profile-image:hover::before {
        color: white;
        background-color: #007bff;
    }

    .phone {
        display: flex;
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
</style>

<svelte:head>
    <link rel="stylesheet" href="employees.css" />
</svelte:head>

<EmployeeFormButtons isEditing={true} showCreate={false} />

<Container class="employee">
    <Row class="employee__name-and-image">
        <Col size="5" class="employee-name">
            <input placeholder="First Name" bind:value={firstName} />
            <input placeholder="Middle Name" bind:value={middleName} />
            <input placeholder="Last Name" bind:value={lastName} />
        </Col>

        <Col size="4" />

        <Col size="3" class="employee-image">
            <input type="file" class="profile-image" />
        </Col>
    </Row>

    <div class="employee__main-info">
        <Row>
            <Col size="2" class="employee__main-info-type">Work Phone</Col>
            <Col size="3" class="employee__main-info-value phone" style="display: flex">
                <input placeholder="372" class="phone__extension" bind:value={workPhoneCC} />
                <input placeholder="12345678" class="phone__number" bind:value={workPhoneCN} />
            </Col>
        </Row>

        <Row>
            <Col size="2" class="employee__main-info-type">Work Email</Col>
            <Col size="3" class="employee__main-info-value">
                <input placeholder="test@test.com" type="email" bind:value={workEmail} />
            </Col>
        </Row>

        <Row>
            <Col size="2" class="employee__main-info-type">Work Location</Col>
            <Col size="3" class="employee__main-info-value">
                <input placeholder="Company name" bind:value={workLocation} />
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
            Personal Information
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
            <EmployeeWorkInfo isEditing={true} bind:fullAddress={workAddress} />
		{:else if activeTab === 1}
            <EmployeePrivateInfo
                    isEditing={true}
                    bind:fullAddress={homeAddress}
                    bind:email={primaryEmail}
                    bind:homePhoneCC
                    bind:homePhoneCN
                    bind:maritalStatus
                    bind:passportNumber
                    bind:socialSecurityNumber
                    bind:gender
                    bind:birthDate />
		{:else}
            <EmployeeHRInfo />
		{/if}
    </div>
</Container>
