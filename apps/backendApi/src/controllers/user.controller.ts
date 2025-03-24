import { Request, Response } from 'express';
import { users, User } from '../models/user.model';
import { v4 as uuidv4 } from 'uuid';

export const getUsers = (req: Request, res: Response) => {
  return res.json(users);
};

export const createUser = (req: Request, res: Response) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  const newUser: User = { id: uuidv4(), name, email };
  users.push(newUser);

  return res.status(201).json(newUser);
};

export const getUserById = (req: Request, res: Response) => {
  const user = users.find((u) => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.json(user);
};

export const updateUser = (req: Request, res: Response) => {
  const user = users.find((u) => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  return res.json(user);
};

export const deleteUser = (req: Request, res: Response) => {
  const index = users.findIndex((u) => u.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  users.splice(index, 1);
  return res.status(204).send();
};
