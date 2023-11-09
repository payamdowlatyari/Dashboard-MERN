import Client from '../models/client.model.js';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';

// get client
export const getClient = async (req, res) => { 

    const { id } = req.params;

    try {
        const client = await Client.findById(id);
        
        res.status(200).json(client);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// get clients
export const getClients = async (req, res) => {

    try {
        const clients = await Client.find().sort({ _id: -1 })

        res.json({ data: clients});
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

// create client
export const createClient = async (req, res) => {

    const client = req.body
    const newClient = new Client({...client })

    try {
        await newClient.save()
        res.status(201).json(newClient)
    } catch (error) {
        res.status(409).json(error.message)
    }
}

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
          profilePicture: req.body.profilePicture,
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
  if (req.client.id !== req.params.id) {
    return next(errorHandler(401, 'You can delete only your account!'));
  }
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted...');
  } catch (error) {
    next(error);
  }
}