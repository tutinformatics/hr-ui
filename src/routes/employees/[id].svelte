<script context="module">
  export async function preload(page, session) {
    const { token } = session;

    if (!token) this.redirect(302, "/auth/login");

    const { id } = page.params;
    // LET THE CHAOS BEGIN!!!
    const body = {
      inputFields: {
        partyId: id
      },
      fieldList: ["partyId"],
      entityRelations: {
        _toMany_OwnerFinAccount: {
          inputFields: {
            statusId_fld0_op: "equals",
            statusId_fld0_value: "FNACT_ACTIVE"
          },
          fieldList: ["finAccountTypeId", "finAccountCode"]
        },
        _toMany_ToEmployment: {
          fieldList: ["partyIdFrom"],
          entityRelations: {
            _toOne_FromParty: {
              fieldList: ["partyId"],
              entityRelations: {
                _toOne_PartyGroup: {
                  fieldList: ["groupName"],
                  entityRelations: {
                    _toMany_PartyContactMech: {
                      fieldList: ["contactMechId"],
                      entityRelations: {
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
                            },
                            _toOne_CountyGeo: {
                              fieldList: ["geoName"]
                            },
                            _toOne_MunicipalityGeo: {
                              fieldList: ["geoName"]
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        _toMany_EmplPosition: {
          inputFields: {
            statusId_fld0_op: "equals",
            statusId_fld0_value: "Active"
          },
          entityRelations: {
            _toOne_EmplPositionType: {
              fieldList: ["description"]
            }
          }
        },
        _toOne_Person: {
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
              fieldList: ["decription"]
            },
            _toOne_MaritalStatusEnumeration: {
              fieldList: ["description"]
            }
          }
        },
        _toMany_PartyContactMech: {
          fieldList: ["contactMechId"],
          entityRelations: {
            _toOne_ContactMech: {
              fieldList: ["contactMechTypeId", "infoString"],
              entityRelations: {
                _toMany_PartyContactMechPurpose: {
                  fieldList: ["contactMechPurposeTypeId"]
                },
                _toOne_PostalAddress: {
                  fieldList: ["address1", "houseNumber", "city", "postalCode"],
                  entityRelations: {
                    _toOne_CountryGeo: {
                      fieldList: ["geoName"]
                    },
                    _toOne_StateProvinceGeo: {
                      fieldList: ["geoName"]
                    },
                    _toOne_CountyGeo: {
                      fieldList: ["geoName"]
                    },
                    _toOne_MunicipalityGeo: {
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
        }
      }
    };

    const response = await this.fetch(
      `${process.env.SAPPER_APP_API_URL}/generic/v1/entityquery/Party`,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    );

    const result = await response.json();

    if (result.errorMessage) {
      console.log(result.errorMessage);
      return;
    }

    return { employeeData: result[0] };
  }
</script>

<script>
  import { Container, Row, Col, Tabs, Tab } from "svelte-chota";
  import EmployeeWorkInfo from "../../components/EmployeeWorkInfo.svelte";
  import EmployeePrivateInfo from "../../components/EmployeePrivateInfo.svelte";
  import EmployeeHRInfo from "../../components/EmployeeHRInfo.svelte";

  export let employeeData = {};
  const { id } = employeeData;

  // Main personal information
  const personal = employeeData._toOne_Person;

  let firstName = personal.firstName || "";
  let middleName = personal.middleName || "";
  let lastName = personal.lastName || "";

  // Main contact information.
  const contacts = employeeData._toMany_PartyContactMech;

  let workPhone = {};
  let homePhone = {};
  let workEmail = "";
  let primaryEmail = "";

  for (const c of contacts) {
    const type = c._toOne_ContactMech.contactMechTypeId;
    const subtypes = c._toOne_ContactMech._toMany_PartyContactMechPurpose;
    const subtypeValues = Array.from(subtypes, o => o.contactMechPurposeTypeId);

    if (type === "TELECOM_NUMBER") {
      if (subtypeValues.includes("PHONE_WORK")) {
        workPhone = c._toOne_ContactMech._toOne_TelecomNumber;
      } else if (subtypeValues.includes("PHONE_HOME")) {
        phone = c._toOne_ContactMech._toOne_TelecomNumber;
      }
    } else if (type === "EMAIL_ADDRESS") {
      if (subtypeValues.includes("PRIMARY_EMAIL")) {
        primaryEmail = c._toOne_ContactMech.infoString;
      }
      workEmail = primaryEmail;
      // TODO: Is there a special WORK_EMAIL in ofbiz???
    }
  }

  let workPhoneCountryCode = workPhone ? workPhone.countryCode || "" : "";
  let workPhoneContactNumber = workPhone ? workPhone.contactNumber || "" : "";

  /**
   * Change the country code and main number.
   *
   * @param {string} type - type of the phone (work or home).
   */
  function changePhone(event, type) {
    const phone = event.target.value;

    if (!/\+[0-9]{1,3}-[0-9]{3,}-[0-9]{4,}|[0-9]{3,}-[0-9]{4,}/.test(phone))
      return;

    const chunks = phone.split(/-/g);
    if (chunks.length === 3) {
      if (type === "work") {
        workPhoneCountryCode = chunks[0];
        workPhoneContactNumber = `${chunks[1]}-${chunks[2]}`;
      } else {
      }
    } else {
      if (type === "work") {
        workPhoneCountryCode = "";
        workPhoneContactNumber = `${chunks[0]}-${chunks[1]}`;
      } else {
      }
    }
  }

  // Main employment information.
  const employment = employeeData._toMany_ToEmployment;

  // Composite values that change whenever initial values change.
  $: fullName = `${firstName} ${middleName} ${lastName}`;

  let fullWorkPhone;
  $: if (workPhoneCountryCode && workPhoneContactNumber) {
    fullWorkPhone = `${workPhoneCountryCode} ${workPhoneContactNumber}`;
  } else {
    fullWorkPhone = workPhoneContactNumber || "";
  }

  let active_tab = 0;
  let isEditing = false;
</script>

<style>
  h1 {
    margin: 0;
  }

  .employee__edit-button {
    background-color: #007bff;
    color: white;
    font-weight: 500;
  }
  .employee__discard-button {
    color: #007bff;
    background-color: white;
    font-weight: 500;
  }
  button:focus {
    border: none;
    outline: none;
    box-shadow: none;
  }

  input {
    margin-bottom: 1vh;
  }
</style>

<Container class="employee">
  <!-- Buttons to edit employee, create a new employee, discard/save changes -->
  <Row>
    <Col size="1">
      <!-- Toggle between the editing mode -->
      <!-- TODO: Implement data saving -->
      <button
        class="employee__edit-button"
        on:click={() => (isEditing = !isEditing)}>
        {isEditing ? 'SAVE' : 'EDIT'}
      </button>
    </Col>

    <Col size="1">
      <!-- Discard the changes or create a new employee -->
      <button
        class="employee__discard-button"
        on:click={() => {
          if (isEditing) window.location.reload();
          return;
        }}>
        {isEditing ? 'DISCARD' : 'CREATE'}
      </button>
    </Col>
  </Row>

  <!-- The most important information (work phone, department, email etc) -->
  <Row class="employee__name-and-image">
    <Col size="5" class="employee-name">
      {#if isEditing}
        <input placeholder="Firstname" bind:value={firstName} />
        <input placeholder="Middle name" bind:value={middleName} />
        <input placeholder="Lastname" bind:value={lastName} />
      {:else}
        <h1>{fullName}</h1>
      {/if}
    </Col>

    <Col class="employee-image">
      <img src="favicon.png" alt="Placeholder" />
    </Col>
  </Row>

  <div class="employee_main-info">
    <Row>
      <Col size="2" class="employee__main-info-type">Work Phone</Col>
      <Col size="3" class="employee__main-info-value">
        {#if isEditing}
          <input
            placeholder="000"
            type="tel"
            value={fullWorkPhone}
            on:change={event => changePhone(event, 'work')}
            pattern={'\\+[0-9]{1,3}-[0-9]{3,}-[0-9]{5,}|[0-9]{3,}-[0-9]{5,}'} />
        {:else}{fullWorkPhone}{/if}
      </Col>
    </Row>

    <Row>
      <Col size="2" class="employee__main-info-type">Work Email</Col>
      <Col size="3" class="employee__main-info-value">
        {#if isEditing}
          <input placeholder="Email" type="email" bind:value={workEmail} />
        {:else}{workEmail}{/if}
      </Col>
    </Row>
    <!--
        <Row>
            <Col size="2" class="employee__main-info-type">Work Location</Col>
            <Col size="2" class="employee__main-info-value">
            {`${employmentAddress.address1}, ${employmentAddress.houseNumber}, ${employmentAddress.postalCode},
            ${employmentAddress.city}, ${employmentAddress._toOne_StateProvinceGeo.geoName},
            ${employmentAddress._toOne_CountryGeo.geoName}`}
            </Col>
        </Row>
        <Row>
            <Col size="2" class="employee__main-info-type">Department</Col>
            <Col size="2" class="employee__main-info-value">
            </Col>
        </Row>
        <Row>
            <Col size="2" class="employee__main-info-type">Job Position</Col>
            <Col size="2" class="employee__main-info-value">
            </Col>
        </Row>
        <Row>
            <Col size="2" class="employee__main-info-type">Manager</Col>
            <Col size="2" class="employee__main-info-value">
            </Col>
        </Row> -->
  </div>

  <!-- Main employee information (work info, private info, HR info) -->
  <Tabs bind:active={active_tab} full class="employee__tabs">
    <Tab>Work Information</Tab>
    <Tab>Private Information</Tab>
    <Tab>HR Settings</Tab>
  </Tabs>

  <div class="employee__other-info">
    {#if active_tab === 0}
      <EmployeeWorkInfo />
    {:else if active_tab === 1}
      <EmployeePrivateInfo />
    {:else}
      <EmployeeHRInfo />
    {/if}
  </div>
</Container>
