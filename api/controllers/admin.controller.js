import Client from '../models/client.model.js';
import Project from '../models/project.model.js';
import Admin from '../models/admin.model.js';
import mongoose from 'mongoose';

// api/admin

// get admin access
export const verifyAdminAccess = async (req, res) => {

  const { id: _id } = req.params
  try {
    const admin = await Admin.find({ userId: _id }); 
      res.status(200).json({ data: admin });

  } catch (error) {    
      res.status(404).json({ message: error.message });
  }
} 

// create admin access
export const createAdminAccess = async (req, res) => {

  const admin = req.body;

  if(!mongoose.Types.ObjectId.isValid(admin.userId)) 
          return res.status(404).send('No user with that id exists!')

  try {
        const newAdmin = new Admin({...admin });
        await newAdmin.save()
        res.status(201).json(newAdmin) 

  } catch (error) {    
        res.status(409).json(error.message)
  }
}

// update project
export const updateAdminAccess = async (req, res) => {

  const { id: _id } = req.params
  const admin = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) 
          return res.status(404).send('No Admin with that id exists!')
    try {
      const updatedAdmin = await Admin.findByIdAndUpdate(_id, {...admin, _id}, { new: true})
      res.status(200).json(updatedAdmin)

    } catch (error) {
      res.status(409).json(error.message);
    }
}

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
        res.status(200).json(clients);
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

// create client
export const createClient = async (req, res) => {

    const client = req.body

    try {
        const newClient = new Client({...client })
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

// delete project
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

    if(!mongoose.Types.ObjectId.isValid(_id)) 
          return res.status(404).send('No project with that id exists!')

    try {
        const updatedProject = await Project.findByIdAndUpdate(_id, {...project, _id}, { new: true})
        res.json(updatedProject)

    } catch (error) {
        res.status(409).json(error.message);
    }
}

// delete project
export const deleteProject = async (req, res) => {

  const { id: _id } = req.params

  try {
      await Project.findByIdAndDelete(_id);
        res.status(200).json('Project has been deleted...');
  } catch (error) {
        res.status(403).json(error.message);
  }
}