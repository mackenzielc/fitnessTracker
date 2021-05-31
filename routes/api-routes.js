// const router = require('express').Router();
const Workout = require('../models/workout.js')

module.exports = (app) => {
    app.get('/api/workouts', (req, res) => {
        Workout.find({})
        .then(dbWorkout => {
            //console.log(dbWorkout);
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
    });

    app.post('/api/workouts', ({ body }, res) => {
        console.log(body)
        Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
    });
    
    app.put('/api/workouts/:id', async (req, res) => {
        try {
            const workout = await Workout.findById(req.params.id)
            console.log(workout)
            console.log(req.body)
            console.log(workout.exercises)
            workout.exercises.push(req.body)
            await workout.save()
            res.status(200).json(workout)
        } catch (err) {throw err.message}

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
    
    app.get('/api/workouts/range', (req, res) => {
        Workout.find({})
        .sort({__id: -1})
        .limit(7)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch (err => {
            res.status(400).json(err)
        });
    });
}



//From 07
// app.post("/update/:id", (req, res) => {
//     db.notes.update(
//       {
//         _id: mongojs.ObjectId(req.params.id)
//       },
//       {
//         $set: {
//           title: req.body.title,
//           note: req.body.note,
//           modified: Date.now()
//         }
//       },
//       (error, data) => {
//         if (error) {
//           res.send(error);
//         } else {
//           res.send(data);
//         }
//       }
//     );
// });

//From 09

// app.put("/markread/:id", ({ params }, res) => {
//     db.books.update(
//       {
//         _id: mongojs.ObjectId(params.id)
//       },
//       {
//         $set: {
//           read: true
//         }
//       },
  
//       (error, edited) => {
//         if (error) {
//           console.log(error);
//           res.send(error);
//         } else {
//           console.log(edited);
//           res.send(edited);
//         }
//       }
//     );
// });