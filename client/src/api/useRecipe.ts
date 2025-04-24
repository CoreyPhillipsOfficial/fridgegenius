import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useRecipe = () => {
    return useMutation({
        mutationFn: async (ingredients: string[]) => {
            const res = await axios.post('http://localhost:5000/api/recipe', {
                ingredients,
            });
            return res.data.recipe;
        }
    })
}