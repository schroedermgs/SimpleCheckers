
function CheckerPiece(buttonLocation, team, rank){
    var thisPiece = this;
    this.team = team;
    this.rank = rank;
    let pieceClasses = "";
    this.image = document.createElement("img");
    if (this.team=="black" && this.rank!="king"){
        this.image.setAttribute("src","blackpiece.png");
        pieceClasses = "black-piece";
    }else if(this.team=="black" && this.rank=="king"){
        this.image.setAttribute("src","blackking.png");
        pieceClasses = "black-piece king";
    }else if(this.team!="black" && this.rank!="king"){
        this.image.setAttribute("src","redpiece.png");
        pieceClasses = "red-piece";
    }else if(this.team!="black" && this.rank=="king"){
        this.image.setAttribute("src","redking.png");
        pieceClasses = "red-piece king";
    }
    this.image.className = pieceClasses;
    buttonLocation.appendChild(this.image);
}


function Checkers() {
    var thisObj = this;
    this.redIsNext = true;
    this.numberOfReds = 12;
    this.numberOfBlacks = 12;
    this.selected = undefined;
    this.selectedCoordinates = [undefined,undefined];
    this.skipping = false;
    var gameBoard = new CheckerBoard(document.getElementById("gameArea"), 8, 8, function(x,y){ thisObj.click(x,y)} );
    this.tiles = [[],[],[],[],[],[],[],[]] ;
    for (var y=0; y<8; y++){
        for(var x=0; x<8; x++){
            this.tiles[y][x] = null;
            if( (x%2==0&&y%2!=0)||(x%2!=0&&y%2==0) ){
                if(y<3){
                    this.tiles[y][x] = "black-piece";
                }
                if(y>4){
                    this.tiles[y][x] = "red-piece";
                }
            }
        }
    }

    this.isLegalMove = function(x,y){
        let targetButton = gameBoard.getButton(x,y);
        let allowedMoves = [];
        if(this.selected!==undefined && this.redIsNext){
            try{
                left = gameBoard.getButton( this.selectedCoordinates[0]-1,this.selectedCoordinates[1]+1 );
                if (left.children[0]===undefined){
                    allowedMoves.push(left);
                }
            }catch{}
            try{
                rght = gameBoard.getButton( this.selectedCoordinates[0]+1,this.selectedCoordinates[1]+1 );
                if (rght.children[0]===undefined){
                    allowedMoves.push(rght);
                }
            }catch{}
            if(this.selected.children[0].className.includes("king")){
                try{
                    leftOpposite = gameBoard.getButton( this.selectedCoordinates[0]-1,this.selectedCoordinates[1]-1);
                    if(leftOpposite.children[0]===undefined){
                        allowedMoves.push(leftOpposite);
                    }
                }catch{}
                try{
                    rghtOpposite = gameBoard.getButton( this.selectedCoordinates[0]+1,this.selectedCoordinates[1]-1);
                    if(rghtOpposite.children[0]===undefined){
                        allowedMoves.push(rghtOpposite);
                    }
                }catch{}
            }
        }
        if(this.selected!==undefined && !this.redIsNext){
            try{
                left = gameBoard.getButton( this.selectedCoordinates[0]-1,this.selectedCoordinates[1]-1 );
                if (left.children[0]===undefined){
                    allowedMoves.push(left);
                }
            }catch{}
            try{
                rght = gameBoard.getButton( this.selectedCoordinates[0]+1,this.selectedCoordinates[1]-1 );
                if (rght.children[0]===undefined){
                    allowedMoves.push(rght);
                }
            }catch{}
            if(this.selected.children[0].className.includes("king")){
                try{
                    leftOpposite = gameBoard.getButton( this.selectedCoordinates[0]-1,this.selectedCoordinates[1]+1);
                    if(leftOpposite.children[0]===undefined){
                        allowedMoves.push(leftOpposite);
                    }
                }catch{}
                try{
                    rghtOpposite = gameBoard.getButton( this.selectedCoordinates[0]+1,this.selectedCoordinates[1]+1);
                    if(rghtOpposite.children[0]===undefined){
                        allowedMoves.push(rghtOpposite);
                    }
                }catch{}
            }
        }
        if (allowedMoves.includes(targetButton)){
            return true;
        }else{
            return false;
        }
    }


    this.getLegalSkips = function(){
        let allowedSkips = [];
        if(this.selected!==undefined && this.redIsNext ){
            try{
                left = gameBoard.getButton(this.selectedCoordinates[0]-1,this.selectedCoordinates[1]+1);
                leftAdjacent = gameBoard.getButton(this.selectedCoordinates[0]-2,this.selectedCoordinates[1]+2);
                if(left.children[0]!==undefined && left.children[0].className.includes("red-piece") && leftAdjacent.children[0]===undefined){
                    allowedSkips.push(leftAdjacent);
                }
            }catch{}
            try{
                rght = gameBoard.getButton(this.selectedCoordinates[0]+1,this.selectedCoordinates[1]+1);
                rghtAdjacent = gameBoard.getButton(this.selectedCoordinates[0]+2,this.selectedCoordinates[1]+2);
                if(rght.children[0]!==undefined && rght.children[0].className.includes("red-piece") && rghtAdjacent.children[0]===undefined){
                    allowedSkips.push(rghtAdjacent);
                }
            }catch{}
            if(this.selected.children[0].className.includes("king")){
                try{
                    leftOpposite = gameBoard.getButton(this.selectedCoordinates[0]-1,this.selectedCoordinates[1]-1);
                    leftAdjacentOpposite = gameBoard.getButton(this.selectedCoordinates[0]-2,this.selectedCoordinates[1]-2);
                    if(leftOpposite.children[0]!==undefined && leftOpposite.children[0].className.includes("red-piece") && leftAdjacentOpposite.children[0]===undefined){
                        allowedSkips.push(leftAdjacentOpposite);
                    }
                }catch{}
                try{
                    rghtOpposite = gameBoard.getButton(this.selectedCoordinates[0]+1,this.selectedCoordinates[1]-1);
                    rghtAdjacentOpposite = gameBoard.getButton(this.selectedCoordinates[0]+2,this.selectedCoordinates[1]-2);
                    if(rghtOpposite.children[0]!==undefined && rghtOpposite.children[0].className.includes("red-piece") && rghtAdjacentOpposite.children[0]===undefined){
                        allowedSkips.push(rghtAdjacentOpposite);
                    }
                }catch{}
            }
        }
        if(this.selected!==undefined && !this.redIsNext ){
            try{
                left = gameBoard.getButton(this.selectedCoordinates[0]-1,this.selectedCoordinates[1]-1);
                leftAdjacent = gameBoard.getButton(this.selectedCoordinates[0]-2,this.selectedCoordinates[1]-2);
                if(left.children[0]!==undefined && left.children[0].className.includes("black-piece") && leftAdjacent.children[0]===undefined){
                    allowedSkips.push(leftAdjacent);
                }
            }catch{}
            try{
                rght = gameBoard.getButton(this.selectedCoordinates[0]+1,this.selectedCoordinates[1]-1);
                rghtAdjacent = gameBoard.getButton(this.selectedCoordinates[0]+2,this.selectedCoordinates[1]-2);
                if(rght.children[0]!==undefined && rght.children[0].className.includes("black-piece") && rghtAdjacent.children[0]===undefined){
                    allowedSkips.push(rghtAdjacent);
                }
            }catch{}
            if(this.selected.children[0].className.includes("king")){
                try{
                    leftOpposite = gameBoard.getButton(this.selectedCoordinates[0]-1,this.selectedCoordinates[1]+1);
                    leftAdjacentOpposite = gameBoard.getButton(this.selectedCoordinates[0]-2,this.selectedCoordinates[1]+2);
                    if(leftOpposite.children[0]!==undefined && leftOpposite.children[0].className.includes("black-piece") && leftAdjacentOpposite.children[0]===undefined){
                        allowedSkips.push(leftAdjacentOpposite);
                    }
                }catch{}
                try{
                    rghtOpposite = gameBoard.getButton(this.selectedCoordinates[0]+1,this.selectedCoordinates[1]+1);
                    rghtAdjacentOpposite = gameBoard.getButton(this.selectedCoordinates[0]+2,this.selectedCoordinates[1]+2);
                    if(rghtOpposite.children[0]!==undefined && rghtOpposite.children[0].className.includes("black-piece") && rghtAdjacentOpposite.children[0]===undefined){
                        allowedSkips.push(rghtAdjacentOpposite);
                    }
                }catch{}
            }
        }
        return allowedSkips;
    }


    this.click = function(x,y){

        var button = gameBoard.getButton(x,y);
        if (this.selected===undefined && button.children[0]!=undefined && ((this.redIsNext && button.children[0].className.includes("black-piece"))||(!this.redIsNext && button.children[0].className.includes("red-piece"))) ){
            this.selected = button;
            this.selectedCoordinates = [x,y];
            this.selected.className = "green";
        } else if(this.selected!=undefined && this.selected===gameBoard.getButton(x,y) && button.children[0].className.includes("piece") && !this.skipping){
            this.selected.className = "gray";
            this.selected = undefined;
            this.selectedCoordinates = [undefined,undefined];
        } else if(this.selected!=undefined && this.selected===gameBoard.getButton(x,y) && button.children[0].className.includes("piece") && this.skipping){
            this.skipping = false;
            this.selected.className = "gray";
            this.selected = undefined;
            this.selectedCoordinates = [undefined,undefined];
            this.redIsNext = !this.redIsNext;
        }else if(this.selected!==undefined && this.isLegalMove(x,y) ){
            if(this.redIsNext){
                if(this.selected.children[0].className.includes("king")){
                    CheckerPiece(button,"black","king");
                }else{
                    y==7 ? CheckerPiece(button,"black","king") : CheckerPiece(button,"black","pawn");
                }
            }else{
                if(this.selected.children[0].className.includes("king")){
                    CheckerPiece(button,"red","king");
                }else{
                    y==0 ? CheckerPiece(button,"red","king") : CheckerPiece(button,"red","pawn");
                }
            }
            this.tiles[y][x] = button.children[0].className;
            this.tiles[this.selectedCoordinates[1]][this.selectedCoordinates[0]] = null;
            this.selected.innerHTML = "";
            this.selected.className = "gray";
            this.selected = undefined;
            this.selectedCoordinates = [undefined,undefined];
            this.redIsNext = !this.redIsNext;
        }else if(this.selected!==undefined && this.getLegalSkips().includes(button) ){
            this.skipping = true;
            skippedButton = gameBoard.getButton( (this.selectedCoordinates[0]+x)/2, (this.selectedCoordinates[1]+y)/2 );
            skippedButton.children[0].className.includes("red-piece") ? this.numberOfReds-=1 : this.numberOfBlacks-=1;
            skippedButton.innerHTML = "";
            if(this.redIsNext){
                if(this.selected.children[0].className.includes("king")){
                    CheckerPiece(button,"black","king");
                }else{
                    y==7 ? CheckerPiece(button,"black","king") : CheckerPiece(button,"black","pawn");
                }
            }else{
                if(this.selected.children[0].className.includes("king")){
                    CheckerPiece(button,"red","king");
                }else{
                    y==0 ? CheckerPiece(button,"red","king") : CheckerPiece(button,"red","pawn");
                }
            }
            this.tiles[y][x] = button.children[0].className;
            this.tiles[(this.selectedCoordinates[1]+y)/2][(this.selectedCoordinates[0]+x)/2] = null;
            this.tiles[this.selectedCoordinates[1]][this.selectedCoordinates[0]] = null;
            this.selected.innerHTML = "";
            this.selected.className = "gray";
            this.selected = button;
            this.selectedCoordinates = [x,y];
            this.selected.className = "green";
            if (this.getLegalSkips().length==0){
                this.selected.className = "gray";
                this.selected = undefined;
                this.selectedCoordinates = [undefined,undefined];
                this.skipping = false;
                this.redIsNext = !this.redIsNext;
            }
        }
        if(this.numberOfBlacks==0 || this.numberOfReds==0){
            this.numberOfBlacks==0 ? alert("RED HAS WON!!! CONGRATS!!!") : alert("BLACK HAS WON!!! CONGRATS!!!");
        }
    }
}


