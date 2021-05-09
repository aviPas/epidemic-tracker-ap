var express = require('express');
var router = express.Router();
//const db = require('../moduls/db');




/* GET home page. */
router.get('/' ,/*cache(300),*/function(req, res, next) {

  res.send('epidemic-tracker');

});
//***************************      /epidemic-tracker          *******************************************
router.get('/epidemic-tracker',function(req, res, next) {

  res.render('index', { title:"hello from epidemic tracker"});
});
//*************************     epidemic-tracker/hello/:message      *************************************
router.get('/epidemic-tracker/hello/:message', function(req, res, next) {

  //console.log("cookies1"  +    req.cookies['userData']);
  //console.log(req.params.message);
if(req.params.message == null)
  res.render('index', { title:"hello from epidemic tracker, your message is empty"});

else {

  //res.cookie("userData", req.params.message);
  res.cookie('userData', 'req.params.message', { maxAge:9000 , httpOnly: true });
  console.log("cookies2"  +    req.cookies['userData']);
  res.render('index', {title: "hello from epidemic tracker, message:" + req.params.message});


}

});

//*************************     epidemic-tracker/hello     *************************************
router.get('/epidemic-tracker/hello', function(req, res, next) {
 // console.log(req.params.message);
  console.log("cookies1"  +    req.cookies['userData']);
  if(req.params.message == null)
    res.render('index', { title:"hello from epidemic tracker, your message is empty"});

  else
    res.render('index', { title:"hello from epidemic tracker, message:" });

});
//**************************************************************************************************
router.get('/covid19', function(req, res, next) {///////////////
  /*console.log(req.params.message);
  if(req.params.message == null)
    res.render('index', { title:"hello from epidemic tracker, your message is empty"});

  else
    res.render('index', { title:"hello from epidemic tracker, message:" + req.params.message });
*/

 // var token = req.headers;

  var message = req;
  //console.log(message.path);




  //next();
});

//*************************************************************************************************
router.put('/infectionRisk/:covidi', function(req, res, next) {
  console.log("piuy@@@@@");
  if(req.body.covidi == null)
  {
    console.log("piuy@@@@@");
  }
  console.log("piuy@@@@@");
  //const user = req.body.covidi;
 // console.log("piuy@@@@@");


 //return;

 // res.render('index');

  res.redirect('index');

//http://localhost:3000/epidemic-tracker/infectionRisk/vvvvvvvvvvvvvvvvvvvv
});








module.exports = router;
