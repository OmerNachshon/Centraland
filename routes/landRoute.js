const express = require("express");
const router = express.Router();
const Land = require("../models/landModel");

//
router.route("/create").post(async (req, res) => {
    const length=(await Land.find()).length;
    if (length>=400){
        return res.status(403).json({msg:"db has 400 listings already"});
    }
  const { id, type, available, price, owner ,link , ownerId} = req.body;
    try{
  const newLand = new Land({
    id,
    type,
    available,
    price,
    owner,
    link,
    ownerId
  });
  const savedLand = await newLand.save();
  res.status(201).json(savedLand);
}
catch {
    res.status(500).json({msg:"something went wrong!"});
}
});


router.route("/lands").get((req, res) => {
  Land.find().then((foundLands) => res.json(foundLands));
});

router.route("/delete").delete(async(req, res) => {
    const {deletedCount} = await Land.deleteMany();
    res.status(202).json({deletedCount});
  });
  


router.put("/updateLand/:postId", async (req, res) => {
  try {
    const { id, type, available, price, owner, link ,ownerId } = req.body;
    const updatePost = await Land.updateOne(
      { id: req.params.postId },
      { id:id, type:type, available:available, price:price, owner:owner, link:link ,ownerId:ownerId  }
    );
    res.status(201).json(updatePost);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});


module.exports = router;
