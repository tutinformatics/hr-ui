<script>
    import { goto, stores } from "@sapper/app";
    import { Container, Card, Button, Input } from "svelte-chota";
    import { mdiSend } from "@mdi/js";

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
                currentPasswordVerify: null,
            }),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });

        const result = await response.json();

        if (result.error) {
            console.error(result.error);
        } else {
            $session.token = result.token;
            localStorage.setItem(
                "tokenExpiresIn",
                JSON.stringify(
                    Date.now() +
                        Number.parseInt(process.env.SAPPER_APP_COOKIE_MAX_AGE)
                )
            );
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
        <h4 slot="header">Ofbiz login</h4>

        <form on:submit|preventDefault={login} method="POST">
            <p>
                <Input
                    bind:value={userLoginId}
                    placeholder="Login"
                    type="text" />
            </p>
            <p>
                <Input
                    bind:value={currentPassword}
                    placeholder="Password"
                    type="password" />
            </p>

            <Button outline primary type="submit" iconRight={mdiSend}>
                Login
            </Button>
        </form>
    </Card>
</Container>
