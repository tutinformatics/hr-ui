<script>
  import { goto, stores } from "@sapper/app";
  import { Container, Card, Button, Input } from 'svelte-chota';
  import { mdiAccountPlus } from '@mdi/js';

  const { session } = stores();

  let userLoginId;
  let currentPassword;

  async function register() {
    if (!userLoginId || !currentPassword) return;

    const response = await fetch("/auth/register", {
      method: "POST",
      body: JSON.stringify({
        userLoginId,
        currentPassword,
        currentPasswordVerify: null
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });

    const result = await response.json();

    if (result.error) {
      console.error(result.error);
    } else {
      $session.token = result.token;
      goto("/");
    }
  }
</script>

<style>
  h4 {
    text-align: center;
  }
</style>

<Container class="auth-form">
  <Card>
    <h4 slot="header">Ofbiz register</h4>

    <form on:submit|preventDefault={register} method="POST">
      <p><Input bind:value={userLoginId} placeholder="Login" type="text" /></p>
      <p><Input bind:value={currentPassword} placeholder="Password" type="password" /></p>

      <Button outline primary type="submit" iconRight={mdiAccountPlus}>Register</Button>
    </form>
  </Card>
</Container>