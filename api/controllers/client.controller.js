import Client from '../models/client.model.js';
import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

// api/client

// update client
export const updateClient = async (req, res, next) => {

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) 
      return res.status(404).send('No client with that id exists!')

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
    res.status(409).json(error.message);
  }
};

// delete client
export const deleteClient = async (req, res, next) => {

  const { client } = req.body;
  const { id } = req.params;

  if (client._id !== id) {
    res.status(401).json('You are not allowed to delete this account!')
  }
  try {
    await Client.findByIdAndDelete(_id);
    res.status(200).json('Client has been deleted successfuly!');
  } catch (error) {
    res.status(403).json(error.message);
  }
}
