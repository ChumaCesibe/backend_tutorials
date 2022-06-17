const req = require('express/lib/request');
const res = require('express/lib/response');
const db = require('../model');
const Tutorial = db.tutorials;

exports.create = (req, res) =>{
    if (!req.body.title){
        res.status(400).send({message: 'Content can not be empty!'})
        return;
    }


    //Create a tutorial body
const tutorial = new Tutorial({
    title: req.body.title, //hard coded -> Tutorial Angular
    description: req.body.description, // hard coded -> introduction to angular
    published: req.body.published ? req.body.published : false
});

//save

tutorial
.save(tutorial)
.then(data =>{
    res.send(data);
})
.catch(err =>{
    res.status(500).send({message:
    err.message || 'Some error occured while creating the tutorial'})
});
}

//find all
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? {title: {$regex: new RegExp(title), $options: 'i'}} : {};

    Tutorial.find(condition)
    .then(data =>{
        res.send(data);
})
.catch(err =>{
    res.status(500).send({message:
    err.message || 'Some error occured while retrieving  tutorials'})
});

}

//find one
exports.findOne = (req,res) =>{
    const id = req.params.id;

    Tutorial.findById(id)
    .then(data => {
        if (!data)
        res.status(404).send({message:'Not found Tutorial with id'+ id});
        elseres.send(data);

    })
    .catch(err => {
        res
        .status(500)
        .send({message: 'Error retrieving Tutorial with id' + id});
    });
};

//update
exports.update = (req,res) =>{
    if (!req.body){
        return res.status(400).send({
           message:'Data to update can  not be empty!' 
        });
    }
    const id =req.params.id;
    Tutorial.findByIdAndUpdate(id, req.body,{useFindAndModify: false})
    .then(data => {
if (!data) {
    res.status(404).send({
        message:`Cannot update Tutorial with id=${id}. Maybe Tutorial was not found`
    });
    }else res.send({message: 'Tutorial was updated succesfully'});
})
.catch(err =>{
    res.status(500).send({
       message:'Error updating Tutorial with id=' + id  
    });
});
}

//delete
exports.delete = (req,res) =>{
    const id = req.params.id;

    Tutorial.findByIdAndRemove(id,{useFindAndModify: false})
    .then(data => {
        if (!data) {
            res.status(404).send({
                message:`Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found`
            });
        }else {res.send({message: 'Tutorial was deleted succesfully'});

        }
    })
    .catch(err =>{
        res.status(500).send({
           message:']Could not delete Tutorial with id=' + id  
        });
    });
}

//delete All
exports.deleteAll = (req,res) =>{
    Tutorial.deleteMany({})
    .then(data => {
        res.send({
            message:`${data.deletedCount} Tutoirials were deleted susccessfully!`
        });

    })
    .catch(err =>{
        res.status(500).send({
           message:'Some error occurred while removing all tutorials'});


        });
    }

    exports.findAllPublished = (req,res) =>{
        Tutorial.find({published:true})
        .then(data => {
            res.send(data);
    })
    .catch(err =>{
        res.status(500).send({
           message:
           err.message || 'Some error occurred while retrieving tutorials'});
        });
    };


