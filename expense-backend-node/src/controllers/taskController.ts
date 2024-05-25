import { Request, Response } from 'express';
import { Task } from '../models/task';

let tasks: Task[] = [];
let nextId = 1;

export const getAllTasks = (req: Request, res: Response) => {
  res.status(200).json(tasks);
};

export const getTaskById = (req: Request, res: Response) => {
  const task = tasks.find(task => task.id === parseInt(req.params.id));
  if (task) {
    res.status(200).json(task);
  } else {
    res.status(404).send('Task not found');
  }
};

export const createTask = (req: Request, res: Response) => {
  const newTask: Task = {
    id: nextId++,
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    dueDate: req.body.dueDate
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
};

export const updateTask = (req: Request, res: Response) => {
  const task = tasks.find(task => task.id === parseInt(req.params.id));
  if (task) {
    task.title = req.body.title;
    task.description = req.body.description;
    task.status = req.body.status;
    task.dueDate = req.body.dueDate;
    res.status(200).json(task);
  } else {
    res.status(404).send('Task not found');
  }
};

export const deleteTask = (req: Request, res: Response) => {
  const index = tasks.findIndex(task => task.id === parseInt(req.params.id));
  if (index !== -1) {
    tasks.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Task not found');
  }
};
