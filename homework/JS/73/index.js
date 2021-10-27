(function () {
    'use strict';

    const vidList = $("#vidList");
    populate('vidsList.json')

    async function populate(url) {
        const videos = await fetcher(url);
        videos.forEach(v => {
            $(`<tr><td>${v.name}</td><td>${v.artist}</td></tr>`).appendTo(vidList)
                .click(() => {
                    $('#name').text(v.name);
                    $('video').attr({'poster': v.img,'src': v.url});
                    $('#bottom').show();
                    $('#art').text(v.artist);
                })
        });
    }

    async function fetcher(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            return await response.json();
        } catch (e) {
            console.error(e)
        }
    }
}())