<script context="module">
    export async function preload(page, session) {
        const { token } = session;

        if (!token) return this.redirect(302, '/login');


        const folderBody = {
            "areRelationResultsMandatory": true,
            "inputFields": {
                "partyId": ["MARKETING", "ACCOUNTING", "SALES", "DEV", "TESTING", "accountant_group", "DemoLeadOwnersGroup"]
            },
            "fieldList": ["groupName"]
        };

        const folderResponse = await this.fetch(`${process.env.SAPPER_APP_API_URL}/generic/v1/entityquery/PartyGroup`, {
            method: "POST",
            body: JSON.stringify(folderBody),
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        });

        const res = await folderResponse.json();

        if (res.errorMessage) {
            console.log(res.errorMessage);
            return;
        }

        return {folders: res}

    }
</script>

<script>
    import FolderMain from "../components/FolderMain.svelte"


    export let folders;
    let root = [];

    for (var i = 0; i < folders.length; i++) {
        if (folders[i]['groupName'] == 'Accounting department') {
            root.push({
                type: 'folder',
                name: folders[i]['groupName'],
                files: [
                    {
                        type: "file", name: "Bussines Analyst [DemoEmployee].md"
                    }
                ]
            })
        } else if(folders[i]['groupName'] == 'Development department') {
            root.push({
                type: 'folder',
                name: folders[i]['groupName'],
                files: [
                    {
                        type: 'folder',
                        name: 'Development Team 1',
                        files: [
                            {
                                type: 'folder',
                                name: 'Developer1'
                            },
                            {
                                type: 'folder',
                                name: 'Developer2'
                            },
                            {
                                type: 'folder',
                                name: 'Developer3'
                            }
                        ]
                    },
                    {
                        type: 'folder',
                        name: 'Development Team 2'
                    },
                    {
                        type: 'folder',
                        name: 'Development Team 3'
                    },
                    {
                        type: 'folder',
                        name: 'Development Team 4'
                    }
                ]
            })
        } else {
            root.push({
                type: 'folder',
                name: folders[i],
                files: [
                    {
                        type: "file", name: "Bulka.md"
                    }
                ]
            })
        }

    }


    console.log(root)

</script>

<FolderMain name="Your Company" files={root} expanded/>