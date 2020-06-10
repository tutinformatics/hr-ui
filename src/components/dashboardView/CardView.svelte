<script>
    import { Input, Field, Card, Row, Col, Button } from "svelte-chota";
    import { Checkbox } from "svelte-mui/src";
    export let worker;

    let colors = ["coral", "goldenrod", "limegreen"];
    let favorite = ["coral", "goldenrod"];
    $: checked = favorite.length === colors.length;

    function onAll(e) {
        let on = e.target.checked;
    }
</script>

<Col size="3">
    <div style="max-width:600px">
        <Card class="other-view-card-body">
            <div slot="header">
                <a href={`/employees/${worker.partyId}`}>
                    <h4>{worker.partyId}</h4>
                </a>
            </div>
            <hr />
            <strong>Department:</strong>
            Ofbiz
            <br />
            <strong>Email:</strong>
            ofbizl@sapper.svelte
            <br />
            <strong>Telephone:</strong>
            +37256938555
            <br />
            <hr />
            <div slot="footer">
                <Row>
                    <Checkbox on:change={onAll} {checked}>
                        <small>Choose</small>
                    </Checkbox>
                </Row>
            </div>
        </Card>
    </div>
</Col>
