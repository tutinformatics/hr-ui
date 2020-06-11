<script>
    import {
        Input,
        Field,
        Card,
        Row,
        Col,
        Button,
        Tag,
        Container
    } from "svelte-chota";
    import {
        Checkbox,
        Menu,
        Menuitem,
        Icon,
        Datefield,
        Sidepanel,
        Textfield
    } from "svelte-mui/src";
    import { mdiPlus, mdiMagnify } from "@mdi/js";
    import FaUserPlus from "svelte-icons/fa/FaUserPlus.svelte";
    import MdApps from "svelte-icons/md/MdApps.svelte";
    import FaTable from "svelte-icons/fa/FaTable.svelte";
    import FaExpandArrowsAlt from "svelte-icons/fa/FaExpandArrowsAlt.svelte";
    import TodoView from "./dashboardView/TodoView.svelte";
    import CardView from "./dashboardView/CardView.svelte";
    import TableView from "./dashboardView/TableView.svelte";

    import TVNavbar from "./dashboardView/TVNavbar.svelte";
    import Aside from "./dashboardView/Aside.svelte";

    export let workers = [];

    let value = "";
    let colors = ["coral", "goldenrod", "limegreen"];
    let favorite = ["coral", "goldenrod"];

    let table = true;
    let card = false;
    let todo = false;

    workers.forEach(addId);
    function addId(item, index) {
        item.id = index;
    }

    let board = [
        {
            done: false,
            id: 1,
            name: "New employee",
            items: workers
        },
        {
            done: false,
            id: 2,
            name: "Hiring people",
            items: []
        },
        {
            done: false,
            id: 3,
            name: "Other stuff",
            items: []
        }
    ];

    $: checked = favorite.length === colors.length;

    function onAll(e) {
        let on = e.target.checked;
    }

    function visible() {
        rightVisible = true;
    }
</script>

<Aside bind:tableView={table} bind:cardView={card} bind:todoView={todo} />
<TVNavbar />
<br />
<br />
<br />
<br />
<br />
<Row>
    <Col>
        {#if table}
            <Card class="text-justify">
                <div slot="header">
                    <Row>
                        <Col size="1">
                            <Checkbox
                                class="thin"
                                bind:group={favorite}
                                color="accent">
                                <span />
                            </Checkbox>
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
                            <h3>Mobile phone</h3>
                        </Col>
                    </Row>
                </div>
                <hr />
                {#each workers as employee}
                    <TableView worker={employee} />
                {/each}
            </Card>
        {/if}
        {#if card}
            <Row>
                {#each workers as employee}
                    <CardView worker={employee} />
                {/each}
            </Row>
        {/if}
        {#if todo}
            <TodoView employees={board} />
        {/if}
    </Col>
</Row>
