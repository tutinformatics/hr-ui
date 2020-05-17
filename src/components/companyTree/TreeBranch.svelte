<script>
    import { stores } from "@sapper/app";
    import FaMinus from "svelte-icons/fa/FaMinus.svelte";
    import FaPlus from "svelte-icons/fa/FaPlus.svelte";

    const { session } = stores();

    export let departmentId;
    export let departmentName;
    export let departmentRelations;

    // Find the department from relations list.
    // Makes it easier to updated certain relations in the future.
    let department = departmentRelations.find(dep => dep.id === departmentId);
    // If there is no such department, add it to the list already.
    if (!department) {
        department = { id: departmentId, name: departmentName, deps: [] };
        departmentRelations = [...departmentRelations, department];
    }
    let expanded = false;

    /**
     * Load the sub-departments for the department.
     */
    async function loadRelatedDepartments() {
        const response = await fetch("/company/structure", {
            method: "POST",
            body: JSON.stringify({
                toUrl: `/generic/v1/services/getRelatedParties`,
                data: {
                    partyIdFrom: departmentId,
                    // We need only internal organizations (departments), not people.
                    partyRelationshipTypeId: "GROUP_ROLLUP"
                }
            }),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${$session.token}`
            }
        });
        const result = await response.json();

        let ids;
        if (result.error) {
            console.error(result.error);
            ids = [];
        } else {
            const { relatedPartyIdList } = result;

            if (relatedPartyIdList.length > 0) {
                ids = relatedPartyIdList[0].relatedPartyIdList;
            } else {
                ids = [];
            }
        }

        // We don't need the id of the root item here.
        ids.splice(ids.indexOf(departmentId), 1);

        // Query the details of the departments.
        for (const id of ids) {
            const details = await getDepartmentDetails(id);

            if (details) {
                addRelation(id, details);
            }
        }
    }

    /**
     * Query the details of the department.
     *
     * @param {string} id - id of the department to query the details for.
     * @return {object} - pretty version of department details object coming from the backend.
     */
    async function getDepartmentDetails(id) {
        const response = await fetch("/company/structure", {
            method: "POST",
            body: JSON.stringify({
                toUrl: `/generic/v1/entityquery/PartyGroup`,
                data: {
                    inputFields: {
                        partyId: id
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
                        }
                    }
                }
            }),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${$session.token}`
            }
        });
        const result = await response.json();

        let details;
        if (result.error) {
            console.error(result.error);
            details = [];
        } else {
            details = result;
        }

        return prettifyDetails(details);
    }

    /**
     * Convert the details in a more usable format.
     *
     * @param {array} rawDetails - array of department details as nested objects.
     * @returns {{name: string, location: string}}
     */
    function prettifyDetails(rawDetails) {
        const details = rawDetails[0] || {};

        const contactMech = details._toMany_PartyContactMech
            ? details._toMany_PartyContactMech
            : [];
        const contact = contactMech.length > 0 ? contactMech[0] || {} : {};
        const location = contact._toOne_PostalAddress
            ? details._toOne_PostalAddress.city
            : "";

        return {
            name: details.groupName || "",
            location
        };
    }

    /**
     * Add the sub-department to the list.
     *
     * @param {string} id - id of the sub-department.
     * @param {string} name - name of the department.
     * @param {string} location - the city this department is located at.
     */
    function addRelation(id, { name, location }) {
        const relation = { id, name, location };
        department.deps = [...department.deps, relation];
    }

    /**
     * Show or hide related departments in the tree.
     */
    async function expand() {
        expanded = !expanded;
        if (expanded && department.deps.length === 0) {
            await loadRelatedDepartments();
        }
    }
</script>

<style>
    span {
        padding: 0;
        font-weight: bold;
        cursor: pointer;
    }

    ul {
        padding: 0.2em 0 0 0.5em;
        margin: 0 0 0 0.5em;
        list-style: none;
        border-left: 1px solid #eee;
    }

    li {
        padding: 0.2em 0;
    }

    .icon {
        width: 1.5rem;
        height: 1.5rem;
        display: inline-block;
        color: #a4a4a4;
        vertical-align: text-top;
    }
</style>

<span class:expanded on:click={expand}>
    <div class="icon">
        {#if expanded}
            <FaMinus />
        {:else}
            <FaPlus />
        {/if}
    </div>
    {departmentName}
</span>

<!--Company structure tree view-->
{#if expanded}
    <ul>
        {#each department.deps as dep}
            <li>
                <svelte:self
                    departmentId={dep.id}
                    departmentName={dep.name}
                    bind:departmentRelations />
            </li>
        {/each}
    </ul>
{/if}
