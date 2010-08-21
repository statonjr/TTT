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
        LS.checkWinConditions(playerTurn);
        LS.turn = LS.toggleTurn();
        return true;
      }
    };
    return false;
  },
  
  toggleTurn: function() {
    return LS.turn === LS.players[0] ? LS.players[1] : LS.players[0];
  },
  
  checkWinConditions: function(playerTurn) {
    var moves = [];
    // Capture all the DIVs
    var divs = document.getElementsByTagName('div');
    for (var i = divs.length - 1; i >= 0; i--){
      // If DIV has innerText of playerTurn["piece"] then
      if (divs[i].innerText === playerTurn["piece"] + "\n" || divs[i].innerText === playerTurn["piece"]) {
        // Push the DIV id (as an integer) to moves array
        moves.push(parseInt(divs[i].id,10));
        if (moves.length > 3) {
          // Shift the first integer so we can compare arrays of same length
          moves.shift();
        };
      }
    };
    // If moves has a length of 3, then check against winConditions
    if (moves.length == 3) {
      for (var j = LS.winConditions.length - 1; j >= 0; j--){
        // If moves contain any of winConditions then
        if (moves.compare(LS.winConditions[j])) {
          // Remove the event listener for the click handler
          console.log("Win!");
          window.removeEventListener('click', LS.clickHandler, false);
          // Color the winning DIVs
          LS.colorWinDivs(moves);
          // Add the win div
          LS.addWinDiv();
          // Add the replay div
          LS.addReplayDiv();
          return true;
        }
      };
    }
    return false;
  },
  
  colorWinDivs: function(winDivs) {
    var divs = document.getElementsByTagName('div');
    for (var i = winDivs.length - 1; i >= 0; i--){
      divs[winDivs[i]].style.background = "yellow";
    };
    return true;
  },
  
  addWinDiv: function() {
    var winDiv = document.createElement("div");
    winDiv.setAttribute("id", "win");
    document.getElementsByTagName('body')[0].appendChild(winDiv);
    var winPara = document.createElement("p");
    winPara.setAttribute("id", "winPara");
    document.getElementById("win").appendChild(winPara);
    var winText = document.createTextNode("Winner!");
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

Array.prototype.compare = function(testArr) {
    if (this.length != testArr.length) return false;
    for (var i = 0; i < testArr.length; i++) {
        if (this[i].compare) { 
            if (!this[i].compare(testArr[i])) return false;
        }
        if (this[i] !== testArr[i]) return false;
    }
    return true;
};

window.addEventListener('load', LS.load, false);
window.addEventListener('click', LS.clickHandler, false);