const express = require('express');
const { expressSharp, FsAdapter } = require('express-sharp');
const cors = require('cors');
const path = require('path');
const app = express();
const Keyv = require('keyv');

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Private-Network', true);
    res.append('Access-Control-Allow-Credentials', true);
    next();
});

var corsOptions = {
    origin: ['http://localhost:3000'],
    methods: 'GET,PUT,PATCH,POST,DELETE,HEAD,OPTIONS',
    // preflightContinue: true,
    // optionsSuccessStatus: 200
};

const server = require('http').createServer(app);

const io = require('socket.io')(server, {
    cors: corsOptions,
    pingInterval: 5000,
    pingTimeout: 10000,
});

app.set('trust proxy', 2);
app.use(cors(corsOptions));

// db
const db = require('./models');
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connection db success!');
    })
    .catch((err) => {
        console.log('Error connection db!', err);
        process.exit();
    });

// simple route
app.get('/', (req, res) => {
    // gamificationEmitter.emit('refresh', { userId: "61f79c6e1d67ecaa430002c6" });
    res.json({ message: 'Bienvenue sur le site !' });
});

const cache = new Keyv({ namespace: 'express-sharp' });
app.use(
    '/downloads/images',
    expressSharp({
        cache,
        imageAdapter: new FsAdapter(path.join(__dirname, '../downloads/images')),
        // width: 200,
    })
);
app.use(
    '/downloads/medias',
    expressSharp({
        cache,
        imageAdapter: new FsAdapter(path.join(__dirname, '../downloads/medias')),
    })
);
app.use('/downloads/videos', express.static(path.join(__dirname, '../downloads/videos')));

//ROUTES
//require('../../..')(app)

//SOCKET
io.on('connection', (socket) => {
    require('./socket')(socket, io);
});

//LISTEN
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});