/// <reference path="../lib/typings/jquery/jquery.d.ts"/>

window.onload = () => {

    var tiles = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    var $target = undefined;

    var renderTiles = function ($newTarget) {
        $target = $newTarget || $target;

        var $ul = $("<ul>", {
            "class": "n-puzzle",
            "id": "navbar"
        });

        $(tiles).each(function (index) {
            var correct = index + 1 == this;
            var cssClass = this == 0 ? "empty" : (correct ? "correct" : "incorrect");

            var $li = $("<li>", {
                "class": cssClass,
                "data-tile": this,
            });
            $li.text(this);
            $li.click({index: index}, shiftTile);
            $ul.append($li);
        })

        var solvable = checkSolvable();

        $target.html($ul);
    };

    var checkSolvable = function () {
        var sum = 0;
        for (var i = 0; i < tiles.length; i++) {

        }
    };

    var shiftTile = function (event) {
        var index = event.data.index;

        var targetIndex = -1;
        if (index - 1 >= 0 && tiles[index - 1] == 0) { // check left
            targetIndex = index - 1;
        } else if (index + 1 < tiles.length && tiles[index + 1] == 0) { // check right
            targetIndex = index + 1;
        } else if (index - 3 >= 0 && tiles[index - 3] == 0) { //check up
            targetIndex = index - 3;
        } else if (index + 3 < tiles.length && tiles[index + 3] == 0) { // check down
            targetIndex = index + 3;
        }

        if (targetIndex != -1) {
            var temp = tiles[targetIndex];
            tiles[targetIndex] = tiles[index];
            tiles[index] = temp;
            renderTiles();
        }

        event.preventDefault();
    };

   renderTiles($('.eight-puzzle'));
};

function myFunction(){
    var x = []
    var i = 0
    for (const li of document.querySelectorAll('#navbar>li')) {
    console.log(li.textContent);
    x[i] = li.textContent
    i = i+1
    }
    console.log(x)
    $.ajax({
            url: "http://localhost:5000/solve/" + x,
            method:  'GET',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            crossDomain: true,
            success: function(data){
              alert(data.message);
              var sol = data.message;
              console.log(sol);
              new_state(x, sol);
            },
            error: function (data) {
              alert(data.message);
            }
        });
};

function getind(list){
    var i;
    for(i=0; i<list.length;i++){
        if (list[i] == 0){
            return i
        }
    }
}

function new_state(x, sol){
    var d;
    for(d=0; d<x.length; d++){ x[d] = parseInt(x[d])}
    initial = x
    var i;
    console.log(sol.length)
    for(i=0; i<sol.length; i++)
    {
        if (sol[i] == 'left')
        {
            z_loc = getind(initial)
            temp = initial[z_loc-1];
            initial[z_loc-1] = 0;
            initial[z_loc] = parseInt(temp);
            console.log(initial)
            window.setTimeout(function(){
                moveit(initial);
            }, i*2000); 
        }
        else if (sol[i] == 'right')
        {
            z_loc = getind(initial)
            temp = initial[z_loc+1];
            initial[z_loc+1] = 0;
            initial[z_loc] = parseInt(temp);
            console.log(initial)
            window.setTimeout(function(){
                moveit(initial);
            }, i*2000); 
        }
        else if(sol[i] == 'up')
        {
            z_loc = getind(initial)
            temp = initial[z_loc-3];
            initial[z_loc-3] = 0;
            initial[z_loc] = parseInt(temp);
            console.log(initial)
            window.setTimeout(function(){
                moveit(initial);
            }, i*2000);  
        }
        else if (sol[i] == 'down')
        {
            z_loc = getind(initial)
            temp = initial[z_loc+3];
            initial[z_loc+3] = 0;
            initial[z_loc] = parseInt(temp);
            console.log(initial)
            window.setTimeout(function(){
                moveit(initial);
            }, i*2000);  
        }
    }
    console.log('end');
}











// function solver(initial_state, moves){
//     var i;
//     for(i=0; i<moves.length; i++){
//         var targetIndex = getind(initial_state);
//         if (moves[i] == 'left') { // check left
//             targetIndex = index - 1;
//         } else if (moves[i] == 'right') { // check right
//             targetIndex = index + 1;
//         } else if (moves[i] == 'up') { //check up
//             targetIndex = index - 3;
//         } else if (moves[i] == 'down') { // check down
//             targetIndex = index + 3;
//         }
//     }
// }



function moveit(state){
    var tiles = state;
            var $target = undefined;

    var renderTiles = function ($newTarget) {
        $target = $newTarget || $target;

        var $ul = $("<ul>", {
            "class": "n-puzzle",
            "id": "navbar"
        });

        $(tiles).each(function (index) {
            var correct = index + 1 == this;
            var cssClass = this == 0 ? "empty" : (correct ? "correct" : "incorrect");

            var $li = $("<li>", {
                "class": cssClass,
                "data-tile": this,
            });
            $li.text(this);
            $li.click({index: index}, shiftTile);
            $ul.append($li);
        })

        var solvable = checkSolvable();

        $target.html($ul);
    };

    var checkSolvable = function () {
        var sum = 0;
        for (var i = 0; i < tiles.length; i++) {

        }
    };

    var shiftTile = function (event) {
        var index = ind
        var i;
        for(i = 0; i < moves.length; i++){
        // var targetIndex = -1;
        // if (moves[i] == 'left') { // check left
        //     targetIndex = index - 1;
        // } else if (moves[i] == 'right') { // check right
        //     targetIndex = index + 1;
        // } else if (moves[i] == 'up') { //check up
        //     targetIndex = index - 3;
        // } else if (moves[i] == 'down') { // check down
        //     targetIndex = index + 3;
        // }

        // if (targetIndex != -1) {
        //     var temp = tiles[targetIndex];
        //     tiles[targetIndex] = tiles[index];
        //     tiles[index] = temp;
        //     renderTiles();
        // }

        // event.preventDefault();

                    var targetIndex = -1;
        if (moves[i] == 'left') { // check left
            targetIndex = index - 1;
        } else if (moves[i] == 'right') { // check right
            targetIndex = index + 1;
        } else if (moves[i] == 'up') { //check up
            targetIndex = index - 3;
        } else if (moves[i] == 'down') { // check down
            targetIndex = index + 3;
        }

        if (targetIndex != -1) {
            var temp = tiles[targetIndex];
            tiles[targetIndex] = tiles[index];
            tiles[index] = temp;
            
        }

        event.preventDefault();

    }
    };

   renderTiles($('.eight-puzzle'));

};