
const initialState = {
    title: { value: "", touched: false, hasError: false, error: "", msgType: "danger" },
    description: { value: "", touched: false, hasError: false, error: "", msgType: "danger" },
    error: { isError: false, message: "", type: "error" },
    tasks: [],
    category: { value: "", touched: false, hasError: false, error: "", msgType: "danger" },
    isLoading: true
};

const tasksReducer = (state, action) => {
    switch (action.type) {

        case "INPUT_FOCUSED":
            return {
                ...state,
                [action.payload]: { ...state[action.payload], touched: true }
            }

        case "INPUT_BLUR":
            if (action.payload.value.trim().length === 0) {
                return {
                    ...state,
                    [action.payload.key]: {
                        ...state[action.payload.key],
                        hasError: true,
                        error: `${action.payload.placeholder} field is required!`
                    }
                }
            }

            return {
                ...state,

            };

        case "INPUT_CHANGE":
            return {
                ...state,
                [action.payload.key]: {
                    ...state[action.payload.key],
                    value: action.payload.value,
                    hasError: false
                }
            }

        case "FORM_RESET":
            return {
                ...state,
                ...initialState,
            };

        case "SET_MESSAGE":
            return {
                ...state,
                error: {
                    ...state.error,
                    isError: action.payload.isError,
                    message: action.payload.message,
                    type: action.payload.type,
                },
            }

        case "CREATE_TASK":
            return {
                ...state,
                tasks: [...state.tasks, action.payload],
            };

        case "DELETE_TASK":
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload),
            };

        case "FETCH_TASKS":
            return {
                ...state,
                tasks: action.payload,
                isLoading: false,
            };

        case "UPDATE_TASK":
            return {
                ...state,
                tasks: state.tasks.map(task => task.id === action.payload.id ? action.payload : task),
            };

        case "SELECT_CATEGORY":
            return {
                ...state,
                category: {
                    ...state.category,
                    value: action.payload
                }
            }

        default:
            return state;
    }
};

export { initialState, tasksReducer };