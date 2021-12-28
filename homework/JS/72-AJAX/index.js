(function () {
    'use strict';

    const recipeList = $('#rec');
    const displayName = $('#name');
    const pic = $('#pic');
    const ingreds = $('#ings');
    const dirs = $('#direc');
    const cardBtm = $('#bottom');
    populate("recipeList.json");
    fetcher("rec.json");

    async function populate(url){
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            const recipes = await response.json();
            Object.keys(recipes[0]).forEach(key => {
                recipeList.append(`<option>${recipes[0][key]}</option>`)
            });

         } catch (e) {
            console.error(e);
        }
}

    async function fetcher(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
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

            });

   
        } catch (e) {
            console.error(e);
        }
    }



//v.2 less copied code, but i have a feeling extra awaits will hamper performance.....
    // async function populate(url) {
    //     const recipes = await fetcher(url);
    //     Object.keys(recipes[0]).forEach(key => {
    //         recipeList.append(`<option>${recipes[0][key]}</option>`)
    //     });
    // }

    // async function display(url) {   
    //     const recipe = await fetcher(url);
    //     recipeList.change(() => {
    //         const selRec = recipeList.find(":selected").text();//jQuery find() recipe chosen
    //         const found = recipe.find((e) => selRec === e.name)//js find() match to fetched list

    //         displayName.text(found.name);
    //         pic.attr('src', found.img);
    //         cardBtm.show();
    //         ingreds.empty();//empty prev recipe ings from list

    //         Object.keys(found.ingredients).forEach(ing => {
    //             ingreds.append(`<li>${found.ingredients[ing]}</li>`)
    //         });

    //         dirs.text(found.directions);
    //     })
    // }

    // async function fetcher(url) {
    //     try {
    //         const response = await fetch(url);
    //         if (!response.ok) {
    //             throw new Error(`${e.status} ${e.statusText}`);
    //         }
    //         return await response.json();
    //     } catch (e) {
    //         console.error(e)
    //     }
    // }

}())