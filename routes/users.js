var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //console.log("sssssss");
  //res.redirect(300, '/ss')
  res.send('users');//, { id:"hello from epidemic tracker, your message is empty"});

  //res.send('respond with a resource');
});
router.get('/users', function(req, res, next) {
  console.log("sssssss");
  //res.redirect(300, '/ss')
  res.send('ss');//, { id:"hello from epidemic tracker, your message is empty"});
  //return res.redirect('ss');

  //res.send('respond with a resource');
});
router.put('/ss', (req, res) => {
  console.log("piuy@@@@@");
  const yoyo = req.params.userId;
  res.redirect(303, '/path');
  if (!yoyo) //return res.status(404).json({})
    console.log("piuy@@@@@");
  //user.name = req.body.name
  res.json(yoyo)
});


module.exports = router;
