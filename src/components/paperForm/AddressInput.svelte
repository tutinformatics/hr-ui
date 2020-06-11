<script>
    import { Row, Col } from "svelte-chota";

    export let isEditing = false;
    export let countries = [];
    export let states = [];
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

    $: fullAddress = {
        street,
        houseNumber,
        city,
        postalCode,
        stateProvince,
        country
    };
    $: fullAddressString = Object.values(fullAddress)
        .join(",")
        .replace(/,{2,}/g, ",")
        .replace(/^,|,$/, "");
</script>

<style>
    input,
    select {
        margin-bottom: 1vh;
    }

    .required {
        color: red;
        margin-left: 5px;
    }

    .input-field {
        display: flex;
    }
</style>

<Row>
    <Col size="2" class="paper__other-info-type">Address</Col>
    <Col size={isEditing ? '3' : '5'} class="paper__other-info-value">
        {#if isEditing}
            <div class="input-field">
                <input placeholder="Street" bind:value={street} />
                <span class="required">*</span>
            </div>

            <div class="input-field">
                <input placeholder="House number" bind:value={houseNumber} />
                <span class="required">*</span>
            </div>

            <div class="input-field">
                <input placeholder="City" bind:value={city} />
                <span class="required">*</span>
            </div>

            <div class="input-field">
                <input placeholder="Postal code" bind:value={postalCode} />
                <span class="required">*</span>
            </div>

            <div class="input-field">
                <select bind:value={stateProvince}>
                    <option value="" />
                    {#each states as s}
                        {#if s.geoId.split('-')[0] === country.countryCode}
                            <option value={s}>{s.geoName}</option>
                        {/if}
                    {/each}
                </select>
                <span class="required">*</span>
            </div>

            <div class="input-field">
                <select bind:value={country}>
                    <option value="" />
                    {#each countries as c}
                        <option value={c}>
                            {c.countryName[0] + c.countryName
                                    .substr(1)
                                    .toLowerCase()}
                        </option>
                    {/each}
                </select>
                <span class="required">*</span>
            </div>
        {:else}{fullAddressString}{/if}
    </Col>
</Row>
