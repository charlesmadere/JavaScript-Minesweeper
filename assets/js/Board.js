var board;


function createBoard(xLength, yLength)
{
	board = new Board(xLength, yLength);
}


function measureBoard()
{
	var board = $("#board");
	var body = $("body");
	var bodyWidth = body.width();
	board.height(bodyWidth);
	board.width(bodyWidth);

	var rows = board.children();
	var rowHeight = bodyWidth / 8;

	for (var i = 0; i < rows.length; ++i)
	{
		var row = rows[i];

		if (row.className === "boardRow")
		{
			row.style.height = rowHeight + "px";
			var positions = row.childNodes;

			for (var j = 0; j < positions.length; ++j)
			{
				var position = positions[j];
				var piece = position.childNodes;

				for (var k = 0; k < piece.length; ++k)
				{
					var pieceImage = piece[k];
				}
			}
		}
	}
}


function selectBoardPosition(position)
{
	var x = Math.round(position.getAttribute("data-x"));
	var y = Math.round(position.getAttribute("data-y"));
	var coordinate = new Coordinate(x, y);
	alert(coordinate.x + " " + coordinate.y);
}


function Board(xLength, yLength)
{
	this.xLength = xLength;
	this.yLength = yLength;

	this.preparePositions();
	this.placeBombs();
}


Board.prototype.placeBombs = function()
{

}


Board.prototype.preparePositions = function()
{
	this.positions = new Array(this.xLength);

	for (var x = 0; x < xLength; ++x)
	{
		this.positions[x] = new Array(this.yLength);

		for (var y = 0; y < yLength; ++y)
		{
			this.positions[x][y] = new Position(x, y);
		}
	}
}
