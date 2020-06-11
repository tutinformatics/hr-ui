<script context="module">
    export async function preload(page, session) {
        const { token } = session;

        if (!token) this.redirect(302, "/login");

        const { id } = page.params;
        const url = `${process.env.SAPPER_APP_API_URL}/generic/v1/entityquery`;

        // Request for personal information like name, gender etc.
        const personalDataBody = {
            inputFields: {
                partyId: id
            },
            fieldList: [
                "firstName",
                "middleName",
                "lastName",
                "gender",
                "birthDate",
                "socialSecurityNumber",
                "passportNumber"
            ],
            entityRelations: {
                _toOne_ResidenceStatusEnumeration: {
                    fieldList: ["description"]
                },
                _toOne_MaritalStatusEnumeration: {
                    fieldList: ["description"]
                }
            }
        };
        // Request for contacts like email, work phone etc.
        const contactDataBody = {
            inputFields: {
                partyId: id
            },
            fieldList: ["contactMechId"],
            entityRelations: {
                _toOne_ContactMech: {
                    fieldList: ["contactMechTypeId", "infoString"],
                    entityRelations: {
                        _toMany_PartyContactMechPurpose: {
                            inputFields: {
                                contactMechPurposeTypeId_fld0_op: "in",
                                contactMechPurposeTypeId_fld0_value: [
                                    "GENERAL_LOCATION",
                                    "PRIMARY_EMAIL",
                                    "WORK_EMAIL",
                                    "PHONE_WORK",
                                    "PHONE_HOME"
                                ]
                            },
                            fieldList: ["contactMechPurposeTypeId"]
                        },
                        _toOne_PostalAddress: {
                            fieldList: [
                                "address1",
                                "houseNumber",
                                "city",
                                "postalCode"
                            ],
                            entityRelations: {
                                _toOne_CountryGeo: {
                                    fieldList: ["geoName"]
                                },
                                _toOne_StateProvinceGeo: {
                                    fieldList: ["geoName"]
                                }
                            }
                        },
                        _toOne_TelecomNumber: {
                            fieldList: ["countryCode", "contactNumber"]
                        }
                    }
                }
            }
        };
        // Request for employment data like who is the employer, its location etc.
        const employmentDataBody = {
            inputFields: {
                partyIdTo: id
            },
            entityRelations: {
                _toOne_FromParty: {
                    fieldList: ["partyId"],
                    entityRelations: {
                        _toOne_PartyGroup: {
                            fieldList: ["groupName"]
                        },
                        _toMany_PartyContactMech: {
                            areRelationResultsMandatory: true,
                            fieldList: ["contactMechId"],
                            entityRelations: {
                                _toMany_PartyContactMechPurpose: {
                                    inputFields: {
                                        contactMechPurposeTypeId_fld0_op:
                                            "equals",
                                        contactMechPurposeTypeId_fld0_value:
                                            "GENERAL_LOCATION"
                                    },
                                    fieldList: ["contactMechPurposeTypeId"]
                                },
                                _toOne_PostalAddress: {
                                    fieldList: [
                                        "address1",
                                        "houseNumber",
                                        "city",
                                        "postalCode"
                                    ],
                                    entityRelations: {
                                        _toOne_CountryGeo: {
                                            fieldList: ["geoName"]
                                        },
                                        _toOne_StateProvinceGeo: {
                                            fieldList: ["geoName"]
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };
        // Request for employee position at the company.
        const positionDataBody = {
            inputFields: {
                partyId: id,
                statusId_fld0_op: "equals",
                statusId_fld0_value: "EMPL_POS_ACTIVE"
            },
            fieldList: ["comments"],
            entityRelations: {
                _toOne_EmplPosition: {
                    inputFields: {
                        statusId_fld0_op: "equals",
                        statusId_fld0_value: "EMPL_POS_ACTIVE"
                    },
                    fieldList: ["emplPositionId", "budgetId"],
                    entityRelations: {
                        _toOne_EmplPositionType: {
                            fieldList: ["emplPositionTypeId", "description"]
                        }
                    }
                }
            }
        };

        /**
         * Fetch the data from the server.
         *
         * @param {string} toUrl - url to make request to.
         * @param {object} data - data to include to the request.
         * @returns {object} with the requested values.
         */
        const fetchData = async (toUrl, data) => {
            const response = await this.fetch(toUrl, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            const result = await response.json();

            // If there was an error, return empty object and log the error message.
            if (!response.ok) {
                console.error(result.errorMessage);
                return {};
            }
            return result.length > 1 ? result : result[0];
        };

        const personalData = await fetchData(url + "/Person", personalDataBody);
        const contactData = await fetchData(
            url + "/PartyContactMech",
            contactDataBody
        );
        const employmentData = await fetchData(
            url + "/Employment",
            employmentDataBody
        );
        const positionData = await fetchData(
            url + "/EmplPositionFulfillment",
            positionDataBody
        );

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

        let countries = countriesResult;
        let states = statesResult;
        if (!countriesResponse.ok) {
            console.error(countriesResult.errorMessage);
            countries = {};
        }
        if (!statesResponse.ok) {
            console.error(statesResult.errorMessage);
            states = {};
        }

        return {
            countries: countries.sort((a, b) =>
                a.countryName.localeCompare(b.countryName)
            ),
            states: states.sort((a, b) => a.geoName.localeCompare(b.geoName)),
            personalData,
            contactData,
            employmentData,
            positionData
        };
    }
</script>

<script>
    import { Container, Row, Col, Tabs, Tab } from "svelte-chota";
    import FaBriefcase from "svelte-icons/fa/FaBriefcase.svelte";
    import FaUserLock from "svelte-icons/fa/FaUserLock.svelte";
    import FaPen from "svelte-icons/fa/FaPen.svelte";
    import EmployeeWorkInfo from "../../components/paperForm/EmployeeWorkInfo.svelte";
    import EmployeePrivateInfo from "../../components/paperForm/EmployeePrivateInfo.svelte";
    import EmployeeHRInfo from "../../components/paperForm/EmployeeHRInfo.svelte";
    import PaperFormButtons from "../../components/paperForm/PaperFormButtons.svelte";

    export let countries = [];
    export let states = [];
    export let personalData = {};
    export let contactData = {};
    export let employmentData = {};
    export let positionData = {};

    let isEditing = false;
    let activeTab = 0;

    /**
     * Extract the correct type of contact from the result.
     *
     * @param {string} contactType - which type of contact info is needed.
     * @return {object}
     */
    function extractContact(contactType) {
        const contactMech =
            Object.values(contactData).find(contact => {
                const { contactMechTypeId } = contact._toOne_ContactMech;
                return contactMechTypeId === contactType;
            }) || {};

        return contactMech._toOne_ContactMech
            ? contactMech._toOne_ContactMech
            : {};
    }

    /**
     * Extract the correct type of phone number.
     *
     * Can be either phone or home number.
     *
     * @param {string} phoneType - which type of phone number is needed.
     * @return {object}
     */
    function extractPhone(phoneType) {
        const contact = extractContact("TELECOM_NUMBER");

        const types = contact._toMany_PartyContactMechPurpose || [];

        if (types.some(type => type.contactMechPurposeTypeId === phoneType)) {
            return contact._toOne_TelecomNumber;
        }
        return {};
    }

    /**
     * Extract the country code and number from the given phone object.
     */
    function extractPhoneChunks(phone) {
        const countryCode = phone.countryCode || "";
        const contactNumber = phone.contactNumber || "";

        return { countryCode, contactNumber };
    }

    /**
     * Construct the full phone with country code and number.
     */
    function constructFullPhone(countryCode, contactNumber) {
        if (countryCode && contactNumber) {
            return `+${countryCode}-${contactNumber}`;
        }
        return contactNumber || "";
    }

    let firstName = personalData.firstName || "";
    let middleName = personalData.middleName || "";
    let lastName = personalData.lastName || "";

    const workPhone = extractPhoneChunks(extractPhone("PHONE_WORK"));
    const homePhone = extractPhoneChunks(extractPhone("PHONE_HOME"));
    let workPhoneCC = workPhone.countryCode;
    let workPhoneCN = workPhone.contactNumber;
    let homePhoneCC = homePhone.countryCode;
    let homePhoneCN = homePhone.contactNumber;

    let email = extractContact("EMAIL_ADDRESS").infoString || "";

    let homeAddress = extractContact("POSTAL_ADDRESS");

    let workLocation = employmentData._toOne_FromParty
        ? employmentData._toOne_FromParty._toOne_PartyGroup.groupName || ""
        : "";

    let position = positionData._toOne_EmplPosition
        ? positionData._toOne_EmplPosition._toOne_EmplPositionType
              .description || ""
        : "";

    $: fullName = `${firstName} ${middleName} ${lastName}`.trim();
    $: fullWorkPhone = constructFullPhone(workPhoneCC, workPhoneCN);
    $: fullHomePhone = constructFullPhone(homePhoneCC, homePhoneCN);
</script>

<style>
    h1 {
        margin: 0;
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
</style>

<svelte:head>
    <link rel="stylesheet" href="paper-form.css" />
</svelte:head>
<PaperFormButtons forObject="employees" bind:isEditing mode="edit" />

<Container class="paper">
    <Row>
        <Col size="5" class="paper-name">
            {#if isEditing}
                <input placeholder="First Name" bind:value={firstName} />
                <input placeholder="Middle Name" bind:value={middleName} />
                <input placeholder="Last Name" bind:value={lastName} />
            {:else}
                <h1>{fullName}</h1>
            {/if}
        </Col>

        <Col class="paper-image">
            <img src="favicon.png" alt="Employee profile image" />
        </Col>
    </Row>

    <div class="paper__main-info">
        <Row>
            <Col size="2" class="paper__main-info-type">Work Phone</Col>
            <Col size="3" class="paper__main-info-value phone">
                {#if isEditing}
                    <input
                        placeholder="372"
                        class="phone__extension"
                        bind:value={workPhoneCC} />
                    <input
                        placeholder="12345678"
                        class="phone__number"
                        bind:value={workPhoneCN} />
                {:else}{fullWorkPhone}{/if}
            </Col>
        </Row>

        <Row>
            <Col size="2" class="paper__main-info-type">Work Email</Col>
            <Col size="3" class="paper__main-info-value">
                {#if isEditing}
                    <input
                        placeholder="test@test.com"
                        type="email"
                        bind:value={email} />
                {:else}{email}{/if}
            </Col>
        </Row>

        <Row>
            <Col size="2" class="paper__main-info-type">Work Location</Col>
            <Col size="3" class="paper__main-info-value">
                {#if isEditing}
                    <input
                        placeholder="Company name"
                        bind:value={workLocation} />
                {:else}{workLocation}{/if}
            </Col>
        </Row>

        <Row>
            <Col size="2" class="paper__main-info-type">Position</Col>
            <Col size="3" class="paper__main-info-value">
                {#if isEditing}
                    <input placeholder="Position" bind:value={position} />
                {:else}{position}{/if}
            </Col>
        </Row>
    </div>

    <!-- Other employee information (work specific, private, HR specific) -->
    <Tabs bind:active={activeTab} full class="paper__tabs">
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
            Private Information
        </Tab>

        <Tab>
            <div class="icon">
                <FaPen />
            </div>
            HR Settings
        </Tab>
    </Tabs>

    <div class="paper__other-info">
        {#if activeTab === 0}
            <EmployeeWorkInfo
                {isEditing}
                {countries}
                {states}
                {employmentData} />
        {:else if activeTab === 1}
            <EmployeePrivateInfo
                {isEditing}
                {countries}
                {states}
                {personalData}
                address={homeAddress}
                bind:fullAddress={homeAddress}
                bind:email
                bind:homePhoneCC
                bind:homePhoneCN
                {fullHomePhone} />
        {:else}
            <EmployeeHRInfo />
        {/if}
    </div>
</Container>
