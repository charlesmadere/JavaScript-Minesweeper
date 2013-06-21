function Position(x, y)
{
	this.coordinate = new Coordinate(x, y);

	this.hasBeenClicked = false;
	this.hasBomb = false;
	this.hasFlag = false;
	this.nearbyBombs = 0;
}


Position.prototype.flagToggle = function()
{
	this.hasBeenClicked = !this.hasBeenClicked;
	this.hasFlag = !this.hasFlag;
}


Position.prototype.placeBomb = function()
{
	this.hasBomb = true;
}


Position.prototype.setClicked = function()
{
	this.hasBeenClicked = true;
}
