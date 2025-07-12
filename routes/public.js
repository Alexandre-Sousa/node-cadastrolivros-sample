import express from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

//cadastrar-livro
router.post('/cadastro', async (req, res) => {

    try {
        const user = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.password, salt);
        
        const userDB = await prisma.User.create({
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

export default router;