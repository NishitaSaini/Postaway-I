import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import CustomError from "../utils/customError.js";

export const signUp = async(req, res, next) => {
    try{
      
        const {name, email, password} = req.body;

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            throw new CustomError(400, 'Email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        const user = await userModel.create({ name, email, password: hashedPassword }); // Create user with hashed password
        res.status(201).json(user);
    }
    catch(error){l    
        next(error);
    }
};

const generateToken = (userId) => {
    return jwt.sign(
        {userId}, 
        process.env.JWT_SECRET, 
        {expiresIn: '1h'}
    );
}
export const signIn = async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      // Check if user exists
      const user = await userModel.findOne({ email });
      if (!user) {
        throw new CustomError(401, 'Invalid email or password');
      }
  
      // Check if password is correct
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new CustomError(401, 'Invalid email or password');
      }
  
      // Generate JWT token
      const token = generateToken(user._id);
  
      // Respond with token
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };