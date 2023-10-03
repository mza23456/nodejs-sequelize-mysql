const db = require("../model");
const Student = db.students;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if(!req.body.name){
        res.status(400).send({
            message: "Content can't be empty!"
        })
        return;
    }

    const students = {
        student_id: req.body.student_id,
        name: req.body.name,
        surname: req.body.surname,
        university: req.body.university,
        graduate: req.body.graduate ? req.body.graduate : false
    }

    Student.create(students)
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
    const name = req.body.name;
    var condition = name ? {name: {[Op.like]: `%${name}%`}} : null;

    Student.findAll({where : condition})
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
    const id = req.params.id;
    Student.findByPk(id)
         .then(data => {
            if(data){
               res.send(data);
            }else{
               res.status(404).send({
                  message: "Error " + id
               })
            }
         })
         .catch(error => {
            res.status(500).send({
               message: "Error " + id
            });
         });
};

exports.findAllPublished = (req, res) => {
    Student.findAll({where: {graduate: true}})
         .then(data => {
            res.send(data);
         })
         .catch(error => {
            res.status(500).send({
               message: "Error 500"
            });
         });
};
exports.update = (req, res) => {
    const id = req.params.id;
    Student.update(req.body, {where: {id:id}})
      .then(num => {
         if(num == 1){
            res.send({
               message: "updated successfully"
            });
         }else{
            res.send({
               message: "failed to update"
            });
         }
      })
      .catch(error => {
         res.send(500).send({
            message: "error updating"
         });
      });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Student.destroy({where: {id:id}})
    .then(num => {
      if(num == 1){
         res.send({
            message: "delete successfully"
         });
      }else{
         res.send({
            message: "delete failed"
         });
      }
   })
   .catch(error => {
      res.status(500).send({
         message: "delete error"
      });
   }); 
};

exports.deleteAll = (req, res) => {
    Student.destroy({
      where:{},
      truncate: false
    })
    .then(num => {
      res.send({message: "delete sucessfully"});
    })
    .catch(error => {
      res.status(500).send({
         message: "Error 500"
      })
    });
};