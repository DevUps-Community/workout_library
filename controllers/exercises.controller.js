const { fetchAllExercises, fetchExerciseById, fetchExercisesByEquipmentId, fetchExercisesByMuscleGroupId, addExercise, deleteExerciseById, editExerciseById, } = require("../models/exercises.model");
const documentation = require('../endpoints.json');

exports.getDocs = (req, res) => {
    res.status(200).send({documentation});
};

exports.getAllExercises = (req, res, next) => {
    const { limit = 10, page = 1, sort_by = 'name', order = 'asc' } = req.query;
    return fetchAllExercises(limit, page, sort_by, order)
        .then((exercises) => {
            res.status(200).send({ exercises });
        })
        .catch(next);
};

exports.getExerciseById = (req, res, next) => {
    const { exercise_id } = req.params;
    return fetchExerciseById(exercise_id)
        .then((exercise) => {
            res.status(200).send({ exercise });
        })
        .catch(next);
}

exports.getExercisesByEquipmentId = (req, res, next) => {
    const { equipment_id } = req.params;
    const { limit = 10, page = 1, sort_by = 'name', order = 'asc' } = req.query;
    return fetchExercisesByEquipmentId(equipment_id, limit, page, sort_by, order)
        .then((exercises) => {
            res.status(200).send({ exercises });
        })
        .catch(next);
};

exports.getExercisesByMuscleGroupId = (req, res, next) => {
    const { group_id } = req.params;
    const { limit = 10, page = 1, sort_by = 'name', order = 'asc' } = req.query;
    return fetchExercisesByMuscleGroupId(group_id, limit, page, sort_by, order)
        .then((exercises) => {
            res.status(200).send({ exercises });
        })
        .catch(next);
};

exports.postExercise = (req, res, next) => {
    const exerciseData = req.body;
    addExercise(exerciseData)
        .then((exercise) => {
            res.status(201).send({ exercise, msg: "Exercise added." });
        })
        .catch(next);
}

exports.deleteExercise = (req, res, next) => {
    const { exercise_id } = req.params;
    deleteExerciseById(exercise_id)
        .then(() => {
            res.status(204).send({ msg: "Exercise deleted."});
        })
        .catch(next);
}

exports.editExercise = (req, res, next) => {
    const { exercise_id } = req.params;
    const exerciseData = req.body;
    editExerciseById(exercise_id, exerciseData)
        .then((exercise) => {
            res.status(200).send({ exercise, msg: "Exercise updated." });
        })
        .catch(next);
}