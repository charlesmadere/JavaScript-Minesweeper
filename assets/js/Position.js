function Position(x, y)
{
	this.coordinate = new Coordinate(x, y);

	this.clicked = false;
	this.hasBomb = false;
}


Position.prototype.setBomb = function()
{
	this.hasBomb = true;
}


Position.prototype.setClicked = function()
{
	this.clicked = true;
}
