interface LoadingSpinnerProps {
    size?: "sm" | "md" | "lg";
    text?: string;
}

const LoadingSpinner = ({ size = "md", text }: LoadingSpinnerProps) => {
    const getSizeClasses = () => {
        switch (size) {
            case "sm":
                return "w-4 h-4";
            case "lg":
                return "w-12 h-12";
            default:
                return "w-8 h-8";
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-3">
            <div className={`${getSizeClasses()} animate-spin rounded-full border-2 border-gray-300 border-t-blue-600`}></div>
            {text && <p className="text-gray-600 text-sm">{text}</p>}
        </div>
    );
};

export default LoadingSpinner;
