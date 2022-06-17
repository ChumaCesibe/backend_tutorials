const express = require('express');
const app = express();
const cors = require('cors')

const corsOptions = {
    origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded ({extended: true}));

const db = require('./app/model');
db.mongoose
.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log('Connected to the database!');
})
.catch(err =>{
    console.log ('Connot connect to the database!', err);
    process.exit()
});

require('./app/routes/tutorial.routes')(app);

const PORT =process.env.PORT || 8080;
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}.`);
})

