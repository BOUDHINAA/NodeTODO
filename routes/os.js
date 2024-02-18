var express = require('express');
var os = require('os');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.json({
    hostname : os.hostname(),
    type : os.type(),
    platform : os.platform()
  });
});
router.get('/cpus',function(req,res){
    var cpus = os.cpus();
    console.log(cpus);
    res.json(cpus);
    
})
router.get('/cpus/:id',function(req,res){
    var cpus = os.cpus();
    if (cpus[req.params.id]){
        res.json(cpus[req.params.id]);
    }
    else{
        res.json({error: 'Invalid id'});
    }

})

module.exports = router;
