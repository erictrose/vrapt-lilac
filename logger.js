var client = new JanusClientConnection({
    host: 'ws://vrapt.xyz:5566',
    userId: 'WebClientUser' + Math.floor(Math.random() * 100000),
    roomUrl: 'http://erictrose.github.io/vrapt/'
});

client.addEventListener('connect', handleConnect);
client.addEventListener('message', handleMessage);

var messageList = $("#messages");

function addMessage(msg){
    // Add new message to top of messages list
    var li = document.createElement('li');
    li.innerHTML = msg;
    messageList.prepend(li);
    
    if($("#messages li").length > 13){
        $('#messages li:last').remove();
    }
}

function handleConnect(ev){
    console.log('client connected', ev);
    addMessage('Connected to server as ' + client._userId);
}

function handleMessage(ev){
    var msg = ev.data;
    console.log('got message', msg);
    
    var methodType = '',
        animType = '';
    

    
    if(msg.method === 'user_moved'){
        switch ( msg.data.position.anim_id ) {
            case 'idle':
                animType = 'is idle';
            break;
            case 'fly':
                animType = 'is flying';
            break;
            case 'walk_left':
                animType = 'is walking left';
            break;
            case 'walk_right':
                animType = 'is walking right';
            break;
            case 'walk_back':
                animType = 'is walking backwards';
            break;
            case 'walk':
                animType = 'is walking forwards';
            break;
            case 'jump':
                animType = 'is jumping';
            break;
            case 'run':
                animType = 'is running';
            break;
            case 'type':
                animType = 'is typing';
            break;

            default:
                animType = 'doing nothing';
            break;
        }
        
        moveMessage = 'user ' +msg.data.userId +' ' +animType;
        addMessage(moveMessage);
    } else {
        switch ( msg.method ) {
            case 'user_chat':
                methodType = 'chatted';
            break;
            case 'user_leave':
                methodType = 'left';
            break;
            case 'user_enter':
                methodType = 'entered';
            break;
            case 'user_portal':
                methodType = 'created a portal';
            break;
            case 'user_disconnected':
                methodType = 'disconnected';
            break;
            default:
                methodType = 'did nothing';
            break;
        }
        logMessage = 'user ' +msg.data.userId +' ' +methodType;
        addMessage(logMessage);
    }
}

console.log('logger loaded');
