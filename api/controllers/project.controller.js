import Project from '../models/project.model.js';
import { errorHandler } from '../utils/error.js';
import mongoose from 'mongoose';

// get project by owner
export const getProjectByOwner = async (req, res) => {

    try {
        const projects = await Project.find({ ownerId: req.params.id });
        res.status(200).json({ data: projects });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

// get all projects
export const getProjects = async (req, res) => {

    try {
        const allProjects = await Project.find({}).sort({_id:-1}) 
        res.status(200).json(allProjects)
    } catch (error) {
        res.status(409).json(error.message) 
    }
}

// create project
export const createProject = async (req, res) => {

    const project = req.body
    const newProject = new Project(project)

    try {
        await newProject.save()
        res.status(201).json(newProject)
    } catch (error) {
        res.status(409).json(error.message)
    }
}

// get project by id
export const getProjectById = async (req, res) => { 

    const { id } = req.params;
    try {
        const project = await Project.findById(id);     
        res.status(200).json(project);
    } catch (error) {
        res.status(409).json({ message: error.message });
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

