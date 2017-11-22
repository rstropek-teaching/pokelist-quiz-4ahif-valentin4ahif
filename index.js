var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var offset = 0;
var pokelist;
listPokemons();
//Class representing a Pokemon
var Pokemon = /** @class */ (function () {
    function Pokemon(name, image, weight, abilities) {
        this.name = name;
        this.image = image;
        this.weight = weight;
        this.abilities = abilities;
    }
    return Pokemon;
}());
//loads the list of pokemon and generates the buttons
function listPokemons() {
    return __awaiter(this, void 0, void 0, function () {
        var html, _i, _a, pokemon;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    $("#btnBack").hide();
                    return [4 /*yield*/, $.get("https://pokeapi.co/api/v2/pokemon/?limit=20&offset=" + offset)];
                case 1:
                    pokelist = _b.sent();
                    html = '';
                    for (_i = 0, _a = pokelist.results; _i < _a.length; _i++) {
                        pokemon = _a[_i];
                        html += "<tr><td>" + pokemon.name + "</td><td><button type=\"button\" onclick=\"showPokeDetails('" + pokemon.url + "')\">Details</button></td></tr>";
                    }
                    $('#pokemons')[0].innerHTML = html;
                    return [2 /*return*/];
            }
        });
    });
}
;
//loads and shows the details of a specific pokemon
function showPokeDetails(pokeURL) {
    var html = '';
    var pokeDetails;
    (function () {
        return __awaiter(this, void 0, void 0, function () {
            var pokemon, _i, _a, ability;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, $.get(pokeURL)];
                    case 1:
                        pokeDetails = _b.sent();
                        pokemon = new Pokemon(pokeDetails.name, pokeDetails.sprites.front_default, pokeDetails.weight, pokeDetails.abilities);
                        html = "<tr><td>Name: " + pokemon.name + "</td></tr><tr><td>Foto: <br><img src=\"" + pokemon.image + "\" alt=\"Picture of Pokemon\"></td></tr>" +
                            ("<tr><td>Weight: " + pokemon.weight + "</td></tr><tr><td>Abilities:</td></tr><td><ul>");
                        for (_i = 0, _a = pokeDetails.abilities; _i < _a.length; _i++) {
                            ability = _a[_i];
                            html += "<li>" + ability.ability.name + "</li>";
                        }
                        html += "</ul></td>";
                        $("#pokemons").hide();
                        $("#btnPrev").hide();
                        $("#btnNext").hide();
                        $("#btnBack").show();
                        $("#pokemonDetail").show();
                        $('#pokemonDetail')[0].innerHTML = html;
                        return [2 /*return*/];
                }
            });
        });
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
    $("#pokemons").show();
    $("#btnPrev").show();
    $("#btnNext").show();
}
