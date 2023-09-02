import React from "react";
import { useGlobalContext } from "../../context/TasksContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Message = () => {
    const { error } = useGlobalContext();
    const { isError, message } = error;

    return (
        <div>

            <ToastContainer
                position="bottom-right"
                autoClose={1500}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="light"
                className="mt-5"
                limit={3}
            >
                {isError && <div>{message}</div>}
            </ToastContainer>

        </div>
    );
};

export default Message;
