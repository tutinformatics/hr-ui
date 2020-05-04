
<script>
    import {Button, Input, Field, Card, Row, Col} from 'svelte-chota'
    import { Checkbox } from 'svelte-mui/src';
    import { mdiPlus, mdiMagnify} from '@mdi/js';

    export let workers = [];

    let colors = ['coral', 'goldenrod', 'limegreen'];
    let favorite = ['coral', 'goldenrod'];

    $: checked = favorite.length === colors.length;

    function onAll(e) {
        let on = e.target.checked;
    }

</script>


<style>
</style>

<Card class="text-justify">
    <div slot="header">
        <Row class="is-horizontal-align">
            <Col>
                <h3 class="pull-left">Manage employees</h3>
            </Col>
            <Col>
                <Button dark outline icon={mdiPlus}>
                    New employee
                </Button>
            </Col>
            <Col size="4">
                <Field gapless>
                    <Input placeholder="Search"/>
                    <Button icon={mdiMagnify} primary/>
                </Field>
            </Col>
            <Col size="1">
                <Button dropdown="Product filter" autoclose clear>
                    <p><a href="/">Category 1</a></p>
                    <p><a href="/">Category 2</a></p>
                    <p><a href="/">Category 3</a></p>
                    <hr>
                    <p><a href="/">Category 4</a></p>
                </Button>
            </Col>
            <Col size="3">
                <Button dropdown="Product favorite" autoclose clear>
                    <p><a href="/">Category 1</a></p>
                    <p><a href="/">Category 2</a></p>
                    <p><a href="/">Category 3</a></p>
                    <hr>
                    <p><a href="/">Category 4</a></p>
                </Button>
            </Col>
        </Row>
    </div>
    <hr/>
    <Card>
        <div slot="header">
            <Row>
                <Col size="1">
                    <Checkbox class="thin" bind:group={favorite} color="accent"><span></span></Checkbox>
                </Col>
                <Col>
                    <h3>Member</h3>
                </Col>
                <Col>
                    <h3>Department</h3>
                </Col>
                <Col>
                    <h3>Email</h3>
                </Col>
                <Col>
                    <h3>Telephone</h3>
                </Col>
            </Row>
        </div>
        <hr/>
        <Row>
            <Col size="1">
                <Checkbox on:change={onAll} {checked}>
                </Checkbox>
            </Col>
            <Col>
                <h3>Aleksandr Aleksandrov</h3>
            </Col>
            <Col>
                <h3>Sapper</h3>
            </Col>
            <Col>
                <h3>sasha.aleksandov@gmail.com</h3>
            </Col>
            <Col>
                <h3>+37358248695</h3>
            </Col>
        </Row>
        <hr/>
        <Row>
            <Col size="1">
                <Checkbox on:change={onAll} {checked}>
                </Checkbox>
            </Col>
            <Col>
                <h3>Alexander Frolov</h3>
            </Col>
            <Col>
                <h3>Developer</h3>
            </Col>
            <Col>
                <h3>alfrol@taltech.ee</h3>
            </Col>
            <Col>
                <h3>+37256938555</h3>
            </Col>
        </Row>
        <hr/>
        <Row>
            <Col size="1">
                <Checkbox on:change={onAll} {checked}>
                </Checkbox>
            </Col>
            <Col>
                <h3>Ahto Reinaru</h3>
            </Col>
            <Col>
                <h3>Project manager</h3>
            </Col>
            <Col>
                <h3>ahto.reinaru@taltech.ee</h3>
            </Col>
            <Col>
                <h3>+37255936945</h3>
            </Col>
        </Row>
        <hr/>
        {#if !workers}
            <Row>
                <Col>
                    <h2>You don't have employees in your company yet.</h2>
                </Col>
            </Row>
        {:else}
            {#each workers as employee}
                <Row>
                    <Col size="1">
                        <Checkbox on:change={onAll} {checked}>
                        </Checkbox>
                    </Col>
                    <Col>
                        <h3>{employee.partyId}</h3>
                    </Col>
                    <Col>
                        <h3>Ofbiz</h3>
                    </Col>
                    <Col>
                        <h3>ofbizl@sapper.svelte</h3>
                    </Col>
                    <Col>
                        <h3>+37256938555</h3>
                    </Col>
                </Row>
                <hr/>
            {/each}
        {/if}

    </Card>
</Card>
