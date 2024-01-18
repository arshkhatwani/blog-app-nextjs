import React from "react";

function ErrorToast({ message }: { message: string }) {
    return (
        <div className="my-3 p-4 bg-red-400 rounded-xl text-white">
            {message}
        </div>
    );
}

export default ErrorToast;
