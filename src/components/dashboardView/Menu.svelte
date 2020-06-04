<svelte:head>
    <link rel='stylesheet' href='employees-dashboard.css'>
</svelte:head>

<script>

    import {Input, Field, Card, Row, Col, Button, Tag, Nav, Modal} from 'svelte-chota'
    import FaUserPlus from 'svelte-icons/fa/FaUserPlus.svelte'
    import {mdiMagnify} from '@mdi/js';
    import {spaces} from '../../store.js'

    let open = false;
    const show = () => open=true;
    const hide = () => open=false;

    let added = false;


    function addWorkSpace(val) {
        if (!added) {
            spaces.update(n => n.concat({
                id: spaces.length + 1,
                name: val
            }));
            added = true;
        }
    }

</script>

<Modal bind:open>
    <Card>
        <h4 slot="header">This workspace was added to list!</h4>
        <div slot="footer" class="text-center">
            <Button primary on:click={hide}>OK</Button>
        </div>
    </Card>
</Modal>
<Card class="text-justify is-fixed header-menu">
    <Row class="is-vertical-align">
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
        <Col>
            <Button outlined class="blue-button"
                    on:click={() => addWorkSpace('<a slot="left" href="/employees">Employees</a>')}
                    on:click={show}>
                <Row><div class="add-employee-button"><FaUserPlus/></div> Add to workspaces</Row>
            </Button>
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
    </Row>
</Card>