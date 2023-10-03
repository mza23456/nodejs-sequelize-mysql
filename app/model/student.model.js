module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("students",{
        student_id: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        surname: {
            type: Sequelize.STRING
        },
        university: {
            type: Sequelize.STRING
        },
        graduate: {
            type: Sequelize.BOOLEAN
        }
    });

    return Student;
};