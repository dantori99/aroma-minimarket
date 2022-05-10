const jwt = require('jsonwebtoken');
const { encrypt, decrypt } = require('../../utils/bcrypt');
require('dotenv').config();

const Admin = require('../../models/Admin');

class AdminClass {
    async get_admin_sign_up (req, res) {
        const alertMessage = req.flash('alertMessage');
        const alertStatus = req.flash('alertStatus');
        const alert = { message: alertMessage, status: alertStatus };

        if (req.cookies.jwt) {
            console.log('Protected!');
            res.redirect('')
        } else {
            res.render('adminDashboard/registration.ejs', { alert: alert })
        }
    }

    async get_admin_sign_in (req, res) {
        const alertMessage = req.flash('alertMessage');
        const alertStatus = req.flash('alertStatus');
        const alert = { message: alertMessage, status: alertStatus };

        if (req.cookies.jwt) {
            console.log('Protected!');
            res.redirect('')
        } else {
            res.render('adminDashboard/login.ejs', { alert: alert })
        }
    }

    async sign_up_admin (req, res) {
        try {
            let { username, password } = req.body;
            const checkAdminAccount = await Admin.findOne({ username });
            if (checkAdminAccount) {
                req.flash('alertMessage', 'Akun sudah terdaftar!');
                req.flash('alertStatus', 'danger');
                res.redirect('/auth/signup');
            } else {
                const hashPassword = encrypt(password)

                await Admin.create({
                    username,
                    password: hashPassword
                });
                
                res.redirect('/auth/admin/signin');
            };
        } catch (error) {
            console.log(error)
        }
    }
    
    async sign_in_admin (req, res) {
        try {
            let { username } = req.body;

            const maxAge = 1 * 24 * 60 * 60;

            const checkAdmin = await Admin.findOne({ username });
            if (checkAdmin == null) {
                req.flash('alertMessage', 'Akun tidak terdaftar!');
                req.flash('alertStatus', 'danger');
                res.redirect('/auth/signin');
            }

            const checkPassword = decrypt(req.body.password, checkAdmin.password);

            if (!checkPassword) {
                req.flash('alertMessage', 'Password Salah!');
                req.flash('alertStatus', 'danger');
                res.redirect('/auth/signin');
            } else {
                const jwtToken = jwt.sign({ id: checkAdmin.id }, process.env.SECRET_KEY, { expiresIn: maxAge });
                res.cookie('jwt', jwtToken, { httpOnly: true, maxAge: maxAge * 1000 });
                res.redirect('/auth/admin/adminDashboard');
            }
        } catch (error) {
            console.log(error);
        }
    }

    async sign_out_admin (req, res) {
        try {
            res.cookie('jwt', '', { maxAge: 1 });
            res.redirect('/auth/admin/signin');
        } catch (error) {
            res.send({ msg: error });
        }
    }
}

module.exports = new AdminClass();