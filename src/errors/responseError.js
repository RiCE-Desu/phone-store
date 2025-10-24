import { use } from 'react';
import * as userService from '../services/userService.js';

export const getAllUsersHandler = async (req, res) => {
    const {id} = req.params;
    try {
        const users = await userService.getAllUsers(id);
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch error' });
    }}