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

        $target.html($ul);
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

function astar(){
    var x = []
    var i = 0
    for (const li of document.querySelectorAll('#navbar>li')) {
    console.log(li.textContent);
    x[i] = li.textContent
    i = i+1
    }
    console.log(x)
    $.ajax({
            url: "http://localhost:5000/solve/astar/" + x,
            method:  'GET',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            crossDomain: true,
            success: function(data){
              var sol = data.message;
              alert('Solving time is ' + sol + " seconds")
                  alert('try again?');
    console.log('end');
    location.reload();
            },
            error: function (data) {
              alert(data.message);
                  alert('try again?');
    console.log('end');
    location.reload();
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
};

function new_state(x, sol){
    var d;
    for(d=0; d<x.length; d++){ x[d] = parseInt(x[d])}
    var initial = x
    var i;
    console.log(sol.length)
    console.log(x)
    for(i=0; i<sol.length; i++)
    {
        if (sol[i] == 'left')
        {
            z_loc = getind(initial)
            temp = initial[z_loc-1];
            initial[z_loc-1] = 0;
            initial[z_loc] = parseInt(temp);
            console.log(initial)
            moveit(initial);
            var tiles = initial

    var renderTiles = function ($newTarget) {
        $target = $newTarget || $target;

        var $ul = $("<ul>", {
            "class": "n-puzzle",
            "id": "navbar"
        })

        $(tiles).each(function (index) {
            var correct = index + 1 == this;
            var cssClass = this == 0 ? "empty" : (correct ? "correct" : "incorrect");

            var $li = $("<li>", {
                "class": cssClass,
                "data-tile": this,
            });
            $li.text(this);
            $ul.append($li);
        })
    }

            renderTiles($('.eight-puzzle'));
            alert('perform next move')
        }
        else if (sol[i] == 'right')
        {
            z_loc = getind(initial)
            temp = initial[z_loc+1];
            initial[z_loc+1] = 0;
            initial[z_loc] = parseInt(temp);
            console.log(initial)
            moveit(initial);
            alert('perform next move')
        }
        else if(sol[i] == 'up')
        {
            z_loc = getind(initial)
            temp = initial[z_loc-3];
            initial[z_loc-3] = 0;
            initial[z_loc] = parseInt(temp);
            console.log(initial)
            moveit(initial);
            alert('perform next move')  
        }
        else if (sol[i] == 'down')
        {
            z_loc = getind(initial)
            temp = initial[z_loc+3];
            initial[z_loc+3] = 0;
            initial[z_loc] = parseInt(temp);
            console.log(initial)
            moveit(initial);
            alert('perform next move')  
        }
    }
    alert('try again?');
    console.log('end');
    location.reload();
};

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

        $target.html($ul);
    };

    var shiftTile = function (event) {
        // var index = event.data.index;

        // var targetIndex = -1;
        // if (index - 1 >= 0 && tiles[index - 1] == 0) { // check left
        //     targetIndex = index - 1;
        // } else if (index + 1 < tiles.length && tiles[index + 1] == 0) { // check right
        //     targetIndex = index + 1;
        // } else if (index - 3 >= 0 && tiles[index - 3] == 0) { //check up
        //     targetIndex = index - 3;
        // } else if (index + 3 < tiles.length && tiles[index + 3] == 0) { // check down
        //     targetIndex = index + 3;
        // }

        // if (targetIndex != -1) {
        //     var temp = tiles[targetIndex];
        //     tiles[targetIndex] = tiles[index];
        //     tiles[index] = temp;
            renderTiles();
        // }
        event.preventDefault();
    };
   renderTiles($('.eight-puzzle'));

};


