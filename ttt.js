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
        "mame" : "Player 1",
        "piece" : "X",
        "color" : "#FF0000"
      },
      {
        "name" : "Player 2",
        "piece" : "O",
        "color" : "#0000FF"
      }
    ];
    LS.turn = LS.players[0];
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
    // Capture all the DIVs
    var divs = document.getElementsByTagName('div');
    for (var i = LS.winConditions.length - 1; i >= 0; i--){
      if (divs[LS.winConditions[i][0]].innerText.chomp() === playerTurn["piece"] && divs[LS.winConditions[i][1]].innerText.chomp() === playerTurn["piece"] && divs[LS.winConditions[i][2]].innerText.chomp() === playerTurn["piece"]) {
        // Remove the event listener
        window.removeEventListener('click', LS.clickHandler, false);
        // These are the winning DIVs
        var winDivs = [LS.winConditions[i][0], LS.winConditions[i][1], LS.winConditions[i][2]];
        // Color 'em
        LS.colorWinDivs(winDivs);
        // Add some text for the winner
        LS.addResultDiv("Winner!");
        // Add text to replay game
        LS.addReplayDiv();
      } else if (divs[0].innerText.length === 17) {
        LS.colorTieDivs();
        LS.addResultDiv("Tie.");
        LS.addReplayDiv();
      }
    };
    return false;
  },
  
  colorWinDivs: function(winDivs) {
    var divs = document.getElementsByTagName('div');
    for (var i = winDivs.length - 1; i >= 0; i--){
      divs[winDivs[i]].style.background = "yellow";
    };
    return true;
  },
  
  colorTieDivs: function() {
    var divs = document.getElementsByTagName('div');
    for (var i = divs.length - 1; i >= 1; i--){
      divs[i].style.background = "#999999";
    };
    return true;
  },
  
  addResultDiv: function(s) {
    var winDiv = document.createElement("div");
    winDiv.setAttribute("id", "win");
    document.getElementsByTagName('body')[0].appendChild(winDiv);
    var winPara = document.createElement("p");
    winPara.setAttribute("id", "winPara");
    document.getElementById("win").appendChild(winPara);
    var winText = document.createTextNode(s);
    document.getElementById('winPara').appendChild(winText);
    return true;
  },
  
  addReplayDiv: function() {
    var replayDiv = document.createElement("div");
    replayDiv.setAttribute("id", "replay");
    document.getElementsByTagName('body')[0].appendChild(replayDiv);
    var replayPara = document.createElement("p");
    replayPara.setAttribute("id", "replayPara");
    document.getElementById("replay").appendChild(replayPara);
    var replayLink = document.createElement("a");
    replayLink.setAttribute("href", "ttt.html");
    replayLink.setAttribute("id", "replayLink");
    document.getElementById('replayPara').appendChild(replayLink);
    var replayText = document.createTextNode("Click to replay");
    document.getElementById('replayLink').appendChild(replayText);
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