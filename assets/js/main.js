$(document).ready(function()
{
	measureBoard();
	newBoard();
});


function gameWasLost()
{
	alert("You lost the game! Click \"New Game\" below to start a new game.");
}


function gameWasWon()
{
	alert("You won the game! Click \"New Game\" below to start a new game.");
}
