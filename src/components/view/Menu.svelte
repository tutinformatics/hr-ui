<svelte:head>
    <link rel='stylesheet' href='employees-dashboard.css'>
</svelte:head>

<script>
    import {Input, Field, Card, Row, Col, Button, Tag, Nav} from 'svelte-chota'
    import FaUserPlus from 'svelte-icons/fa/FaUserPlus.svelte'
    import {mdiMagnify} from '@mdi/js';
</script>


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