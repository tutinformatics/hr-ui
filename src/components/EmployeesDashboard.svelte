<svelte:head>
    <link rel='stylesheet' href='employees-dashboard.css'>
</svelte:head>
<script>
    import {Input, Field, Card, Row, Col, Button, Tag} from 'svelte-chota'
    import { Checkbox, Menu, Menuitem, Icon, Datefield, Sidepanel, Textfield} from 'svelte-mui/src';
    import { mdiPlus, mdiMagnify} from '@mdi/js';
    import FaUserPlus from 'svelte-icons/fa/FaUserPlus.svelte'
    import MdApps from 'svelte-icons/md/MdApps.svelte'
    import FaTable from 'svelte-icons/fa/FaTable.svelte'

    export let workers = [];

    let value = '';
    let colors = ['coral', 'goldenrod', 'limegreen'];
    let favorite = ['coral', 'goldenrod'];

    let tableView = true;

    function changeView() {
        tableView = !tableView
    }

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
                <h3 class="pull-left">Employees</h3>
            </Col>
            <Col>
                <a href="/employees/create">
                    <Button outlined class="blue-button">
                        <Row><div class="add-employee-button"><FaUserPlus/></div> New employee</Row>
                    </Button>
                </a>
            </Col>
            <Col size="4">
                <Field gapless>
                    <Input placeholder="Search"/>
                    <Button icon={mdiMagnify} class="blue-button"/>
                </Field>
            </Col>
            <Col size="1">
                <Button dropdown="Product filter" class="blue-button" autoclose>
                    <p><a href="/">Category 1</a></p>
                    <p><a href="/">Category 2</a></p>
                    <p><a href="/">Category 3</a></p>
                    <hr>
                    <p><a href="/">Category 4</a></p>
                </Button>
            </Col>
            <Col size="3">
                <Button dropdown="Product favorite" class="blue-button" autoclose>
                    <p><a href="/">Category 1</a></p>
                    <p><a href="/">Category 2</a></p>
                    <p><a href="/">Category 3</a></p>
                    <hr>
                    <p><a href="/">Category 4</a></p>
                </Button>
            </Col>
            <Col>
                <Row>
                    <div class="btn-group">
                        <Button on:click={changeView}>
                            <div class="view"><FaTable/></div>
                        </Button>

                        <Button on:click={changeView}>
                            <div class="view"><MdApps/></div>
                        </Button>
                    </div>
                </Row>
                <Row>
                    <small class="table-view-tab text-light">Table view</small>
                    <small class="card-view-tab text-light">Card view</small>
                </Row>
            </Col>
        </Row>
    </div>
</Card>
<Row>
    <Col>
        {#if tableView}
        <Card class="text-justify">
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
            {#if !workers}
                <Row>
                    <Col>
                        <h2>You don't have employees in your company yet.</h2>
                    </Col>
                </Row>
            {:else}
                {#each workers as employee}
                    <a href={`/employees/${employee.partyId}`}>
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
                    </a>
                    <hr/>
                {/each}
            {/if}
        </Card>
        {:else}
            <Checkbox class="thin" bind:group={favorite} color="accent"><span>Choose all</span></Checkbox>
            <Row>
                {#each workers as employee}
                <Col size="3">
                    <div style="max-width:600px">
                        <Card class="other-view-card-body">
                            <div slot="header">
                                <h4>{employee.partyId}</h4>
                            </div>
                            <hr/>
                            <strong>Department: </strong> Ofbiz <br/>
                            <strong>Email: </strong> ofbizl@sapper.svelte <br/>
                            <strong>Telephone: </strong> +37256938555 <br/>
                            <hr/>
                            <div slot="footer">
                                <Row>
                                    <Checkbox on:change={onAll} {checked}><small>Choose</small></Checkbox>
                                </Row>
                            </div>
                        </Card>
                    </div>
                </Col>
                    {/each}
            </Row>
                {/if}
    </Col>
</Row>
