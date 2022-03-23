import  Jwt  from "jsonwebtoken"
import bcrypt from 'bcryptjs'
import User from "../models/User.js";
import { userSecretCode } from "../config/index.js";

export const signin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const oldUser = await User.findOne({ email });
  
      if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });
  
      const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
  
      if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
  
      const token = Jwt.sign({ email: oldUser.email, id: oldUser._id }, userSecretCode);
  
      res.status(200).json({ result: oldUser, token });
    } catch (err) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };


export const signup = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    console.log(req.body);
  
    try {
      const oldUser = await User.findOne({ email });
  
      if (oldUser) return res.status(400).json({ message: "User already exists" });
  
      const hashedPassword = await bcrypt.hash(password, 12);
  
      const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });
      console.log(result);
  
      const token = Jwt.sign( { email: result.email, id: result._id }, userSecretCode )
  
      res.status(201).json({ result, token });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      
      console.log(error);
    }
  };