<svelte:head>
    <link rel='stylesheet' href='employees-dashboard.css'>
</svelte:head>

<script>
    import {Input, Field, Card, Row, Col, Button} from 'svelte-chota'
    import { Checkbox, Menuitem, Icon, Datefield, Sidepanel, Textfield} from 'svelte-mui/src';
    import Aside from "./skillboardView/Aside.svelte"
    import TableView from './skillboardView/TableView.svelte'
    import CardView from './skillboardView/CardView.svelte'
    import ChildNavBar from './skillboardView/ChildNavBar.svelte'

    export let skills;
    let colors = ['coral', 'goldenrod', 'limegreen'];
    let favorite = ['coral', 'goldenrod'];
    $: checked = favorite.length === colors.length;

    function onAll(e) {
        let on = e.target.checked;
    }

    let table = true;
    let card = false;
    let todo = false;

</script>


<Aside
        bind:tableView={table}
        bind:cardView={card}
        bind:todoView={todo}
/>
<ChildNavBar/>
<br/>
<br/>
<br/>
<br/>
<br/>
<Row>
    <Col>
        {#if table}
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
                        <h3>Skill type</h3>
                    </Col>
                    <Col>
                        <h3>Skill level</h3>
                    </Col>
                    <Col>
                        <h3>Rating</h3>
                    </Col>
                    <Col>
                        <h3>Years exp</h3>
                    </Col>
                </Row>
            </div>
            <hr/>
            {#each skills as skill}
                <TableView skillPerson={skill}/>
            {/each}
        </Card>
        {/if}
        {#if card}
        <Row>
            {#each skills as skill}
            <CardView skillPerson={skill}/>
            {/each}
        </Row>
        {/if}
    </Col>
</Row>
<!--<Card>-->
<!--    <div slot="header">-->
<!--        <Row>-->
<!--            <Col size="1">-->
<!--                <Checkbox class="thin" bind:group={favorite} color="accent"><span></span></Checkbox>-->
<!--            </Col>-->
<!--            <Col>-->
<!--                <h3>Member</h3>-->
<!--            </Col>-->
<!--            <Col>-->
<!--                <h3>Skill type</h3>-->
<!--            </Col>-->
<!--            <Col>-->
<!--                <h3>Skill level</h3>-->
<!--            </Col>-->
<!--            <Col>-->
<!--                <h3>Rating</h3>-->
<!--            </Col>-->
<!--            <Col>-->
<!--                <h3>Years exp</h3>-->
<!--            </Col>-->
<!--        </Row>-->
<!--    </div>-->
<!--    <hr/>-->
<!--    {#if !skills}-->
<!--            <Row>-->
<!--                <Col>-->
<!--                    <h2>You don't have employees in your company yet.</h2>-->
<!--                </Col>-->
<!--            </Row>-->
<!--    {:else}-->
<!--        {#each skills as skill}-->
<!--        <Card>-->
<!--            <Row class="employeeCard__body">-->
<!--                <Col size="1">-->
<!--                    <Checkbox on:change={onAll} {checked}>-->
<!--                    </Checkbox>-->
<!--                </Col>-->
<!--                <Col>-->
<!--                    <h4>{skill.partyId}</h4>-->
<!--                </Col>-->
<!--                <Col>-->
<!--                    <h4>{skill._toOne_SkillType["description"]}</h4>-->
<!--                </Col>-->
<!--                <Col>-->
<!--                    <h4>{skill.skillLevel}</h4>-->
<!--                </Col>-->
<!--                <Col>-->
<!--                    <h4>{skill.rating}</h4>-->
<!--                </Col>-->
<!--                <Col>-->
<!--                    <h4>{skill.yearsExperience}</h4>-->
<!--                </Col>-->
<!--            </Row>-->
<!--            <hr/>-->
<!--        </Card>-->
<!--            {/each}-->
<!--        {/if}-->
<!--</Card>-->