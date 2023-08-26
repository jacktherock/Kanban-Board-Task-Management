import React, { createContext, useReducer, useContext } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { initialState, tasksReducer } from '../reducers/TasksReducer';

const TasksContext = createContext();

const TasksProvider = ({ children }) => {
    const [state, dispatch] = useReducer(tasksReducer, initialState);

    const onFocusHandler = (e) => {
        dispatch({ type: "INPUT_FOCUSED", payload: e.target.name })
    }

    const onBlurHandler = (e) => {
        dispatch({
            type: "INPUT_BLUR",
            payload: {
                key: e.target.name,
                value: e.target.value,
                placeholder: e.target.placeholder,
                name: e.target.name,
                label: e.target.label,
            }
        });
    }

    const valueChangeHandler = (e) => {
        dispatch({
            type: "INPUT_CHANGE",
            payload: {
                key: e.target.name,
                value: e.target.value
            }
        });
    }

    const resetForm = () => {
        dispatch({ type: "FORM_RESET" });
    }

    const setMessage = (isError, type, message) => {
        dispatch({
            type: "SET_MESSAGE",
            payload: {
                isError, type, message
            }
        });
        toast[type](message); // shows toast message
    }


    const fetchTasksAction = (tasks) => {
        dispatch({ type: "FETCH_TASKS", payload: tasks })
    }

    const createTaskAction = (task) => {
        dispatch({ type: "CREATE_TASK", payload: task })
    }

    const deleteTaskAction = (taskId) => {
        dispatch({ type: "DELETE_TASK", payload: taskId })
    }

    return (
        <TasksContext.Provider value={{ ...state, setMessage, createTaskAction, deleteTaskAction, fetchTasksAction, onFocusHandler, onBlurHandler, valueChangeHandler, resetForm }
        }>
            {children}
        </TasksContext.Provider>
    );
};

const useGlobalContext = () => {
    return useContext(TasksContext);
};

export { TasksContext, TasksProvider, useGlobalContext };
