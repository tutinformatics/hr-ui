<script>
	import {Container, Row, Col} from 'svelte-chota';

	export let isEditing = false;
	export let showEdit = true;
	export let showCreate = true;
</script>

<style>
	.buttons {
		position: fixed;
		width: 100%;
        padding: 2vh 2vw;
		background-color: #007bff;
		min-height: 8vh;
    }

    .employee__edit-button {
        background-color: white;
        color: #007bff;
        border: 2px solid white;
        font-weight: 700;
    }

    .employee__discard-button {
        color: white;
        background-color: #007bff;
	    border: 2px solid white;
        font-weight: 700;
    }

	button:focus {
        border: 2px solid white;
        outline: none;
        box-shadow: none;
	}
</style>

<div class="buttons">
	<Row>
		{#if showEdit}
		    <Col size="1" style="margin: 0">
		        <!-- Toggle between the editing modes -->
		        <!-- TODO: Implement data saving when in editing mode -->
		        <button class="employee__edit-button" on:click={() => (isEditing = !isEditing)}>
					{isEditing ? 'SAVE' : 'EDIT'}
		        </button>
		    </Col>
		{/if}

		{#if showCreate}
	        <Col size="1" style="margin: 0;">
		        {#if isEditing}
		            <button class="employee__discard-button"
		                    on:click="{() => { if (isEditing) window.location.reload(); }}">
						DISCARD
		            </button>
		        {:else}
		            <a href="/employees/create">
                        <button class="employee__discard-button">
                            CREATE
                        </button>
		            </a>
		        {/if}
	        </Col>
		{/if}
	</Row>
</div>
