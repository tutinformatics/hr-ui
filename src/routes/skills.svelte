<script context="module">
    export async function preload(page, session) {
        const { token } = session;

        if (!token) return this.redirect(302, '/login');

        const skillBody = {
            "areRelationResultsMandatory": true,
            "fieldList": ["partyId", "rating", "yearsExperience", "skillLevel"],
            "entityRelations": {
                "_toOne_SkillType": {
                    "fieldList": ["description"]
                },
                "_toOne_Party": {
                    "fieldList": ["partyId"],
                    "entityRelations": {
                        "_toMany_PartyRole": {
                            "inputFields": {
                                "roleTypeId_fld0_op": "equals",
                                "roleTypeId_fld0_value": "EMPLOYEE"
                            },
                            "fieldList": ["roleTypeId"]
                        }
                    }
                }
            }
        };
      const skillResponse = await this.fetch(`${process.env.SAPPER_APP_API_URL}/generic/v1/entityquery/PartySkill`, {
            method: "POST",
            body: JSON.stringify(skillBody),
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        });

        const res = await skillResponse.json();
        console.log(token);
        console.log("Res: " + res);


        if (res.errorMessage) {
            console.log(res.errorMessage);
            return;
        }

        return {skills: res}
    }
</script>

<script>
    import EmployeeSkillBoard from "../components/EmployeeSkillBoard.svelte"
    export let skills;
    console.log(skills)
</script>

<EmployeeSkillBoard skills={skills}/>