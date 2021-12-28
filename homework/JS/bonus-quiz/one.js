const api = "1c3bd0ef96c8a91b5cb8";

const countriesUrl = `https://free.currconv.com/api/v7/countries?apiKey=${api}`;

/* const tempUrl = "./countries.json"; */

const select = $('.country');
const country1 = $('#country1');
const country2 = $('#country2');
const exchange1Label = $('#flabel');
const exchange1 = $('#forward');
const exchange2Label = $('#blabel');
const exchange2 = $('#backward');
const firstLabel = $('#f');
const firstInput = $('#ff');
const secondLabel = $('#s');
const secondInput = $('#ss');

let one;
let two;
let exchangef = 1;
let exchangeb = 1;


async function getCountries() {
    try {
        const response = await fetch(countriesUrl/* tempUrl */);
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }
        const result = await response.json();

        //return array of country objects 
        return Object.values(result.results);
    } catch (e) {
        console.error(e);
    }
}

/* async function get2countries() {
    const countries = await getCountries();
    return {
        country1: countries[4],
        country2: countries[8]
    };
} */


/* UI */
let countriesList = {};
async function setUI() {
    const countries = await getCountries();

    countries.forEach(country => {
        let key = country.name;
        let symbol = country.currencySymbol;
        let currencyId = country.currencyId;
        countriesList[key] = {
            symbol,
            currencyId
        };
        country1.append(`<option id="${key}">${key}___${country.currencyName}</option>`);
        country2.append(`<option id="${key}">${key}___${country.currencyName}</option>`);
    });

    select.on('change', async () => {
        one = country1.find(":selected").attr('id');
        two = country2.find(":selected").attr('id');
        let firstCountry = countriesList[one].currencyId;
        let secondCountry = countriesList[two].currencyId;
        console.log(firstCountry, secondCountry);
        [exchangef, exchangeb] = Object.values(await getExchangeRate(firstCountry, secondCountry));
        exchange1Label.text(`${countriesList[one].currencyId} = ${countriesList[two].currencyId}`);
        exchange1.text(`${countriesList[one].symbol}1       =>       ${countriesList[two].symbol}${1 * exchangef}`);
        exchange2Label.text(`${countriesList[two].currencyId} = ${countriesList[one].currencyId}`);
        exchange2.text(`${countriesList[two].symbol}1       =>       ${countriesList[one].symbol}${1 * exchangeb}`);
        firstLabel.text(`${countriesList[one].symbol}`);
        secondLabel.text(`${countriesList[two].symbol}`);
        firstInput.val(0);
        secondInput.val(0);
    });

    dynamicInput(firstInput, secondInput);
    
}
setUI();




async function getExchangeRate(one, two) {
    /* const {country1, country2} = await get2countries(); */

    try {
        const response = await fetch(`https://free.currconv.com/api/v7/convert?q=${one}_${two},${two}_${one}&compact=ultra&apiKey=${api}`);
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }
        const result = await response.json();
        console.log(result);
        return result;
    } catch (e) {
        console.error(e);
    }
}

function dynamicInput(first, second){
    first.on('change', () => {
        second.val((first.val() * exchangef).toFixed(3));
    });
    second.on('change', () => {
        first.val((second.val() * exchangeb).toFixed(3));
    });
}


