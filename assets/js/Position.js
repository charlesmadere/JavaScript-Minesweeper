function Position(x, y)
{
	this.coordinate = new Coordinate(x, y);

	this.hasBeenClicked = false;
	this.hasBomb = false;
	this.hasFlag = false;
	this.nearbyBombs = 0;
}


Position.prototype.placeBomb = function()
{
	this.hasBomb = true;
}


Position.prototype.placeFlag = function()
{
	this.hasFlag = true;
}


Position.prototype.setClicked = function()
{
	this.hasBeenClicked = true;
}
