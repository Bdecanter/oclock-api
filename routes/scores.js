const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient
const mongoAdd = "mongodb+srv://oclock:oclock@cluster0.ak0d8.mongodb.net/scores?retryWrites=true&w=majority"

/* 
  Scores 
  playername : String (max 3)
  score: Integer
*/

router.get('/', function(req, res, next) {
  MongoClient.connect(mongoAdd, function (err, client) {
    if (err) throw err

    var db = client.db('scores')

    db.collection('scores').find().sort( { score: +1 } ).limit(3).toArray(function (err, result) {
      if (err) throw err

      res.json(result)
    })
  })

});

router.post('/', function(req, res) {
  const {playername, score} = req.body;

  MongoClient.connect(mongoAdd, function (err, client) {
    if (err) throw err

    var db = client.db('scores')

    db.collection('scores').insertOne({playername: playername.toUpperCase(), score: score}, (err, client) => {
      if (err) throw err

      res.send(true)
    })
  })
});

module.exports = router;
