const server = require('http').createServer();
const io = require('socket.io')(server);
const port = 8080;

server.listen(port, () => {
    console.log('Server listening at port ', port);
});

io.on('connection', (socket) => { // подключение клиента, т.е. когда в браузере перешли на адрес http://localhost:8080
    socket.on('new user', (username) => {
        socket.username = username;
        socket.emit('login', {
            // количество клиентов
            usersCount: io.engine.clientsCount
        });
        // сообщает всем что подключился новый пользователь
        socket.broadcast.emit('user joined', {
            username: socket.username,
            usersCount: io.engine.clientsCount
        });
    });

    socket.on('new message', (message) => {
        // отправляется пользователю, кот. автор сообщения
        socket.emit('new message', {
            username: 'You',
            message
        });
        // отправляется всем пользователям
        socket.broadcast.emit('new message', {
            username: socket.username,
            message
        });
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('user left', {
            username: socket.username,
            usersCount: io.engine.clientsCount
        });
    });
});
