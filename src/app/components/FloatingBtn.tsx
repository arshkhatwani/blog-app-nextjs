interface Props {
    title: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function FloatingBtn({ title, onClick }: Props) {
    return (
        <div className="fixed bottom-4 right-4">
            <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg"
                onClick={onClick}>
                {title}
            </button>
        </div>
    );
}
