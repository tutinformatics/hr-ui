<script>
    import { Row, Col } from "svelte-chota";
    import Datepicker from "./SvelteCalendar/Datepicker.svelte";
    import AddressInput from "./AddressInput.svelte";

    export let isEditing = false;
    export let personalData = {};
    export let financialData = {};
    export let address = {};
    export let fullAddress = "";
    export let email = "";
    export let homePhoneCC = "";
    export let homePhoneCN = "";
    export let fullHomePhone = "";

    export let maritalStatus = personalData._toOne_MaritalStatusEnumeration
            ? personalData._toOne_MaritalStatusEnumeration.description || ""
            : "";
    export let passportNumber = personalData.passportNumber || "";
    export let socialSecurityNumber = personalData.socialSecurityNumber || "";
    export let gender = personalData.gender || "";
    export let birthDate = personalData.birthDate || "";

    const currentDate = new Date();
    const calendarStartDate = new Date(currentDate.getFullYear() - 90, 1, 1);
    const calendarEndDate = new Date(currentDate.getFullYear() - 10, 12, 31);
</script>

<style>
    h3 {
        margin-top: 4vh;
        font-weight: 600;
    }

    input {
        margin-bottom: 1vh;
    }

    .phone__extension {
        max-width: 50px;
        text-align: center;
        margin-right: 1vw;
    }
</style>

<Row>
    <Col>
        <!-- Employee contacts -->
        <h3>Contact</h3>
        <AddressInput {isEditing} address={address._toOne_PostalAddress} bind:fullAddress />

        <Row>
            <Col size="2" class="employee__main-info-type">Email</Col>
            <Col size="3" class="employee__main-info-value">
				{#if isEditing}
                    <input placeholder="test@test.com" type="email" bind:value={email} />
				{:else}{email}{/if}
            </Col>
        </Row>

        <Row>
            <Col size="2" class="employee__main-info-type">Phone</Col>
            <Col size="3" class="employee__main-info-value phone">
				{#if isEditing}
                    <input placeholder="372" class="phone__extension" bind:value={homePhoneCC} />
                    <input placeholder="12345678" class="phone__number" bind:value={homePhoneCN} />
				{:else}{fullHomePhone}{/if}
            </Col>
        </Row>

        <!-- Marital status of the employee -->
        <h3>Marital Status</h3>
        <Row>
            <Col size="2" class="employee__other-info-type">Marital Status</Col>
            <Col size="3" class="employee__other-info-value">
				{#if isEditing}
                    <select bind:value={maritalStatus}>
                        <option />
                        <option>Single</option>
                        <option>Married</option>
                    </select>
				{:else}{maritalStatus}{/if}
            </Col>
        </Row>

        <!-- Citizenship information -->
        <h3>Citizenship</h3>
        <Row>
            <Col size="2" class="employee__other-info-type">
                Identification Number
            </Col>
            <Col size="3" class="employee__other-info-value">
				{#if isEditing}
                    <input
                            placeholder="Identification number"
                            bind:value={socialSecurityNumber} />
				{:else}{socialSecurityNumber}{/if}
            </Col>
        </Row>

        <Row>
            <Col size="2" class="employee__other-info-type">Passport Number</Col>
            <Col size="3" class="employee__other-info-value">
				{#if isEditing}
                    <input placeholder="Passport number" bind:value={passportNumber} />
				{:else}{passportNumber}{/if}
            </Col>
        </Row>

        <Row>
            <Col size="2" class="employee__other-info-type">Gender</Col>
            <Col size="3" class="employee__other-info-value">
				{#if isEditing}
                    <select bind:value={gender}>
                        <option />
                        <option>Male</option>
                        <option>Female</option>
                    </select>
				{:else}{gender}{/if}
            </Col>
        </Row>

        <Row>
            <Col size="2" class="employee__other-info-type">Date of Birth</Col>
            <Col size="3" class="employee__other-info-value">
				{#if isEditing}
                <!-- TODO: Currnently when no date is present the datepicker shows todays date as selected -->
                    <Datepicker
                            format={'#{Y}-#{m}-#{d}'}
                            bind:formattedSelected={birthDate}
                            start={calendarStartDate}
                            end={calendarEndDate}
                            selected={birthDate ? new Date(birthDate) : calendarEndDate}
                            dayHighlightedBackgroundColor="#007bff"
                            dayHighlightedTextColor="#fff"
                            highlightColor="#007bff">
                        <input bind:value={birthDate} placeholder="YYYY-MM-DD" />
                    </Datepicker>
				{:else}{birthDate}{/if}
            </Col>
        </Row>
    </Col>
</Row>
