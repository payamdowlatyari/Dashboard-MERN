import Client from '../models/client.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {

  console.log(req.body)
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newClinet = new Client({ username, email, password: hashedPassword });

  try {
    await newClinet.save();
    res.status(201).json({ message: 'User created successfully' });

  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {

  console.log(req.body)
  const { email, password } = req.body;

  try {
    const validClient = await Client.findOne({ email });

    if (!validClient) return next(errorHandler(404, 'User not found'));

    const validPassword = bcryptjs.compareSync(password, validClient.password);

    if (!validPassword) return next(errorHandler(401, 'wrong credentials'));

    const token = jwt.sign({ id: validClient._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validClient._doc;
    const expiryDate = new Date(Date.now() + 3600000 * 24); // 24 hours
    
    res.cookie('access_token', token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {

  try {

    const user = await Client.findOne({ email: req.body.email });
    
    if (user) {

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000 * 24); // 24 hours
      
      res.cookie('access_token', token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newClinet = new Client({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });

      await newClinet.save();

      const token = jwt.sign({ id: newClinet._id }, process.env.JWT_SECRET);
      const { password: hashedPassword2, ...rest } = newClinet._doc;
      const expiryDate = new Date(Date.now() + 3600000 * 24); // 24 hours
      
      res.cookie('access_token', token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res) => {
  res.clearCookie('access_token').status(200).json('Signout success!');
};
