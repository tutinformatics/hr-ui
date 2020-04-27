<script context="module">
  export async function preload(page, session) {
    const { token } = session;

    if (!token) return;

    const response = await this.fetch(
      "https://localhost:8443/api/generic/v1/entities",
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
    console.log(result);

    if (result.errorMessage) {
      return this.error(response.status, result.errorMessage);
    }

    return { entities: result };
  }
</script>

<script>
  export let entities = [];

  //   let getEntitiesButton = false;
  //   let token = "";
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

<!-- <h1>Great success!</h1>

<figure>
  <img alt="Borat" src="great-success.png" />
  <figcaption>HIGH FIVE!</figcaption>
  <button on:click={login}>Login</button>
  {#if getEntitiesButton}
    <button on:click={getEntities}>get entities</button>
  {/if}
</figure> -->

<!--<Button-->
<!--		on:mouseenter={ e => button_text="Don't touch me!" }-->
<!--		on:mouseleave={ e => button_text="Ok, hover me again" }-->
<!--&gt;{button_text}</Button>-->
<!--<Button>Find</Button>-->
