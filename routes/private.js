import express from 'express' ;
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.get('/listar-cadastros', async (req, res) => {

    try {

        const user = await prisma.user.findMany();

        res.status(200).json({message: "users listed as expected", user});
        
    } catch (error) {
        console.log(error)
         res.status(500).json({message: 'server error'});
    }

})

export default router;