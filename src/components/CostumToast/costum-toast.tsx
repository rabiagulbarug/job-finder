interface CustomToastProps {
    type: "success" | "error";
    message: string;
}
export const CustomToast = ({type, message}: CustomToastProps) => {
    return (
        <div>
            <div className={`toast-${type}`}>
                <span>{message}</span>
            </div>
        </div>
    );

};

