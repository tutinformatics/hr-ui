<script context="module">
    export async function preload(page, session) {
        const { token } = session;

        if (!token) return this.redirect(302, '/login');

        // Parameters for findParty service in Ofbiz.
        // We look for people with role EMPLOYEE and who is a PERSON.
        const body = {
            roleTypeId: "EMPLOYEE",
            partyTypeId: "PERSON",
            lookupFlag: "Y"
        };

        const response = await this.fetch(`${process.env.SAPPER_APP_API_URL}/generic/v1/services/findParty`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        });

        const result = await response.json();

        if (result.errorMessage) {
            console.log(result.errorMessage);
            return;
        }

        return {employees: result.partyList};
    }
</script>

<script>
    import EmployeesDashboard from '../../components/EmployeesDashboard.svelte'
    export let employees
</script>

<EmployeesDashboard workers={employees}/>
