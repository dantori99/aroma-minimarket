require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const flash = require('connect-flash');
const port = process.env.PORT || 3000;
const URI = process.env.MONGO_URI;

// Routes
const Admin = require('./routes/adminAuthRoutes');

// Express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/sb-admin-2', express.static(path.join(__dirname, 'node_modules/startbootstrap-sb-admin-2')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Cors
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header('Access-Control-Allow-Origin', '');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

// User session
app.use(session({
    secret: process.env.SECRET_KEY, // Cookie secret
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
}));

// Parsing Cookie
app.use(cookieParser(process.env.SECRET_KEY)) // The secret-key need to be exactly the same with the session

// Connecting flash
app.use(flash());

// Endpoint
app.get('/', (req, res) => {
    res.redirect('/auth/admin/signin');
})
app.use(Admin)

mongoose.connect(
    URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => console.log(`Connected to MongoDB`)).then(app.listen(port, () => console.log(`Listening to PORT: ${port}`))).catch((e) => console.log(e));