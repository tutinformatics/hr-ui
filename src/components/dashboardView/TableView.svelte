<script>
    import { Input, Field, Card, Row, Col, Button, Tag } from "svelte-chota";
    import {
        Checkbox,
        Menu,
        Menuitem,
        Icon,
        Datefield,
        Sidepanel,
        Textfield
    } from "svelte-mui/src";

    export let worker;
    let value = "";
    let colors = ["coral", "goldenrod", "limegreen"];
    let favorite = ["coral", "goldenrod"];

    $: checked = favorite.length === colors.length;

    function onAll(e) {
        let on = e.target.checked;
    }
</script>

<a href={`/employees/${worker.partyId}`}>
    <Row class="employeeCard__body">
        <Col size="1">
            <Checkbox on:change={onAll} {checked} />
        </Col>
        <Col>
            <h4>{worker.partyId}</h4>
        </Col>
        <Col>
            <h4>Ofbiz</h4>
        </Col>
        <Col>
            <h4>ofbizl@sapper.svelte</h4>
        </Col>
        <Col>
            <h4>+37256938555</h4>
        </Col>
    </Row>
</a>
<hr />
