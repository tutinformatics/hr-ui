
<script>
    import {Input, Field, Card, Row, Col, Button} from 'svelte-chota'
    import { Checkbox, Menu, Menuitem, Icon, Datefield, Sidepanel, Textfield} from 'svelte-mui/src';
    import { mdiPlus, mdiMagnify} from '@mdi/js';

    export let workers = [];
    export let rightVisible = false;

    let value = '';
    let colors = ['coral', 'goldenrod', 'limegreen'];
    let favorite = ['coral', 'goldenrod'];
    let format = 'D.MM.YYYY';
    let date='21.01.2020';

    $: checked = favorite.length === colors.length;

    function onAll(e) {
        let on = e.target.checked;
    }

    function visible() {
        rightVisible = true;
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
                <Button primary outlined>
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
        <Row class="employeeCard__body">
            <Col size="1">
                <Checkbox on:change={onAll} {checked}>
                </Checkbox>
            </Col>
            <Col>
                <h4>Aleksandr Aleksandrov</h4>
            </Col>
            <Col>
                <h4>Sapper</h4>
            </Col>
            <Col>
                <h4>sasha.aleksandov@gmail.com</h4>
            </Col>
            <Col>
                <h4>+37358248695</h4>
            </Col>
        </Row>
        <hr/>
        <Row class="employeeCard__body">
            <Col size="1">
                <Checkbox on:change={onAll} {checked}>
                </Checkbox>
            </Col>
            <Col>
                <h4>Alexander Frolov</h4>
            </Col>
            <Col>
                <h4>Developer</h4>
            </Col>
            <Col>
                <h4>alfrol@taltech.ee</h4>
            </Col>
            <Col>
                <h4>+37256938555</h4>
            </Col>
        </Row>
        <hr/>
        <Row class="employeeCard__body">
            <Col size="1">
                <Checkbox on:change={onAll} {checked}>
                </Checkbox>
            </Col>
            <Col>
                <h4>Ahto Reinaru</h4>
            </Col>
            <Col>
                <h4>Project manager</h4>
            </Col>
            <Col>
                <h4>ahto.reinaru@taltech.ee</h4>
            </Col>
            <Col>
                <h4>+37255936945</h4>
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
                <Row class="employeeCard__body">
                    <Col size="1">
                        <Checkbox on:change={onAll} {checked}>
                        </Checkbox>
                    </Col>
                    <Col>
                        <h4>{employee.partyId}</h4>
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
                <hr/>
            {/each}
        {/if}

    </Card>
</Card>
