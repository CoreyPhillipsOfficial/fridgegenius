import { useState } from 'react';

interface Props {
    onSubmit: (ingredients: string[]) => void;
}

export default function IngredientInput({ onSubmit }: Props) {
    const [value, setValue] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const list = value
            .split(',')
            .map((item) => item.trim())
            .filter((item) => item);
        onSubmit(list);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-2">
            <textarea
                className="w-full p-2 border rounded"
                rows={4}
                placeholder="Enter ingredients, comma-separated"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button type="submit" className="px-4 py-2 bg-black text-white rounded">
                Get Recipes
            </button>
        </form>
    );
}
