<script context="module">
    export async function preload(page, session) {
        const { token } = session;
        const headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        };

        if (!token) this.redirect(302, "/login");

        // Query ALL departments from the company.
        const allDepsResponse = await this.fetch(
            `${process.env.SAPPER_APP_API_URL}/generic/v1/services/getRelatedParties`,
            {
                method: "POST",
                body: JSON.stringify({
                    // TODO: Hardcoded this for now.
                    partyIdFrom: "Company",
                    partyRelationshipTypeId: "GROUP_ROLLUP",
                    roleTypeIdTo: "_NA_",
                    roleTypeIdFrom: "_NA_",
                    recurse: "Y"
                }),
                headers
            }
        );
        const allDepsResult = await allDepsResponse.json();

        let departmentIds;
        if (allDepsResult.errorMessage) {
            console.error(allDepsResult.errorMessage);
            departmentIds = [];
        } else {
            const { relatedPartyIdList } = allDepsResult;

            if (relatedPartyIdList.length > 0) {
                departmentIds = relatedPartyIdList[0].relatedPartyIdList;
            } else {
                departmentIds = [];
            }
        }

        // Next query some details for each department.
        let allDepartments = [];
        for (const depId of departmentIds) {
            const depDetailsResponse = await this.fetch(
                `${process.env.SAPPER_APP_API_URL}/generic/v1/entityquery/PartyGroup`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        inputFields: {
                            partyId: depId
                        },
                        fieldList: ["groupName"],
                        entityRelations: {
                            _toMany_PartyContactMech: {
                                fieldList: ["contactMechId"],
                                entityRelations: {
                                    _toOne_PostalAddress: {
                                        fieldList: ["city"]
                                    }
                                }
                            },
                            _toOne_Party: {
                                fieldList: ["partyId"],
                                entityRelations: {
                                    _toMany_EmplPosition: {
                                        inputFields: {
                                            statusId_fld0_op: "equals",
                                            statusId_fld0_value:
                                                "EMPL_POS_ACTIVE"
                                        },
                                        fieldList: ["emplPositionId"],
                                        entityRelations: {
                                            _toOne_EmplPositionType: {
                                                fieldList: [
                                                    "emplPositionTypeId",
                                                    "description"
                                                ]
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }),
                    headers
                }
            );
            const depDetailsResult = await depDetailsResponse.json();

            let details;
            if (depDetailsResult.error) {
                console.error(depDetailsResult.error);
                details = {};
            } else {
                details = depDetailsResult[0] || {};
            }

            // Location of the department to distinguish them.
            const contactMech = details._toMany_PartyContactMech
                ? details._toMany_PartyContactMech
                : [];
            const contact = contactMech.length > 0 ? contactMech[0] || {} : {};
            const location = contact._toOne_PostalAddress
                ? contact._toOne_PostalAddress.city
                : "";

            // All available positions at this department.
            const positions = details._toOne_Party._toMany_EmplPosition;
            const prettyPositions = positions.map(pos => {
                return {
                    id: pos.emplPositionId,
                    name: pos._toOne_EmplPositionType.description
                };
            });

            const department = {
                id: depId,
                name: details.groupName || "",
                location,
                positions: prettyPositions
            };
            allDepartments.push(department);
        }

        // Here we loop over all department ids again in order ot
        // register the relations between them, since the initial
        // query for getRelatedParties returns flat list with values.
        let departmentRelations = {};
        for (const depId of departmentIds) {
            const relatedDepsResponse = await this.fetch(
                `${process.env.SAPPER_APP_API_URL}/generic/v1/services/getRelatedParties`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        partyIdFrom: depId,
                        partyRelationshipTypeId: "GROUP_ROLLUP",
                        roleTypeIdTo: "_NA_"
                    }),
                    headers
                }
            );
            const relatedDepsResult = await relatedDepsResponse.json();

            let relatedDepIds;
            if (relatedDepsResult.errorMessage) {
                console.error(relatedDepsResult.errorMessage);
                relatedDepIds = [];
            } else {
                const { relatedPartyIdList } = relatedDepsResult;

                if (relatedPartyIdList.length > 0) {
                    relatedDepIds = relatedPartyIdList[0].relatedPartyIdList;
                } else {
                    relatedDepIds = [];
                }
            }

            relatedDepIds.splice(relatedDepIds.indexOf(depId), 1);
            departmentRelations[depId] = allDepartments.filter(dep =>
                relatedDepIds.includes(dep.id)
            );
        }

        return { allDepartments, departmentRelations };
    }
</script>

<script>
    import { Container, Row, Col } from "svelte-chota";
    import TreeBranch from "../../components/companyTree/TreeBranch.svelte";
    import DepartmentTable from "../../components/companyTree/DepartmentTable.svelte";
    import PositionsTable from "../../components/companyTree/PositionsTable.svelte";
    import EmployeesTable from "../../components/companyTree/EmployeesTable.svelte";

    export let allDepartments;
    export let departmentRelations;

    // These are the values of the company, the root for all other departments.
    const { id, name } = allDepartments[0];

    let activeDepartments = [{ id, level: 0 }];
</script>

<svelte:head>
    <link rel="stylesheet" href="company-structure.css" />
</svelte:head>

<Row class="company-structure">
    <Col size="4">
        <TreeBranch
            {allDepartments}
            {departmentRelations}
            departmentId={id}
            departmentName={name}
            bind:activeDepartments
            level={0} />
    </Col>

    <Col>
        <DepartmentTable {departmentRelations} bind:activeDepartments />
        <PositionsTable {allDepartments} bind:activeDepartments />
        <EmployeesTable bind:activeDepartments />
    </Col>
</Row>
