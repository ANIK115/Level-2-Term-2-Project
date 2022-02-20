const router = require('express-promise-router')();

const auth = require('../../middlewares/auth');
const ModeratorController = require('../../controllers/moderator').ModeratorController;
let controller = new ModeratorController();

// libraries

router.get('/', auth.mdAuth, controller.home);

module.exports = router;