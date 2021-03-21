const express = require('express');
const router = express.Router();
const { setUser, getMe } = require('../controllers/user');
const { auth } = require('../middleware/auth');
const { userValidation } = require('../middleware/validations/userValidation')

router.post('/', userValidation, setUser)
router.get('/me', auth, getMe)

module.exports = router;