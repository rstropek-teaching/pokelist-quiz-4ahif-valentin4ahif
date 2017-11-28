let offset = 0;
let pokelist;
listPokemons();

//loads the list of pokemon and generates the buttons
async function listPokemons() {
    $("#btnBack").hide();
    $("#singleHeading").hide();
    pokelist = await $.get(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`);

    let html = '';
    for (const pokemon of pokelist.results) {
        html += `<tr><td class="pokenameTD" >${pokemon.name}</td><td class="buttonTD"><button type="button" onclick="showPokeDetails('${pokemon.url}')">Details</button></td></tr>`
    }

    $('#pokemons')[0].innerHTML = html;
};

//loads and shows the details of a specific pokemon
function showPokeDetails(pokeURL) {
    let html = '';
    let pokeDetails;

    (async function () {
        pokeDetails = await $.get(pokeURL);

        html = `<tr><td>Name: ${pokeDetails.name}</td></tr><tr><td>Photo: <br><img src="${pokeDetails.sprites.front_default}"` +
            `alt="Picture of Pokemon"></td></tr>` +
            `<tr><td>Weight: ${pokeDetails.weight}</td></tr><tr><td>Abilities:</td></tr><td><ul>`

        for (let ability of pokeDetails.abilities) {
            html += `<li>${ability.ability.name}</li>`
        }
        html += `</ul></td>`

        $("#pokemons").hide();
        $("#btnPrev").hide();
        $("#btnNext").hide();
        $("#listHeading").hide();

        $("#singleHeading").show();
        $("#btnBack").show();
        $("#pokemonDetail").show();

        $('#pokemonDetail')[0].innerHTML = html;
    })();
}

//substrakts the offset -20 to get the previous page
function btnPrevClick() {
    if (offset > 0) {
        offset -= 20;
        listPokemons();
    }
    else {
        window.alert("no previous page left");
    }
}

//adds the offset +20 to get the next page
function btnNextClick() {
    offset += 20;
    listPokemons();
}

//hides all information that is not used and shows the information that is used
function btnBackClick() {
    $("#pokemonDetail").hide();
    $("#btnBack").hide();
    $("#singleHeading").hide();

    $("#listHeading").show();
    $("#pokemons").show();
    $("#btnPrev").show();
    $("#btnNext").show();
}