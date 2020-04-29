<script context="module">
  export async function preload(page, session) {
    const { token } = session;

    if (!token) {
      console.log("NO TOKEN");
      return;
    }

    const response = await this.fetch(
      `${process.env.SAPPER_APP_API_URL}/api/generic/v1/entities`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    );

    const result = await response.json();

    if (result.errorMessage) {
      return this.error(response.status, result.errorMessage);
    }

    return { entities: result };
  }
</script>

<script>
  export let entities = [];
</script>

<h1>And here are all of the entities from Ofbiz:</h1>
<ul>
  {#each entities as entity}
    <li>{entity}</li>
  {/each}
</ul>

<svelte:head>
  <title>Sapper project template</title>
</svelte:head>
