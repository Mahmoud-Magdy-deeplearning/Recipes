const express = require( 'express' );
const MediaController = require( '../controllers/MediaController' );

const router = express.Router();

router.get( '/:id', MediaController.get );
router.post( '/', MediaController.upload.single( 'file' ), MediaController.insert );
router.delete( '/:id', MediaController.delete )

module.exports = router;
