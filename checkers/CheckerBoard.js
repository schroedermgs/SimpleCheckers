function CheckerBoard(containerNode, width, height, handleClick){
    this.buttons = [];
    for (var i=0; i<width; i++)
        this.buttons.push([]);
    containerNode.innerHTML = "";
    var table = document.createElement("table");
    for (var y=0; y<height; y++){
        var row = document.createElement("tr");
        for (var x=0; x<width; x++){
            var cell = document.createElement("td");
            var button = document.createElement("button");
            cell.className = "board_cell white";
            button.className = "white";
            button.onclick = (function(x,y){
                return function(){ handleClick(x,y) };
            })(x,y);
            this.buttons[x][y] = button;
            if (!((x%2==0&&y%2==0)||(x%2!=0&&y%2!=0))){
                cell.className = "board_cell gray";
                button.className = "gray";
                if (y<3){
                    CheckerPiece(button,"black");
                }
                if (y>4){
                    CheckerPiece(button,"red");
                }
            };
            cell.appendChild(button);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    containerNode.appendChild(table);

    this.getButton = function(x,y){
        return this.buttons[x][y];
    }

}
