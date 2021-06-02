const router = require('express').Router();
const db = require('../models')

//GET route /api/workouts
router.get('/', async (req, res) => {
    try {
        const result = await db.Workout.aggregate([
            {
                $addFields: {
                    totalDuration: {
                        $sum: '$exercises.duration'
                    },
                },
            },
        ]);
        res.json(result);
    } catch (err) {
        res.status(400).json(err)
    }
})

//POST (create) route /api/workouts
router.post('/', async ({ body }, res) => {
    try {
        const result = await db.Workout.create(body);
        res.json(result)
        console.log(result)
    } catch (err) {
        res.status(400).json(err);
    }
});

//PUT (update) route /api/workouts/:id
router.put('/:id', async (req, res) => {
    try {
        const workout = await db.Workout.findByIdAndUpdate(req.params.id)
        console.log(workout)
        // console.log(req.body)
        // console.log(workout.exercises)
        workout.exercises.push(req.body)
        await workout.save()
        console.log(workout)
        res.status(200).json(workout)
    } catch (err) {
        res.status(400).json(err)
    }
});


//GET range route /api/workouts/range
router.get('/range', async (req, res) => {
    try {
        const result = await db.Workout.aggregate([
            {
                $addFields: {
                    totalDuration: {
                        $sum: '$exercises.duration',
                    },
                },
            },
        ])
        .sort({_id: -1})
        .limit(7);
        res.json(result);
    } catch (err) {
        res.status(500).json(err);
    }
    
});

module.exports = router;

