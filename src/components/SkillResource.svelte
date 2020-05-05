<script>
    import {Input, Field, Card, Row, Col, Button} from 'svelte-chota'
    export let skills = [];
</script>

<Card class="text-justify">
    <div slot="header">
        {#if !skills}
        <Row>
            <Col>
                <h4>No skills found</h4>
            </Col>
        </Row>
            {:else}
            {#each skills as skill}
            <hr/>
            <h4>{skill.partyId}</h4>
            <small>Rating: {skill.rating}</small>
            <small>Years exp: {skill.yearsExperience}</small>
            <small>Skill level: {skill.skillLevel}</small>
            <small>Type: {skill._toOne_SkillType["description"]}</small>
                <hr/>
                {/each}
            {/if}
    </div>
</Card>