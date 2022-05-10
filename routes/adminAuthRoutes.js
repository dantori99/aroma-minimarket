const { Router } = require('express');
const router = Router();

const {
    get_admin_sign_in,
    get_admin_sign_up,
    sign_up_admin,
    sign_in_admin,
    sign_out_admin
} = require('../controllers/admin/adminAuthController');

router.get('/auth/admin/signup', (req, res) => {
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = { message: alertMessage, status: alertStatus };
    res.render('adminDashboard/registration.ejs', { alert: alert });
});

router.get('/auth/admin/signin', (req, res) => {
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = { message: alertMessage, status: alertStatus };
    res.render('adminDashboard/login.ejs', { alert: alert });
});

router.get('/auth/admin/adminDashboard', (req, res) => {
    let { username } = req.body;
    res.render('adminDashboard/index.ejs', { username: username });
});

router.get('/auth/signin', get_admin_sign_in);
router.get('/auth/signup', get_admin_sign_up);
router.post('/auth/admin/signup', sign_up_admin);
router.post('/auth/admin/signin', sign_in_admin);
router.get('/auth/admin/signout', sign_out_admin);

module.exports = router;