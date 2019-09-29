var express = require("express");
router = express.Router()


router.get("/calculator", function(req,res){
  res.render("calculator/calc")
});



module.exports = router;
