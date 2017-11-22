let offset=0;
let pokelist;
listPokemons();

//Class representing a Pokemon
class Pokemon{
    name : String;
    image : String;
    weight : number;
    abilities : Array<String>;

    constructor(name : String, image : String, weight : number, abilities : Array<String>){
        this.name=name;
        this.image=image;
        this.weight=weight;
        this.abilities=abilities;
    }
}

//loads the list of pokemon and generates the buttons
async function listPokemons() {
    $("#btnBack").hide();
    pokelist = await $.get(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`);

    let html = '';
    for(const pokemon of pokelist.results) {
        html += `<tr><td>${pokemon.name}</td><td><button type="button" onclick="showPokeDetails('${pokemon.url}')">Details</button></td></tr>`
    }
    
    $('#pokemons')[0].innerHTML = html;
};

//loads and shows the details of a specific pokemon
function showPokeDetails(pokeURL){
    let html= '';
    let pokeDetails;

    (async function (){
        pokeDetails = await $.get(pokeURL);
        let pokemon=new Pokemon(pokeDetails.name, pokeDetails.sprites.front_default, pokeDetails.weight, pokeDetails.abilities);

        html=`<tr><td>Name: ${pokemon.name}</td></tr><tr><td>Foto: <br><img src="${pokemon.image}" alt="Picture of Pokemon"></td></tr>`+
        `<tr><td>Weight: ${pokemon.weight}</td></tr><tr><td>Abilities:</td></tr><td><ul>`

        for(let ability of pokeDetails.abilities){
            html+=`<li>${ability.ability.name}</li>`
        }
        html+=`</ul></td>`

        $("#pokemons").hide();
        $("#btnPrev").hide();
        $("#btnNext").hide();
        $("#btnBack").show();
        $("#pokemonDetail").show();
        
        $('#pokemonDetail')[0].innerHTML = html;
    })();
}

//substrakts the offset -20 to get the previous page
function btnPrevClick(){
    if(offset>0){
        offset-=20;
        listPokemons();
    }
    else{
        window.alert("no previous page left");
    }
}

//adds the offset +20 to get the next page
function btnNextClick(){
    offset+=20;
    listPokemons();
}

//hides all information that is not used and shows the information that is used
function btnBackClick(){
    $("#pokemonDetail").hide();
    $("#btnBack").hide();

    $("#pokemons").show();
    $("#btnPrev").show();
    $("#btnNext").show();
}