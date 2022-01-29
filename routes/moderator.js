const router = require('express-promise-router')();

const ModeratorController = require('../controllers/moderator').ModeratorController;
let controller = new ModeratorController();

router.get('/all',controller.list);
router.get('/:id',controller.fetch);

router.delete('/',);
router.put('/',);

module.exports = router;