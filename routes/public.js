import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

//cadastrar-livro
router.post('/cadastro', async (req, res) => {

    try {
        const user = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.password, salt);
        
        const userDB = await prisma.user.create({
            data: {
                user: user.user,
                password: hashPassword,
                book: user.book,
                author: user.author,
                notes: user.notes,
                done: user.done
            }
        })

        res.status(201).json(userDB);
    } catch (error) {
        res.status(500).json({message: 'server error'});
    }
    
})

//login
router.post('/login', async (req, res) => {

    try {
        const userInfo = req.body;

        const user = await prisma.user.findUnique({
            where: { 
                user: userInfo.user
            }
        });

        if (!user) {
            return res.status(404).json({message: 'user not found'});
        }

        const isMatch = await bcrypt.compare(userInfo.password, user.password);

        if (!isMatch) {
            return res.status(404).json({message: 'password doesn`t match'});
        }

        const token = jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: '10m'});

        req.userId = decoded.id;

    } catch (error) {
        res.status(500).json({message: 'server error'});
    }

})

export default router;