(function () {
    'use strict';

    const recipeList = $('#rec');
    const displayName = $('#name');
    const pic = $('#pic');
    const ingreds = $('#ings');
    const dirs = $('#direc');
    const cardBtm = $('#bottom');
    fetcher("rec.json");

    async function fetcher(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`${e.status} ${e.statusText}`);
            }
            const recipe = await response.json();
            recipeList.change(() => {
                const selRec = recipeList.find(":selected").text();//jQuery find() recipe chosen
                const found = recipe.find((e) => selRec === e.name)//js find() match to fetched list

                displayName.text(found.name);
                pic.attr('src', found.img);
                cardBtm.show();                
                ingreds.empty();//empty prev recipe ings from list
                
                Object.keys(found.ingredients).forEach(ing => {
                    ingreds.append(`<li>${found.ingredients[ing]}</li>`)
                });
                
                dirs.text(found.directions);

            })

   
        } catch (e) {
            console.error(e)
        }
    }



}())