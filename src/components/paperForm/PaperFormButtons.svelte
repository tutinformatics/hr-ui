<script>
    import { Container, Row, Col } from "svelte-chota";

    export let forObject;
    export let isEditing = false;
    export let mode;
    export let saved;
</script>

<style>
    .buttons {
        position: fixed;
        width: 100%;
        padding: 2vh 2vw;
        background-color: #007bff;
        min-height: 8vh;
    }

    .object__edit-button {
        background-color: white;
        color: #007bff;
        border: 2px solid white;
        font-weight: 700;
    }

    .object__discard-button {
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
        {#if mode === 'edit'}
            <Col size="1" style="margin: 0">
                <!-- Toggle between the editing modes -->
                <!-- TODO: Implement data saving when in editing mode -->
                <button
                    class="object__edit-button"
                    on:click={() => (isEditing = !isEditing)}>
                    {isEditing ? 'SAVE' : 'EDIT'}
                </button>
            </Col>

            <Col size="1" style="margin: 0">
                {#if isEditing}
                    <button
                        class="object__discard-button"
                        on:click={() => {
                            if (isEditing) window.location.reload();
                        }}>
                        DISCARD
                    </button>
                {:else}
                    <a href={`${forObject}/create`}>
                        <button class="object__discard-button">CREATE</button>
                    </a>
                {/if}
            </Col>
        {:else if mode === 'create'}
            <Col size="1" style="margin: 0">
                <button
                    class="object__edit-button"
                    on:click={() => (saved = true)}>
                    SAVE
                </button>
            </Col>
        {/if}
    </Row>
</div>
