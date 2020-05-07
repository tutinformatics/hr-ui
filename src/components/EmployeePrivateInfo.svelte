<script>
  import { Row, Col } from "svelte-chota";
  import Datepicker from "./SvelteCalendar/Datepicker.svelte";
  import AddressInput from "./AddressInput.svelte";

  export let isEditing = false;
  export let personalData = {};
  export let financialData = {};
  export let homeAddress = {};
  export let email = "";
  export let homePhoneCC = "";
  export let homePhoneCN = "";
  export let fullHomePhone = "";

  let maritalStatus = personalData._toOne_MaritalStatusEnumeration
    ? personalData._toOne_MaritalStatusEnumeration.description || ""
    : "";
  let passportNumber = personalData.passportNumber || "";
  let socialSecurityNumber = personalData.socialSecurityNumber || "";
  let gender = personalData.gender || "";
  let birthDate = personalData.birthDate || "";
</script>

<style>
  h3 {
    margin-top: 4vh;
    font-weight: 600;
  }

  input {
    margin-bottom: 1vh;
  }
</style>

<Row>
  <Col>
    <!-- Employee contacts -->
    <h3>Contact</h3>
    <AddressInput {isEditing} address={homeAddress._toOne_PostalAddress} />

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
      <Col size="3" class="employee__main-info-value">
        {#if isEditing}
          <input placeholder="372" bind:value={homePhoneCC} />
          <input placeholder="12345678" bind:value={homePhoneCN} />
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
            selected={birthDate ? new Date(birthDate) : new Date()}
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
