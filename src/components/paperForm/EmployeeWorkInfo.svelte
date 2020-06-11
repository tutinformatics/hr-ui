<script>
    import { Row, Col } from "svelte-chota";
    import AddressInput from "./AddressInput.svelte";

    export let isEditing = false;
    export let countries = [];
    export let states = [];
    export let employmentData = {};

    const address = employmentData._toOne_FromParty
        ? employmentData._toOne_FromParty._toMany_PartyContactMech[0]
              ._toOne_PostalAddress
        : {};
</script>

<style>
    h3 {
        margin-top: 4vh;
        font-weight: 600;
    }
</style>

<Row>
    <Col>
        <h3>Location</h3>
        <AddressInput {isEditing} {countries} {states} {address} />
    </Col>
</Row>
