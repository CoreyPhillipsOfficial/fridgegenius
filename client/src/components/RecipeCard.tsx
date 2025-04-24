interface Props {
    content: string;
}

export default function RecipeCard({ content }: Props) {
    return (
        <div className="border rounded p-4 bg-white shadow mt-4 whitespace-pre-wrap">
            {content}
        </div>
    );
}
