const User = require("../models/userModel");

// register
module.exports.register = async (req, res, next) => {
   try {
      const { username, email, password } = req.body;

      const emailCheck = await User.findOne({ email });
      if (emailCheck) {
         return res.json({ message: "Email already used", status: false });
      }
      // const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
         email,
         username,
         password,
      });
      await user.save();
      // delete user.password;
      return res.json({
         user,
         status: true
      });
   } catch (ex) {
      next(ex);
   }
};

// login
module.exports.login = async (req, res, next) => {
   try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user)
         return res.json({
            message: "Incorrect Username or Password",
            status: false,
         });

      // const isPasswordValid = await bcrypt.compare(password, user.password);
      if (user.password !== password) {
         return res.json({
            message: "Incorrect Username or Password",
            status: false,
         });
      }
      // delete user.password;
      return res.json({ status: true, user });
   } catch (ex) {
      next(ex);
   }
};
