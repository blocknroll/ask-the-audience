var socket = io();

var connectionCount = document.getElementById('connection-count');

socket.on('userConnection', function (count) {
  connectionCount.innerText = 'Connected Users: ' + count;
});

var statusMessage = document.getElementById('status-message');

socket.on('statusMessage', function (message) {
  statusMessage.innerText = message;
});

var buttons = document.querySelectorAll('#choices button');

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function() {
    socket.send('voteCast', this.innerText);
    // socket.send('voteFeedback', this.innerText);
    userVote(this.innerText);
  });
}

var voteTally = document.getElementById('vote-tally');

socket.on('voteCount', function (votes) {
  console.log(votes);
  voteTally.innerText = ' A: ' + votes["A"] +
                        ' B: ' + votes["B"] +
                        ' C: ' + votes["C"] +
                        ' D: ' + votes["D"] ;
});



var userVote = function (userVote) {
  var voteFeedback = document.getElementById('vote-feedback');
  userVote = JSON.stringify(userVote);
  voteFeedback.innerText = 'My vote: ' + userVote;
}
