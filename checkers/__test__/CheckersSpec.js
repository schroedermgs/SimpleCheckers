describe("Checkers", function(){
	const gameArea = document.createElement("div");
	gameArea.id = "gameArea";
	gameArea.hidden = true;
	document.body.appendChild(gameArea);
	let gameBoard;
	let game;

	beforeEach(function() {
		gameArea.innerHTML = "";
		gameBoard = new CheckerBoard(gameArea,8,8,function(x,y){gameBoard.click(x,y)});
		CheckerBoard = jasmine.createSpy().and.returnValue(gameBoard);
		alert = jasmine.createSpy();
		game = new Checkers();
	});

	describe("constructor", function(){
		it("will create an 8x8 CheckerBoard in the 'gameArea' div", function(){
			expect(CheckerBoard).toHaveBeenCalledWith(gameArea,8,8,jasmine.any(Function));
		});
		it("starts on black's turn",function(){
			expect(game.redIsNext).toBe(true);
		});
		it("starts with 12 pieces per team",function(){
			expect(game.numberOfReds).toBe(12);
			expect(game.numberOfBlacks).toBe(12);
		});
		it("initializes pieces in the first row in only gray (even-odd) spaces", function(){
			for(var i=0; i<8; i++){
				i%2!=0 ? expect(game.tiles[0][i]).toBe("black-piece") : expect(game.tiles[0][i]).toBe(null);
			}
		});
		it("does not have any piece selected",function(){
			expect(game.selected).toBe(undefined);
		});
	});

	describe("click",function(){
		it("selects nothing if a blank space is clicked",function(){
			game.click(0,0);
			expect(game.selected).toBe(undefined);
		});
		it("selects and de-selects a black piece at position (7,2) as black goes first",function(){
			game.click(7,2);
			expect(game.selected).not.toBe(undefined);
			expect(game.selected.className).toBe("green");
			game.click(7,2);
			expect(game.selected).toBe(undefined);
		});
		it("moves a black piece from position (3,2) to (4,3) and switch to red's turn",function(){
			game.click(3,2);
			game.click(4,3);
			expect(game.selected).toBe(undefined);
			expect(game.redIsNext).toBe(false);
		});
		it("selects a red piece when it is red's turn",function(){
			game.redIsNext = false;
			game.click(4,5);
			expect(game.selected).not.toBe(undefined);
		});
		it("does not select a red piece on black's turn",function(){
			game.click(4,5);
			expect(game.selected).toBe(undefined);
		});
		it("does not select a black piece on red's turn", function(){
			game.redIsNext = false;
			game.click(1,0);
			expect(game.selected).toBe(undefined);
		});
		it("does not move piece into white spaces",function(){
			game.click(7,2);
			game.click(7,3);
			expect(game.selected).not.toBe(undefined);
			expect(game.selectedCoordinates).toEqual([7,2]);
		});
		it("does not skip into legal space without an enemy piece",function(){
			game.click(7,2);
			game.click(5,4);
			expect(game.selected).not.toBe(undefined);
			expect(game.selectedCoordinates).toEqual([7,2]);
		});
		it("does not move a piece into an occupied space",function(){
			game.click(0,1);
			game.click(1,2);
			expect(game.selectedCoordinates).toEqual([0,1]);
		});
	})
})