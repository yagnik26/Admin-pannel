const express = require('express');
let app = express();
const cors = require('cors');
const connect = require('./config/db');
const admin = require('./models/admin');
const checkData = require('./middleware/check');
const cookie = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();
const passportAuth = require('./middleware/passportAuth');
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + "/public"))
app.set("views", __dirname + "/views");
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(cookie());
app.use(session({ secret: 'admin' }));
passportAuth(passport);


app.use(passport.initialize());
app.use(passport.session());

app.get('/logout', (req, res) => {
    req.logout((err)=>{
        if (err){
          console.log(err)
        }
    })
    res.render('home')
})


app.get('/', (req, res) => {
    res.render('home');
})
app.get('/blog', (req, res) => {
    console.log(req.user);
    if(req.user){
        return res.render('blog');
    }
    else{
        return res.redirect('/login');
    }
});
app.get('/login', (req, res) => {
    res.render('login');
})
app.post('/login', passport.authenticate('local',{failureRedirect : '/login' , successRedirect : '/'}));

app.post('/blog',passport.authenticate('local',{failureRedirect : '/login' , successRedirect : '/'}), async (req, res) => {
    let id = req.user.id;
    let data = await admin.findById(id);
    data.cart.push({
        tital : req.body.tital,
        content : req.body.content,
        auther : req.body.auther
    })
    await admin.findByIdAndUpdate(id,data);
    console.log(data.cart);
    res.render('blog');
})
app.get('/myBlog', async (req, res) => {
    if(req.user){
        res.render('myCart');
    }
    else{
        return res.redirect('/login');
    }
})
app.get('/myCart', async (req, res) => {
    if(req.user){
        let id = req.user.id;
        let data = await admin.findById(id);
        res.send(data);
    }
    else{
        return res.redirect('/login');
    }
})
app.get('/reg', (req, res) => {
    res.render('reg');
})
app.post('/reg',checkData, async (req, res) => {
    await admin.create(req.body);
    res.send('done');
})
app.post('/post', checkData, async (req, res) => {
    await admin.create(req.body);
    res.send('done')
})
app.get('/user',(req,res) => {
    console.log(req.user);
    res.send('done');
})
app.get('/edit/:id', async (req,res) => {
    let{id} = req.params;
    let data = req.body;
    try {
        await admin.findByIdAndUpdate(id, data);
    } catch (error) {
        console.log(error);
    }
})

app.get('/deleteData/:id', async (req,res) => {
    let{id} = req.params;
    try {
        await admin.findByIdAndRemove(id);
    } catch (error) {
        console.log(error);
    }
})

app.listen(8000, (req, res) => {
    console.log('Server is running on port 8000');
    connect();
})