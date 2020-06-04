<script>
    import { Row, Col } from "svelte-chota";

    export let isEditing = false;
    export let address = {};

    export let fullAddress;

    const stateProvinceGeo = address._toOne_StateProvinceGeo || {};
    const countryGeo = address._toOne_CountryGeo || {};

    let street = address.address1 || "";
    let houseNumber = address.houseNumber || "";
    let city = address.city || "";
    let postalCode = address.postalCode || "";
    let stateProvince = stateProvinceGeo.geoName || "";
    let country = countryGeo.geoName || "";

    const regex = new RegExp(",{2,}|^,", "g");
    $: fullAddress = `${street},${houseNumber},${city},${postalCode},${stateProvince},${country}`.replace(
        regex,
        ""
    );
</script>

<style>
    input {
        margin-bottom: 1vh;
    }
</style>

<Row>
    <Col size="2" class="paper__other-info-type">Address</Col>
    <Col size={isEditing ? '3' : '5'} class="paper__other-info-value">
        {#if isEditing}
            <input placeholder="Street" bind:value={street} />
            <input placeholder="House number" bind:value={houseNumber} />
            <input placeholder="City" bind:value={city} />
            <input placeholder="Postal code" bind:value={postalCode} />
            <input placeholder="State/province" bind:value={stateProvince} />
            <input placeholder="Country" bind:value={country} />
        {:else}{fullAddress}{/if}
    </Col>
</Row>
