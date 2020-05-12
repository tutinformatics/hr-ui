<script>
    import {stores} from '@sapper/app';
    import Department from "./Department.svelte";

    const {session} = stores();

    export let rootId;
    export let rootName;
    export let currentId;
    export let currentName;

    let expanded = false;
    let relations = [];

    /**
     * Load the sub-departments for the department.
     * After the first call all children are stored in memory,
     * so there is no need to make another request.
     */
    async function loadChildren() {
        // Register the department the user clicked on.
        currentId = rootId;
        currentName = rootName;

        expanded = !expanded;
        if (!expanded || relations.length > 0) return;

        const childrenResponse = await fetch("/company/structure", {
            method: "POST",
            body: JSON.stringify({
                toUrl: `${process.env.SAPPER_APP_API_URL}/generic/v1/services/getRelatedParties`,
                data: {
                    partyIdFrom: rootId,
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

        const children = await childrenResponse.json();

        if (children.error) {
            console.error(children.error);
            return;
        }

        const ids = children.relatedPartyIdList[0].relatedPartyIdList;
        // We don't need the id of the root item here.
        ids.splice(ids.indexOf(rootId), 1);

        // Query the actual names of the departments.
        for (const childId of ids) {
            const childName = await getChildName(childId);

            if (childName) {
                addRelation(childId, childName);
            }
        }
    }

    /**
     * Query the name of the department.
     *
     * @param {string} childId - id of the department to query the name for.
     */
    async function getChildName(childId) {
        const nameResponse = await fetch("/company/structure", {
            method: "POST",
            body: JSON.stringify({
                toUrl: `${process.env.SAPPER_APP_API_URL}/generic/v1/entityquery/PartyGroup`,
                data: {
                    inputFields: {
                        partyId: childId
                    },
                    fieldList: ["groupName"]
                }
            }),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${$session.token}`
            }
        });

        const name = await nameResponse.json();

        if (name.error) {
            console.error(name.error);
            return '';
        }

        return name.length > 0 ? name[0].groupName || '' : '';
    }

    /**
     * Add the sub-department to the list.
     *
     * @param {string} childId - id of the sub-department.
     * @param {string} childName - name of the sub-department.
     */
    function addRelation(childId, childName) {
        relations = [...relations, {childId, childName}];
    }
</script>

<style>
    span {
        padding: 0 0 0 1.5em;
        background: url(https://svelte.dev/tutorial/icons/folder.svg) 0 0.1em no-repeat;
        background-size: 1em 1em;
        font-weight: bold;
        cursor: pointer;
    }

    .expanded {
        background-image: url(https://svelte.dev/tutorial/icons/folder-open.svg);
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
</style>

<span class:expanded on:click={async () => await loadChildren()}>{rootName}</span>

<!--Company structure tree view-->
{#if expanded}
    <ul>
		{#each relations as rel}
            <li>
                <svelte:self
                        rootId={rel.childId}
                        rootName={rel.childName}
                        bind:currentId={currentId}
                        bind:currentName={currentName} />
            </li>
		{/each}
    </ul>
{/if}
