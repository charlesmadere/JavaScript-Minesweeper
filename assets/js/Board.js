var board;


function cheatBoard()
{

}


function findBoardPosition(coordinate)
{
	return $("[data-x=" + coordinate.x + "][data-y=" + coordinate.y + "]");
}


function measureBoard()
{
	var body = $("body");
	var bodyWidth = body.width();

	var board = $("#board");
	board.height(bodyWidth);
	board.width(bodyWidth);

	var rows = board.children();
	var rowHeight = bodyWidth / 8;

	for (var i = 0; i < rows.length; ++i)
	{
		var row = rows[i];
		row.style.height = rowHeight + "px";
	}
}


function newBoard()
{
	board = new Board(8, 8);
	board.flush();
}


function selectBoardPosition(position)
{
	var x = Math.round(position.getAttribute("data-x"));
	var y = Math.round(position.getAttribute("data-y"));
	var coordinate = new Coordinate(x, y);
	var positionElement = findBoardPosition(coordinate);
}


function validateBoard()
{

}


function Board(xLength, yLength)
{
	this.xLength = xLength;
	this.yLength = yLength;

	this.createPositions();
	this.placeBombs();
	this.setPositionValues();
}


Board.prototype.createPositions = function()
{
	this.positions = new Array(this.xLength);

	for (var x = 0; x < this.xLength; ++x)
	{
		this.positions[x] = new Array(this.yLength);

		for (var y = 0; y < this.yLength; ++y)
		{
			this.positions[x][y] = new Position(x, y);
		}
	}
}


Board.prototype.flush = function()
{
	for (var x = 0; x < this.xLength; ++x)
	{
		for (var y = 0; y < this.yLength; ++y)
		{
			var coordinate = new Coordinate(x, y);
			var positionElement = findBoardPosition(coordinate);
			positionElement.html(coordinate.x);
		}
	}
}


Board.prototype.placeBombs = function()
{

}


Board.prototype.setPositionValues = function()
{

}
