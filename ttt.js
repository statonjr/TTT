var LS = {
  
  players: [],
  turn: null,
  winConditions: [
    [3,2,1],
    [9,5,1],
    [7,4,1],
    [8,5,2],
    [7,5,3],
    [9,6,3],
    [6,5,4],
    [9,8,7]
  ],
  
  setup: function() {
    LS.players = [
      {
        "name" : "Player 1",
        "piece" : "X",
        "color" : "#FF0000",
        "score" : 0
      },
      {
        "name" : "Player 2",
        "piece" : "O",
        "color" : "#0000FF",
        "score" : 0
      }
    ];
    LS.turn = LS.players[0];
    
    var player1Name = document.getElementsByClassName("player1name")[0];
    player1Name.textContent = LS.players[0].name;
    
    var player2Name = document.getElementsByClassName("player2name")[0];
    player2Name.textContent = LS.players[1].name;
    
    var player1Div = document.getElementsByClassName("player1score")[0];
    player1Div.textContent = LS.players[0].score;
    
    var player2Div = document.getElementsByClassName("player2score")[0];
    player2Div.textContent = LS.players[1].score;
  },
  
  clickHandler: function(event) {
    if (event.target.nodeName === 'DIV') {
      if (event.target.innerHTML === "X" || event.target.innerHTML === "O") {
        return false;
      } else {
        var playerTurn = LS.turn;
        event.target.innerHTML = "<p>" + playerTurn["piece"] + "</p>";
        event.target.style.color = playerTurn["color"];
        LS.checkGameConditions(playerTurn);
        LS.turn = LS.toggleTurn();
        return true;
      }
    };
    return false;
  },
  
  toggleTurn: function() {
    return LS.turn === LS.players[0] ? LS.players[1] : LS.players[0];
  },
  
  checkGameConditions: function(playerTurn) {
    // Capture all the DIVs of the board
    var divs = document.getElementsByClassName('board');
    for (var i = LS.winConditions.length - 1; i >= 0; i--){
      if (divs[LS.winConditions[i][0]-1].textContent.chomp() === playerTurn["piece"] && divs[LS.winConditions[i][1]-1].textContent.chomp() === playerTurn["piece"] && divs[LS.winConditions[i][2]-1].textContent.chomp() === playerTurn["piece"]) {
        // Remove the event listener
        window.removeEventListener('click', LS.clickHandler, false);
        // These are the winning DIVs
        var winDivs = [LS.winConditions[i][0], LS.winConditions[i][1], LS.winConditions[i][2]];
        // Color 'em
        LS.colorWinDivs(winDivs);
        // Add some text for the winner
        LS.showResultDiv("Winner!");
        // Add text to replay game
        LS.showReplayDiv();
        // Increase player's score
        playerTurn.score += 1;
        // Update scoreboard
        LS.updateScore(playerTurn);
        return true;
      } else if (LS.isTieGame()) {
        LS.colorTieDivs();
        LS.showResultDiv("Tie.");
        LS.showReplayDiv();
        return true;
      }
    };
    return false;
  },
  
  isTieGame: function() {
    var divs = document.getElementsByClassName('board');
    for (var i = divs.length - 1; i >= 0; i--){
      console.log(divs[i]);
      if (divs[i].textContent === "") {
        return false;
      }
    };
    return true;
  },
  
  colorWinDivs: function(winDivs) {
    var divs = document.getElementsByClassName('board');
    for (var i = winDivs.length - 1; i >= 0; i--){
      divs[winDivs[i]-1].style.background = "yellow";
    };
    return true;
  },
  
  colorTieDivs: function() {
    var divs = document.getElementsByClassName('board');
    for (var i = divs.length - 1; i >= 0; i--){
      divs[i].style.background = "#999999";
    };
    return true;
  },
  
  showResultDiv: function(s) {
    var winDiv = document.getElementById("win");
    winDiv.removeAttribute("style");
    var winPara = document.getElementById("winPara");
    winPara.textContent = s;
    return true;
  },
  
  showReplayDiv: function() {
    var replayDiv = document.getElementById("replay");
    replayDiv.removeAttribute("style");
    return true;
  },
  
  updateScore: function(player) {
    if (player.name === "Player 1") {
      var player1Div = document.getElementsByClassName("player1score")[0];
      player1Div.textContent = player.score;
    } else {
      var player2Div = document.getElementsByClassName("player2score")[0];
      player2Div.textContent = player.score;
    }
  },
  
  clearBoard: function() {
    console.log("Clear!");
    var divs = document.getElementsByClassName('board');
    for (var i = divs.length - 1; i >= 0; i--){
      divs[i].textContent = "";
      divs[i].style.background = "white";
    };
    var winDiv = document.getElementById("win");
    winDiv.setAttribute("style", "display:none");
    var replayDiv = document.getElementById("replay");
    replayDiv.setAttribute("style", "display:none");
    window.addEventListener('click', LS.clickHandler, false);
    return true;
  },
  
  load: function() {
    LS.setup();
  }
};

String.prototype.chomp = function() {
  return this.replace(/(\n|\r)+$/, '');
};

window.addEventListener('load', LS.load, false);
window.addEventListener('click', LS.clickHandler, false);
var replayLink = document.getElementById("replayLink");
replayLink.addEventListener('click', LS.clearBoard, false);