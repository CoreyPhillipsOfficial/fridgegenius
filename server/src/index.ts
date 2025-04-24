import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { db } from './db';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/recipe', async (req: Request, res: Response) => {
    const { ingredients } = req.body;

    if (!ingredients || !Array.isArray(ingredients)) {
        return res.status(400).json({ error: 'Ingredients must be an array.' });
    }

    try {
        const prompt = `I have the following ingredients: ${ingredients.join(', ')}. Suggest a detailed recipe I can make with them.`;

        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 300,
        });

        const recipe = response.data.choices[0].message?.content;

        // Save to DB
        await db.query(
            'INSERT INTO recipes (ingredients, result) VALUES ($1, $2)',
            [ingredients, recipe]
        );

        res.json({ recipe });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Failed to generate recipe' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
