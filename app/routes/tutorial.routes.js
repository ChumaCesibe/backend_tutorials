module.exports = app =>{
    const tutorials = require('../controllers/tutorial.controller');
    const router = require('express').Router()

router.get('/', (req, res) => {
 res.json({message: 'welcome to my backend application'})
    });

//create new
router.post('/', tutorials.create);

//retrieve all tutorials
router.get('/addAll', tutorials.findAll);

// retrieve all
router.get('/published', tutorials.findAllPublished);

//retrieve one
router.get('/:id', tutorials.findOne);

//update 
router.put('/:id', tutorials.update);

//delete
router.delete('/:id', tutorials.delete);

//delete all
router.delete('/', tutorials.deleteAll)

app.use('/api/tutorials', router);

};