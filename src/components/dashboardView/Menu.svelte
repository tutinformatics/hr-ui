<svelte:head>
    <link rel='stylesheet' href='employees-dashboard.css'>
</svelte:head>

<script>

    import {Input, Field, Card, Row, Col, Button, Tag, Nav, Modal, Icon} from 'svelte-chota'
    import { onDestroy } from 'svelte';
    import FaUserPlus from 'svelte-icons/fa/FaUserPlus.svelte'
    import {mdiMagnify} from '@mdi/js';
    import {mdiStar} from '@mdi/js';
    import {spaces} from '../../store.js'
    let storage_items;
    const unsubscribe = spaces.subscribe(value => {
        storage_items = [...value];
    });

    let open = false;
    const show = () => open=true;
    const hide = () => open=false;

    function checkStorage(name) {
        var i;
        for (i = 0; i < storage_items.length; i++) {
            console.log(storage_items[i].name);
            if (storage_items[i].name === name) {
                return true
            }
        }
        return false
    }

    function addWorkSpace(val) {
        if (!checkStorage(val)) {
            spaces.update(n => n.concat({
                id: spaces.length + 1,
                icon: mdiStar,
                name: val
            }));
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
    <Row class="menu-row">
        <Col>
            <Button clear class='add-to-workspace'
                    on:click={() => addWorkSpace('<a slot="left" href="/employees">Employees</a>')}
                    on:click={show}>
                <h3 class="pull-left">Employees <Icon class="add-to-workspace-icon" src={mdiStar}/></h3>

            </Button>
        </Col>
        <Col>
            <a href="/employees/create" class="is-vertical-align">
                <Button outlined class="blue-button">
                    <Row><div class="add-employee-button"><FaUserPlus/></div> New employee</Row>
                </Button>
            </a>
        </Col>
        <Col size="4">
            <Field gapless class="search-field">
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