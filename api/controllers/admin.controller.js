import Client from '../models/client.model.js';
import Project from '../models/project.model.js';
import { errorHandler } from '../utils/error.js';
import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

// api/admin

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

       console.log(clients)

        res.status(200).json(clients);
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

// update project
export const updateClientByAdmin = async (req, res) => {

  const { id: _id } = req.params
  const client = req.body

  if(!mongoose.Types.ObjectId.isValid(_id)) 
          return res.status(404).send('No client with that id exists!')
  try {
          const updatedClient = await Client.findByIdAndUpdate(_id, {...client, _id}, { new: true})
          res.status(200).json(updatedClient)
    
      } catch (error) {
          res.status(409).json(error.message);
      }
}

// update project
export const deleteClientByAdmin = async (req, res) => {

  const { id: _id } = req.params

  try {
    await Client.findByIdAndDelete(_id);
    res.status(200).json('Client has been deleted...');
  } catch (error) {
    res.status(403).json("Action forbidden");
  }
}


// update project
export const updateProject = async (req, res) => {

    const { id: _id } = req.params
    const project = req.body

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No project with that id exists!')

    const updatedProject = await Project.findByIdAndUpdate(_id, {...project, _id}, { new: true})

    res.json(updatedProject)
}

// delete project
export const deleteProject = async (req, res, next) => {

  if (req.project.id !== req.params.id) 
    return next(errorHandler(401, 'You can delete only your Project!'));
  
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json('Project has been deleted...');
  } catch (error) {
    next(error);
  }
}
