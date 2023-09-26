const db = require("../model");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if(!req.body.title){
        res.status(400).send({
            message: "Content can't be empty!"
        })
        return;
    }

    const tutorials = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    }

    Tutorial.create(tutorials)
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send({
                message: error.message || "Error 500!"
            })
        });
};

exports.findAll = (req, res) => {
    const title = req.body.title;
    var condition = title ? {title: {[Op.like]: `%${title}%`}} : null;

    Tutorial.findAll({where : condition})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred!"
            })
        });
};

exports.findOne = (req, res) => {
   
};

exports.findAllPublished = (req, res) => {
    
};

exports.update = (req, res) => {
   
};

exports.delete = (req, res) => {
    
};

exports.deleteAll = (req, res) => {
   
};