<script>
    import {Input, Field, Card, Row, Col, Button} from 'svelte-chota'
    import { Checkbox } from 'svelte-mui/src';

    export let skillPerson
</script>


<Col size="3">
    <div style="max-width:600px">
        <Card class="other-view-card-body">
            <div slot="header">
                <h4>{skillPerson.partyId}</h4>
            </div>
            <hr/>
            <strong>Skill type: </strong>{skillPerson._toOne_SkillType["description"]}<br/>
            <strong>Skill level: </strong>{skillPerson.skillLevel}<br/>
            <strong>Skill rating: </strong>{skillPerson.rating}<br/>
            <strong>Year experience: </strong>{skillPerson.yearsExperience}<br/>
            <hr/>
            <div slot="footer">
                <Row>
                    <Checkbox><small>Choose</small></Checkbox>
                </Row>
            </div>
        </Card>
    </div>
</Col>