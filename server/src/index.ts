import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/recipe', async (req, res) => {
    const { ingredients } = req.body;
    // TODO: Call OpenAI API here
    res.json({ recipe: "Mock recipe using: " + ingredients.join(', ') });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
