interface ErrorMessageProps {
    title?: string;
    message: string;
    onRetry?: () => void;
    type?: "error" | "warning" | "info";
}

const ErrorMessage = ({ 
    title = "Something went wrong", 
    message, 
    onRetry, 
    type = "error" 
}: ErrorMessageProps) => {
    const getBackgroundColor = () => {
        switch (type) {
            case "warning":
                return "bg-yellow-50 border-yellow-200";
            case "info":
                return "bg-blue-50 border-blue-200";
            default:
                return "bg-red-50 border-red-200";
        }
    };

    const getTextColor = () => {
        switch (type) {
            case "warning":
                return "text-yellow-800";
            case "info":
                return "text-blue-800";
            default:
                return "text-red-800";
        }
    };

    const getIcon = () => {
        switch (type) {
            case "warning":
                return "/icons/warning.svg";
            case "info":
                return "/icons/info.svg";
            default:
                return "/icons/cross.svg";
        }
    };

    return (
        <div className={`rounded-lg border p-4 ${getBackgroundColor()}`}>
            <div className="flex items-start gap-3">
                <img src={getIcon()} alt={type} className="w-5 h-5 mt-0.5" />
                <div className="flex-1">
                    <h3 className={`font-semibold ${getTextColor()}`}>{title}</h3>
                    <p className={`mt-1 text-sm ${getTextColor()}`}>{message}</p>
                    {onRetry && (
                        <button
                            onClick={onRetry}
                            className="mt-3 text-sm font-medium underline hover:no-underline"
                        >
                            Try again
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ErrorMessage;
