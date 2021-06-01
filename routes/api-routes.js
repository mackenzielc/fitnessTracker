const router = require('express').Router();
const Workout = require('../models/workout.js')

//GET route /api/workouts
router.get('/', async (req, res) => {
    try {
        const result = await Workout.aggregate([
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
        const result = await Workout.create(body);
        res.json(result)
        console.log(result)
    } catch (err) {
        res.status(400).json(err);
    }
});

//PUT (update) route /api/workouts/:id
router.put('/:id', async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id)
        // console.log(workout)
        console.log(req.body)
        console.log(workout.exercises)
        workout.exercises.push(req.body)
        await workout.save()
        res.status(200).json(workout)
    } catch (err) {
        res.status(400).json(err)
    }

    // Workout.update(
    //     {
    //         _id: req.params.id
    //     },
    //     {
    //         $push: {
    //             workouts: req.body
    //         }
    //     }
    // )
    // .then(dbWorkout => {
    //     res.json(dbWorkout)
    // })
    // .catch(err => {
    //     res.status(400).json(err);
    // });
});

// app.get('/api/workouts/range', (req, res) => {
//     Workout.find({})
//     .sort({__id: -1})
//     .limit(7)
//     .then(dbWorkout => {
//         res.json(dbWorkout);
//     })
//     .catch (err => {
//         res.status(400).json(err)
//     });
// });

// app.get('/api/workouts/range', (req, res) => {
//     Workout.aggregate([
//         {
//             $addFields: {
//                 totalDuration: {
//                     $sum: '$exercises.duration',
//                 },
//             },
//         },
//     ],
//     (err, data) => (err ? res.send(err) : res.json(data)))
// })

//GET range route /api/workouts/range
router.get('/range', async (req, res) => {
    try {
        const result = await Workout.aggregate([
            {
                $addFields: {
                    totalDuration: {
                        $sum: '$exercises.duration',
                    },
                },
            },
        ]).limit(7);
        res.json(result);
    } catch (err) {
        res.status(500).json(err);
    }
    
});

module.exports = router;

