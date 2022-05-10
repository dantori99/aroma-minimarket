const jwt = require('jsonwebtoken');
const { encrypt, decrypt } = require('../../utils/bcrypt');

const User = require('../../models/User');

class User {
    async sign_up_client (req, res) {
        try {
            const { fullName, email, password } = req.body
            const checkCustomerAccount = await User.findOne({ email });
            if (checkCustomerAccount) return res.send({ msg: 'email ini sudah terdaftar' });
            
            const hashPassword = encrypt(password);
            
            // create client account
            await User.create({
                fullName, 
                email, 
                password: hashPassword
            });
            
            res.send({ msg: 'Akun anda sukses terdaftar!' })
        } catch (error) {
            res.send({ msg: error })
        }
    }
    
    async sign_in_client (req, res) {
        try {
            const { email, password } = req.body;
            const checkCustomerAccount = await User.findOne({ email });
            if (checkCustomerAccount == null || !checkCustomerAccount) return res.send({ msg: 'email ini belum terdaftar' });

            const validPass = decrypt(password, checkCustomerAccount.password);
            if (!validPass) return res.send({ msg: 'password salah!' });

            const token = jwt.sign({ id: checkCustomerAccount.id }, process.env.SECRET_KEY, {});
            
            let data = {
                id: checkCustomerAccount.id,
                fullName: checkCustomerAccount.fullName,
                email: checkCustomerAccount.email,
                profileImage: checkCustomerAccount.profileImage,
                token: token
            }
            res.send({ data });
        } catch (error) {
            res.send({ msg: error });
        }
    }

    async sign_out_client (req, res) {
        try {
            res.cookie('jwt', '', { maxAge: 1 }); 
        } catch (error) {
            res.send({ msg: error });
        }
    }
}

module.exports = new User();