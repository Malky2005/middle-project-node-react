const express = require('express')
const router = express.Router()

const photoController = require('../controllers/photoController')

router.get("/",photoController.getAllPhotos)
router.get("/:id",photoController.getPhotoById)
router.post("/",photoController.addNewPhoto)
router.put("/",photoController.updatePhoto)
router.delete("/:id",photoController.deletePhoto)

module.exports = router