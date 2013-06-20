var board;


function cheatBoard()
{

}


function clickBoardPosition(position)
{
	var x = Math.round(position.getAttribute("data-x"));
	var y = Math.round(position.getAttribute("data-y"));
	var coordinate = new Coordinate(x, y);

	board.clickPosition(coordinate);
}


function findBoardPosition(coordinate)
{
	return $("[data-x=" + coordinate.x + "][data-y=" + coordinate.y + "]");
}


function flagToggle()
{
	board.areFlagsEnabled = !board.areFlagsEnabled;

	if (board.areFlagsEnabled)
	{
		$("#flagToggle").html("Flags: On");
	}
	else
	{
		$("#flagToggle").html("Flags: Off");
	}
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


function validateBoard()
{

}


function Board(xLength, yLength)
{
	this.xLength = xLength;
	this.yLength = yLength;

	this.areFlagsEnabled = false;

	this.createPositions();
	this.placeBombs();
	this.setPositionValues();
}


Board.prototype.clickPosition = function(coordinate)
{
	var position = this.positions[coordinate.x][coordinate.y];

	if (!position.hasBeenClicked)
	{
		if (this.areFlagsEnabled)
		{
			position.placeFlag();
		}
		else
		{
			position.setClicked();
		}
	}

	this.flush();
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
			var position = this.positions[x][y];
			var coordinate = new Coordinate(x, y);
			var positionElement = findBoardPosition(coordinate);

			positionElement.html("");

			if (position.hasBeenClicked)
			{
				positionElement.addClass("boardPositionClicked");

				if (position.hasBomb)
				{
					positionElement.addClass("boardBomb");
					positionElement.html("B");
				}
				else
				{
					positionElement.html(position.number);
				}
			}
			else
			{
				if (position.hasFlag)
				{
					positionElement.addClass("boardFlag");
					positionElement.html("F");
				}
			}
		}
	}
}


Board.prototype.placeBombs = function()
{
	var bombsToPlace = 10;

	while (bombsToPlace >= 1)
	{
		var x = Math.floor(Math.random() * 8);
		var y = Math.floor(Math.random() * 8);

		if (!this.positions[x][y].hasBomb)
		{
			this.positions[x][y].placeBomb();
			--bombsToPlace;
		}
	}
}


Board.prototype.setPositionValues = function()
{

}
