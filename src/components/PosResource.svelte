<script>
    import {Input, Field, Card, Row, Col, Button} from 'svelte-chota'
    export let positions = [];
    console.log(positions)
</script>

<Card class="text-justify">
    <div slot="header">
        {#if !positions}
            <Row>
                <Col>
                    <h4>No positions found</h4>
                </Col>
            </Row>
            {:else}
            {#each positions as pos}
            <hr/>
            <h4>{pos.emplPositionId}</h4>
                <small><strong>Position</strong>: {pos.emplPositionTypeId}</small>
            <p><small><strong>Internal organization</strong>: {pos.partyId}</small></p>
                <hr/>

                {/each}
            {/if}
    </div>
</Card>