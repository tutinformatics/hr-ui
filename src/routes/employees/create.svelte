<script context="module">
    export async function preload(page, session) {
        const { token } = session;
        const url = `${process.env.SAPPER_APP_API_URL}/generic/v1/entityquery`;

        if (!token) this.redirect(302, "/login");

        const organizationsResponse = await this.fetch(`${url}/PartyGroup`, {
            method: "POST",
            body: JSON.stringify({
                areRelationResultsMandatory: true,
                fieldList: ["partyId", "groupName"],
                entityRelations: {
                    _toOne_Party: {
                        areRelationResultsMandatory: true,
                        fieldList: ["partyId"],
                        entityRelations: {
                            _toMany_PartyRole: {
                                inputFields: {
                                    roleTypeId_fld0_op: "equals",
                                    roleTypeId_fld0_value:
                                        "INTERNAL_ORGANIZATIO"
                                }
                            }
                        }
                    }
                }
            }),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        const organizationsResult = await organizationsResponse.json();

        const countriesResponse = await this.fetch(`${url}/CountryCode`, {
            method: "POST",
            body: JSON.stringify({
                fieldList: ["countryCode", "countryAbbr", "countryName"],
                entityRelations: {
                    _toOne_CountryTeleCode: {
                        fieldList: ["teleCode"]
                    }
                }
            }),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        const countriesResult = await countriesResponse.json();

        const statesResponse = await this.fetch(`${url}/Geo`, {
            method: "POST",
            body: JSON.stringify({
                inputFields: {
                    geoTypeId_fld0_op: "in",
                    geoTypeId_fld0_value: ["STATE", "PROVINCE", "COUNTY"]
                },
                fieldList: ["geoId", "geoName", "geoCode"]
            }),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        const statesResult = await statesResponse.json();

        let organizations = organizationsResult;
        let countries = countriesResult;
        let states = statesResult;
        if (!organizationsResponse.ok) {
            console.error(organizationsResult.errorMessage);
            organizations = {};
        }
        if (!countriesResponse.ok) {
            console.error(countriesResult.errorMessage);
            countries = {};
        }
        if (!statesResponse.ok) {
            console.error(statesResult.errorMessage);
            states = {};
        }

        return {
            organizations,
            countries: countries.sort((a, b) =>
                a.countryName.localeCompare(b.countryName)
            ),
            states: states.sort((a, b) => a.geoName.localeCompare(b.geoName))
        };
    }
</script>

<script>
    import { stores } from "@sapper/app";
    import { Container, Row, Col, Tabs, Tab, Modal, Card } from "svelte-chota";
    import FaBriefcase from "svelte-icons/fa/FaBriefcase.svelte";
    import FaUserLock from "svelte-icons/fa/FaUserLock.svelte";
    import FaPen from "svelte-icons/fa/FaPen.svelte";
    import EmployeeWorkInfo from "../../components/paperForm/EmployeeWorkInfo.svelte";
    import EmployeePrivateInfo from "../../components/paperForm/EmployeePrivateInfo.svelte";
    import EmployeeHRInfo from "../../components/paperForm/EmployeeHRInfo.svelte";
    import PaperFormButtons from "../../components/paperForm/PaperFormButtons.svelte";

    const { session } = stores();

    export let organizations = [];
    export let countries = [];
    export let states = [];

    let activeTab = 0;

    let firstName = "";
    let middleName = "";
    let lastName = "";

    let workPhoneCC = "";
    let workPhoneCN = "";
    let homePhoneCC = "";
    let homePhoneCN = "";

    let workEmail = "";
    let primaryEmail = "";

    let workLocation = "";
    let homeAddress = {};

    let maritalStatus = "";

    let socialSecurityNumber = "";
    let passportNumber = "";
    let gender = "";
    let birthDate = "";

    let open = false;
    let saved = false;

    /**
     * Save the employee to the server.
     */
    async function createEmployee() {
        const {
            street,
            houseNumber,
            city,
            postalCode,
            stateProvince,
            country
        } = homeAddress;

        console.log(
            firstName,
            lastName,
            workLocation,
            street,
            houseNumber,
            city,
            postalCode,
            stateProvince,
            country,
            homePhoneCN
        );
        if (
            firstName.trim().length === 0 ||
            lastName.trim().length === 0 ||
            workLocation.trim().length === 0 ||
            street.trim().length === 0 ||
            houseNumber.trim().length === 0 ||
            city.trim().length === 0 ||
            postalCode.trim().length === 0 ||
            country === "" ||
            country === {} ||
            homePhoneCN.trim().length === 0
        ) {
            open = true;
            return;
        }

        const data = {
            firstName,
            middleName,
            lastName,
            partyIdFrom: workLocation,
            address1: `${houseNumber} ${street}`,
            city,
            postalCode,
            stateProvinceGeoId: stateProvince.geoId,
            // countryCode: country.countryCode,
            postalAddContactMechPurpTypeId: "PRIMARY_LOCATION",
            countryCode: homePhoneCC,
            contactNumber: homePhoneCN,
            maritalStatusEnumId: maritalStatus.toUpperCase(),
            socialSecurityNumber,
            passportNumber,
            gender,
            birthDate: Date.parse(birthDate)
        };
        console.log(data);

        const response = await fetch("/employees/services", {
            method: "POST",
            body: JSON.stringify({
                toUrl: "/generic/v1/services/createEmployee",
                data
            }),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${$session.token}`
            }
        });
        const result = await response.json();
        console.log(result);
    }

    $: if (saved) {
        saved = false;
        createEmployee();
    }
    $: if (homeAddress.country) {
        homePhoneCC = homeAddress.country._toOne_CountryTeleCode.teleCode;
    } else {
        homePhoneCC = "";
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

    .phone__extension {
        max-width: 50px;
        text-align: center;
        margin-right: 1vw;
    }

    .required {
        color: red;
        margin-left: 5px;
    }

    .input-field {
        display: flex;
    }

    .error-header {
        font-weight: 500;
    }

    .error-button {
        background-color: #007bff;
        color: white;
    }

    .error-button:focus {
        border: 2px solid white;
        outline: none;
        box-shadow: none;
    }
</style>

<svelte:head>
    <link rel="stylesheet" href="paper-form.css" />
</svelte:head>

<Modal bind:open>
    <Card>
        <h4 slot="header" class="error-header">
            Please fill out all required fields
        </h4>

        <p>The required fields are marked with red asterisk (*).</p>

        <div slot="footer" class="is-right">
            <button class="error-button" on:click={() => (open = false)}>
                Close
            </button>
        </div>
    </Card>
</Modal>

<PaperFormButtons
    forObject="employees"
    isEditing={true}
    mode="create"
    bind:saved />

<Container class="paper">
    <Row>
        <Col size="5" class="paper-name">
            <div class="input-field">
                <input placeholder="First Name" bind:value={firstName} />
                <span class="required">*</span>
            </div>
            <div class="input-field">
                <input placeholder="Middle Name" bind:value={middleName} />
            </div>
            <div class="input-field">
                <input placeholder="Last Name" bind:value={lastName} />
                <span class="required">*</span>
            </div>
        </Col>

        <Col size="3" />

        <Col class="paper-image">
            <input type="file" class="profile-image" />
        </Col>
    </Row>

    <div class="paper__main-info">
        <Row>
            <Col size="2" class="paper__main-info-type">Work Phone</Col>
            <Col
                size="3"
                class="paper__main-info-value phone"
                style="display: flex">
                <input
                    placeholder="372"
                    class="phone__extension"
                    bind:value={workPhoneCC} />
                <input
                    placeholder="12345678"
                    class="phone__number"
                    bind:value={workPhoneCN} />
            </Col>
        </Row>

        <Row>
            <Col size="2" class="paper__main-info-type">Work Email</Col>
            <Col size="3" class="paper__main-info-value">
                <input
                    placeholder="test@test.com"
                    type="email"
                    bind:value={workEmail} />
            </Col>
        </Row>

        <Row>
            <Col size="2" class="paper__main-info-type">Work Location</Col>
            <Col size="3" class="paper__main-info-value">
                <div class="input-field">
                    <select bind:value={workLocation}>
                        <option value="" />
                        {#each organizations as org}
                            <option value={org.partyId}>{org.groupName}</option>
                        {/each}
                    </select>
                    <span class="required">*</span>
                </div>
            </Col>
        </Row>
    </div>

    <div class="paper__other-info">
        <EmployeePrivateInfo
            isEditing={true}
            {countries}
            {states}
            bind:fullAddress={homeAddress}
            bind:email={primaryEmail}
            bind:homePhoneCC
            bind:homePhoneCN
            bind:maritalStatus
            bind:passportNumber
            bind:socialSecurityNumber
            bind:gender
            bind:birthDate />
    </div>
</Container>
