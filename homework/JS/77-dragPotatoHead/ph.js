(function () {
    'use strict';

    const board = $('#board');
    let onBoard = [];

    //when .piece is clicked append it to the board
    $('.piece').on('click', e => {
        placeonBoard(e.target);
        document.getElementById('music').play();
    }
        );

    function placeonBoard(elem) {
        const pieceOnBoard = $(elem).clone().appendTo(board).attr('class', 'onBoard');
        onBoard.push({ id: elem.id, pos: pieceOnBoard.position() });
        $(elem).css('opacity', '.3').off('click');

        localStorage.setItem('OnBoard', JSON.stringify(onBoard));

        pieceOnBoard.on('dblclick', function (ev) {
            $(ev.target).remove();
            onBoard.splice(onBoard.findIndex(el => el.id === ev.target.id), 1);
            localStorage.setItem('OnBoard', JSON.stringify(onBoard));
            $(elem).css('opacity', '1').on('click', placeonBoard);
        });
    }


    //fix to not drag outside of the board
    let draggable;
    let offset;
    let boardPos = board.position();
    $(document).on('mousedown', '.onBoard', e => {
        draggable = $(e.target);
        offset = { x: e.offsetX + boardPos.left, y: e.offsetY + boardPos.top };
    }).mousemove(e => {
        if (draggable) {
            e.preventDefault();
            if (e.clientY - offset.y - boardPos.top !== 0 || e.clientX - offset.x - boardPos.left) {
                draggable.css({ top: e.clientY - offset.y - 15, left: e.clientX - offset.x - 15 }); /* -15 for border */

                const x = onBoard.findIndex(el => el.id === draggable[0].id);
                onBoard[x].pos = { x: e.clientX - offset.x - 15, y: e.clientY - offset.y - 15 };
                localStorage.setItem('OnBoard', JSON.stringify(onBoard));
            }
        }
    }).mouseup(() => {
        draggable = null;
    });


    showHideStickers('#main', '.ess');
    showHideStickers('#eyes', '.eyes');
    showHideStickers('#lips', '.lips');
    showHideStickers('#acc', '.acc');



    //fix to hide sheet if showing
    function showHideStickers(btnId, stickerClass) {
        $(btnId).click(function () {
            $('.parts').slideUp();
            $(stickerClass).slideDown('slow');
        });
    }


    function reDrawStorage() {
        onBoard = JSON.parse(localStorage.getItem('OnBoard')) || [];
        if (onBoard) {
            for (let i = 0; i <= onBoard.length - 1; i++) {
                const currentPiece = ($('.parts').find(`#${onBoard[i].id}`)[0]);
                const pieceOnBoard = $(currentPiece).clone().appendTo(board).attr('class', 'onBoard')
                    .css({ top: onBoard[i].pos.y, left: onBoard[i].pos.x });
                $(currentPiece).css('opacity', '.3').off('click');

                pieceOnBoard.on('dblclick', function (ev) {
                    $(ev.target).remove();
                    onBoard.splice(onBoard.findIndex(el => el.id === ev.target.id), 1);
                    $(currentPiece).css('opacity', '1').on('click', placeonBoard);
                    localStorage.setItem('OnBoard', JSON.stringify(onBoard));
                });

            }
        }
    }
    reDrawStorage();

}())