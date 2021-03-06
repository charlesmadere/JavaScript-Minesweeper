var board;


function cheatToggle()
{
	if (!board.isGameOver && !board.areFlagsEnabled)
	{
		board.isCheatEnabled = !board.isCheatEnabled;

		if (board.isCheatEnabled)
		{
			$("#cheatToggle").html("Cheat: On");
		}
		else
		{
			$("#cheatToggle").html("Cheat: Off");
		}

		board.flush();
	}
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
	if (!board.isGameOver && !board.isCheatEnabled)
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
	if (!board.isGameOver)
	{
		board.validate();
	}
}


function Board(xLength, yLength)
{
	this.xLength = xLength;
	this.yLength = yLength;

	this.areFlagsEnabled = false;
	this.isCheatEnabled = false;
	this.isGameOver = false;
	this.totalBombsOnBoard = 10;

	$("#flagToggle").html("Flags: Off");
	$("#cheatToggle").html("Cheat: Off");

	this.createPositions();
	this.placeBombs();
	this.findPositionValues();
}


Board.prototype.cheatFlush = function(position, positionElement)
{
	if (position.hasBomb)
	{
		positionElement.addClass("boardBomb");
		positionElement.html("B");
	}
	else
	{
		positionElement.html(position.nearbyBombs);
	}
}


Board.prototype.clickPosition = function(coordinate)
{
	if (!this.isGameOver && !this.isCheatEnabled)
	{
		var position = this.positions[coordinate.x][coordinate.y];

		if (this.areFlagsEnabled)
		{
			position.flagToggle();
		}
		else if (!position.hasBeenClicked)
		{
			if (position.nearbyBombs == 0)
			{
				var bomblessAdjacentPositions = new Array();
				bomblessAdjacentPositions.push(position);

				do
				{
					position = bomblessAdjacentPositions.pop();
					var x = position.coordinate.x;
					var y = position.coordinate.y;

					position.setClicked();

					if (position.nearbyBombs == 0)
					{
						if (x + 1 < this.xLength && !this.positions[x + 1][y].hasBeenClicked && !this.positions[x + 1][y].hasBomb)
						{
							bomblessAdjacentPositions.push(this.positions[x + 1][y]);
						}

						if (x - 1 >= 0 && !this.positions[x - 1][y].hasBeenClicked && !this.positions[x - 1][y].hasBomb)
						{
							bomblessAdjacentPositions.push(this.positions[x - 1][y]);
						}

						if (y + 1 < this.yLength && !this.positions[x][y + 1].hasBeenClicked && !this.positions[x][y + 1].hasBomb)
						{
							bomblessAdjacentPositions.push(this.positions[x][y + 1]);
						}

						if (y - 1 >= 0 && !this.positions[x][y - 1].hasBeenClicked && !this.positions[x][y - 1].hasBomb)
						{
							bomblessAdjacentPositions.push(this.positions[x][y - 1]);
						}
					}
				}
				while (bomblessAdjacentPositions.length >= 1);
			}
			else
			{
				position.setClicked();
			}
		}

		this.flush();
	}
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


Board.prototype.findPositionValues = function()
{
	for (var x = 0; x < this.xLength; ++x)
	{
		for (var y = 0; y < this.yLength; ++y)
		{
			var position = this.positions[x][y];
			var nearbyBombs = 0;

			if (!position.hasBomb)
			{
				if (x + 1 < this.xLength && this.positions[x + 1][y].hasBomb)
				// check position right for bomb
				{
					++nearbyBombs;
				}

				if (x - 1 >= 0 && this.positions[x - 1][y].hasBomb)
				// check position left for bomb
				{
					++nearbyBombs;
				}

				if (y + 1 < this.yLength && this.positions[x][y + 1].hasBomb)
				// check position above for bomb
				{
					++nearbyBombs;
				}

				if (y - 1 >= 0 && this.positions[x][y - 1].hasBomb)
				// check position below for bomb
				{
					++nearbyBombs;
				}

				if (x + 1 < this.xLength && y + 1 < this.yLength && this.positions[x + 1][y + 1].hasBomb)
				// check position top-right for bomb
				{
					++nearbyBombs;
				}

				if (x + 1 < this.xLength && y - 1 >= 0 && this.positions[x + 1][y - 1].hasBomb)
				// check position bottom-right for bomb
				{
					++nearbyBombs;
				}

				if (x - 1 >= 0 && y + 1 < this.yLength && this.positions[x - 1][y + 1].hasBomb)
				// check position top-left for bomb
				{
					++nearbyBombs;
				}

				if (x - 1 >= 0 && y - 1 >= 0 && this.positions[x - 1][y - 1].hasBomb)
				// check position bottom-left for bomb
				{
					++nearbyBombs;
				}
			}

			position.nearbyBombs = nearbyBombs;
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
			positionElement.removeClass("boardPositionClicked");
			positionElement.removeClass("boardBomb");
			positionElement.removeClass("boardFlag");

			if (this.isCheatEnabled)
			{
				this.cheatFlush(position, positionElement);
			}
			else
			{
				this.regularFlush(position, positionElement);
			}
		}
	}
}


Board.prototype.gameWasLost = function()
{
	this.isGameOver = true;
	this.isCheatEnabled = true;
	this.flush();
	gameWasLost();
}


Board.prototype.gameWasWon = function()
{
	this.isGameOver = true;
	this.isCheatEnabled = true;
	this.flush();
	gameWasWon();
}


Board.prototype.placeBombs = function()
{
	var bombsToPlace = this.totalBombsOnBoard;

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


Board.prototype.regularFlush = function(position, positionElement)
{
	if (position.hasBeenClicked)
	{
		positionElement.addClass("boardPositionClicked");

		if (position.hasFlag)
		{
			positionElement.addClass("boardFlag");
			positionElement.html("F");
		}
		else
		{
			if (position.hasBomb)
			{
				positionElement.addClass("boardBomb");
				positionElement.html("B");
				this.gameWasLost();
			}
			else
			{
				positionElement.html(position.nearbyBombs);
			}
		}
	}
}


Board.prototype.validate = function()
{
	var flaggedBombs = 0;

	for (var x = 0; x < this.xLength; ++x)
	{
		for (var y = 0; y < this.yLength; ++y)
		{
			var position = this.positions[x][y];

			if (position.hasFlag && position.hasBomb)
			{
				++flaggedBombs;
			}
		}
	}

	if (flaggedBombs == this.totalBombsOnBoard)
	{
		this.gameWasWon();
	}
}
