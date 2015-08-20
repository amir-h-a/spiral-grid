/**
 * Created by amir hossein ahmadi on 8/12/2015.
 */

(function () {

    angular.module('com.aha.ng.directive',[])
        .directive('spiralGrid',spiralGrid);

    function spiralGrid() {

        return {

            replace : true,
            restrict : 'E',
            scope : {
                model : "=model",
                columns : "@"
            },
            link : function(scope, element, attrs){

                var model = scope.model;
                var columns = scope.columns.split(',');
                var length = model.length;
                var spiral_html = "<div class='spiral'>";
                var color_step = Math.floor(255 / length);
                var item_color = 0;
                var spiral_arr = createSpiralArray(length,1);
                for(i=0;i<spiral_arr.length;++i) {
                    for (j = 0; j < spiral_arr.length; ++j) {
                        if(spiral_arr[i][j] != 0) {
                            item_color = color_step * spiral_arr[i][j];
                            spiral_html += "<div class='spiral_item' style='background-color: rgb(" + item_color + ",0,0);'>";
                            for(k=0;k<columns.length;++k) {
                                spiral_html += model[spiral_arr[i][j] - 1][columns[k]];
                                spiral_html += "<br/>";
                            }
                            spiral_html += "</div>";
                        }else{
                            spiral_html += "<div class='spiral_item' style='visibility: hidden'></div>";
                        }
                    }

                    spiral_html +="<div style='clear:both'></div>";
                }

                spiral_html += "</div>";
                element.html(spiral_html);

            }

        };
    }


    function createSpiralArray(length,step)
    {
        var array_size = Math.ceil(Math.sqrt(length)) + 1;
        array_size *= step;
        var spiral_arr = new Array(array_size);

        for(var i=0;i<array_size;++i)
        {
            spiral_arr[i] = new Array(array_size);
        }

        for(var i=0;i<array_size;++i)
            for(var j=0;j<array_size;++j) {
                spiral_arr[i][j] = 0;
            }

        var middle = Math.floor(array_size / 2);
        var xmax = 1;
        var ymax = 1;
        var count = 1;
        var direction_count = 0;
        //directions left,right,up,down;
        var directions = ["up","right","down","left"];
        var direction = directions[direction_count];

        spiral_arr[middle][middle] = count;
        ++count;
        var x = middle;
        var y = middle;
        var finish = false;
        while(!finish) {

            if (!finish && (direction == "right")) {
                for (var i = 0; i < xmax; ++i) {
                    ++x;
                    spiral_arr[x][y] = count;
                    ++count;
                    if(count > length) {
                        finish = true;
                        break;
                    }
                }
                xmax += step;
                direction = directions[++direction_count % 4];
            }

            if (!finish && (direction == "down")) {
                for (var i = 0; i < ymax; ++i) {
                    ++y;
                    spiral_arr[x][y] = count;
                    ++count;
                    if(count > length) {
                        finish = true;
                        break;
                    }
                }
                ymax += step;
                direction = directions[++direction_count % 4];
            }

            if (!finish && (direction == "left")) {
                for (var i = 0; i < xmax; ++i) {
                    --x;
                    spiral_arr[x][y] = count;
                    ++count;
                    if(count > length) {
                        finish = true;
                        break;
                    }
                }
                xmax += step;
                direction = directions[++direction_count % 4];
            }

            if (!finish && (direction == "up")) {
                for (var i = 0; i < ymax; ++i) {
                    --y;
                    spiral_arr[x][y] = count;
                    ++count;
                    if(count > length) {
                        finish = true;
                        break;
                    }
                }
                ymax += step;
                direction = directions[++direction_count % 4];
            }

        }
        return spiral_arr;
    }

}());