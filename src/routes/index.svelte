
<style>
	h1, figure {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	figure {
		margin: 0 0 1em 0;
	}

	img {
		width: 100%;
		max-width: 400px;
		margin: 0 0 1em 0;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<script>
	let button_text = 'Hover me';
	let token = "";

	function register() {
		try {
			const res = fetch("https://localhost:8443/api/auth/v1/login", {
				method: 'POST',
				body: JSON.stringify({
					"userLoginId": 'sapper',
					"currentPassword": "sapperofbiz",
					"currentPasswordVerify": null
				}),
				headers: {
					"Content-Type": "application/json; charset=UTF-8"
				}
			}).then(data => data.json()).then(x => token = x.token)
		} catch (e) {
			console.log(e)
		}
	}

	function getEntities() {
		try {
			console.log(token);
			const res = fetch("https://localhost:8443/api/generic/v1/structure/entities/Affiliate", {
				method: "GET",
				headers: {
					"Content-Type": "application/json; charset=UTF-8",
					"Bearer": token
				}
			}).then(data => data.json()).then(x => console.log(x))
		} catch (e) {
			console.log(e)
		}

	}

</script>

<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

<h1>Great success!</h1>

<figure>
	<img alt='Borat' src='great-success.png'>
	<figcaption>HIGH FIVE!</figcaption>
</figure>

<button on:click={register}>
	Login
</button>
<button on:click={getEntities}>
	get entities
</button>
<!--<Button-->
<!--		on:mouseenter={ e => button_text="Don't touch me!" }-->
<!--		on:mouseleave={ e => button_text="Ok, hover me again" }-->
<!--&gt;{button_text}</Button>-->
<!--<Button>Find</Button>-->


