function socket(io){

    io.on('connection', function(socket){
        console.log('A user has connected.');
    
        socket.on('Message', function(msg){

            var userNumber = randomNumber();
            var data = {
                message: msg.message,
                username: userNumber,
                date: Date.now()
            }
        });
    });
}

function randomNumber(){
    var float = Math.random();
    var int = Math.floor(float * 10000);
    return int;
}

module.exports = socket;