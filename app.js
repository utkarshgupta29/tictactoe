var board,activePlayerSymbol,activePlayerNumber,player1Symbol,player2Symbol,size,gamePlaying;

function init(){
	board = [['','',''],['','',''],['','','']];
	activePlayerSymbol = 'X';
	activePlayerNumber = 1;
	document.querySelector('.play-again').style.display = 'none';
			
	for(var i=0;i<3;i++){
		for(var j=0;j<3;j++){
			document.getElementById('cell'+i+'-'+j).textContent = board[i][j];
			document.getElementById('cell'+i+'-'+j).addEventListener('click',makeATurn);
			document.getElementById('cell'+i+'-'+j).classList.remove('highlight');
		}
	}
	document.querySelector('.player').textContent = 'player 1';
	document.querySelector('.player').classList.remove('winner');
	gamePlaying = true;
	size = 0;
}

init();

function makeATurn(){
	var id = event.target.id;
	var row = Number(id.charAt(id.length-3));
	var col = Number(id.charAt(id.length-1));
	
	if(gamePlaying && board[row][col]===''){
		board[row][col]=activePlayerSymbol;
		size++;
		document.getElementById(id).textContent = activePlayerSymbol;
		if(isWinner()){
			document.querySelector('.player').textContent = 'player '+activePlayerNumber+" Wins";
			document.querySelector('.player').classList.add('winner');
			gamePlaying = false;
			document.querySelector('.play-again').style.display = 'block';
		}else{
			if(size===9)
			{
				document.querySelector('.player').textContent = 'Game Draw';
				gamePlaying = false;
				document.querySelector('.play-again').style.display = 'block';
				return;
			}
			activePlayerSymbol = (activePlayerSymbol==='X'?'O':'X');
			activePlayerNumber = (activePlayerSymbol==='X'?1:2);


			document.querySelector('.player').textContent = 'player '+activePlayerNumber;
		}
	}

}
document.querySelector('.play-again').addEventListener('click',init);

function isWinner(){
	var count;

	for(var j=0;j<3;j++){
		count = 0;
		for(var i=0;i<3;i++){
			if(board[j][i]!==activePlayerSymbol){
				count++;
				break;
			}
		}
		if(count==0){
			for(var i=0;i<3;i++){
				document.getElementById('cell'+j+'-'+i).classList.add('highlight');
			}

			return true;
		}	
	}
	for(var j=0;j<3;j++){
		count = 0;
		for(var i=0;i<3;i++){
			if(board[i][j]!==activePlayerSymbol){
				count++;
				break;
			}
		}
		if(count==0){
			for(var i=0;i<3;i++){
				document.getElementById('cell'+i+'-'+j).classList.add('highlight');
			}

			return true;
		}	
	}
	count = 0;
	for(var i=0;i<3;i++){
		if(board[i][i]!==activePlayerSymbol){
			count++;
			break;
		}
	}
	if(count==0){
		for(var i=0;i<3;i++){
			document.getElementById('cell'+i+'-'+i).classList.add('highlight');
		}
	
		return true;
	}	
	count = 0;
	for(var i=0;i<3;i++){
		if(board[i][2-i]!==activePlayerSymbol){
			count++;
			break;
		}
	}
	if(count==0){
		for(var i=0;i<3;i++){
			document.getElementById('cell'+i+'-'+(2-i)).classList.add('highlight');
		}
		return true;
	}	
	return false;
}

