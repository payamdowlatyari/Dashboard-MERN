import Client from '../models/client.model.js';
import { errorHandler } from '../utils/error.js';
import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

// api/client

// update client
export const updateClient = async (req, res, next) => {

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          isAdmin: req.body.isAdmin,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedClient._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// delete client
export const deleteClient = async (req, res, next) => {

  const { client } = req.body;
  const { id } = req.params;

  if (client._id !== id) {
    return next(errorHandler(401, 'You can delete only your account!'));
  }
  try {
    await Client.findByIdAndDelete(_id);
    res.status(200).json('Client has been deleted...');
  } catch (error) {
    next(error);
  }
}

// update project
// export const deleteClientByAdmin = async (req, res) => {

//   const { id: _id } = req.params

//   try {
//     await Client.findByIdAndDelete(_id);
//     res.status(200).json('Client has been deleted...');
//   } catch (error) {
//     res.status(403).json("Action forbidden");
//   }
// }