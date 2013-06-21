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


Position.prototype.setClicked = function(areFlagsEnabled)
{
	this.hasFlag = areFlagsEnabled;
	this.hasBeenClicked = true;
}
