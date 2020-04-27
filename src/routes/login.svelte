<!-- <script>
  import { goto, stores } from "@sapper/app";

  const { session } = stores();

  let userLoginId;
  let currentPassword;

  async function login() {
    if (!userLoginId || !currentPassword) return;

    const response = await fetch("/auth/login", {
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
      console.log(result.error);
    } else {
      $session.token = result.token;
      goto("/");
    }
  }
</script><form on:submit|preventDefault={login} method="POST">
  <input bind:value={userLoginId} placeholder="Login" type="text" />
  <input bind:value={currentPassword} placeholder="Password" type="password" />

  <button type="submit">Login</button>
</form> -->
