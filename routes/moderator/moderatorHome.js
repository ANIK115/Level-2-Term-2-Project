const router = require('express-promise-router')();

const auth = require('../../middlewares/auth');
const ModeratorController = require('../../controllers/moderator').ModeratorController;
let controller = new ModeratorController();

// libraries

router.get('/', auth.mdAuth, controller.transaction);
router.get('/transactions', auth.mdAuth, controller.transaction);
router.get('/addoffers', auth.mdAuth, controller.offer);
router.post('/addoffers', auth.mdAuth, controller.add_offer);
router.get('/showoffers', auth.mdAuth, controller.showOffers);
module.exports = router;