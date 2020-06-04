<script context="module">
    export async function preload(page, session) {
        const { token } = session;

        if (!token) return this.redirect(302, "/login");

        const posBody = {
            fieldList: ["emplPositionId", "emplPositionTypeId", "partyId"]
        };

        const posResponse = await this.fetch(
            `${process.env.SAPPER_APP_API_URL}/generic/v1/entityquery/EmplPosition`,
            {
                method: "POST",
                body: JSON.stringify(posBody),
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const result = await posResponse.json();

        if (result.errorMessage) {
            console.log(result.errorMessage);
            return;
        }

        return { positions: result };
    }
</script>

<script>
    import PosResource from "../../components/PosResource.svelte";
    export let positions;
</script>

<PosResource {positions} />
