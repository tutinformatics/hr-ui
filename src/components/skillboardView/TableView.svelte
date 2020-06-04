<script>
    import {Input, Field, Card, Row, Col, Button, Tag} from 'svelte-chota'
    import { Checkbox, Menu, Menuitem, Icon, Datefield, Sidepanel, Textfield} from 'svelte-mui/src';

    export let skillPerson = [];
    console.log(skillPerson)
</script>

<Row class="employeeCard__body">
    <Col size="1">
        <Checkbox>
        </Checkbox>
    </Col>
    <Col>
        <h4>{skillPerson.partyId}</h4>
    </Col>
    <Col>
        <h4>{skillPerson._toOne_SkillType["description"]}</h4>
    </Col>
    <Col>
        <h4>{skillPerson.skillLevel}</h4>
    </Col>
    <Col>
        <h4>{skillPerson.rating}</h4>
    </Col>
    <Col>
        <h4>{skillPerson.yearsExperience}</h4>
    </Col>
</Row>