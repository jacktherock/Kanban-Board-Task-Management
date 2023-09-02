import axiosClient from "./apiClient.jsx";

export const getTasks = () => {
    return axiosClient().get("tasks").then(response => response.data);
}

export const addTask = (task) => {
    return axiosClient().post("create-task", task).then(response => response.data);
}

export const updateTask = (task) => {
    return axiosClient().put(`update-task/${task._id}`, task).then(response => response.data);
}

export const deleteTask = (id) => {
    return axiosClient().delete(`delete-task/${id}`).then(response => response.data);
}

export const updateCategory = (id, newCategory) => {
    return axiosClient().put(`update-category/${id}`, { newCategory }).then(response => response.data);
}

// this is the same as above but using async/await

export const fetchTasks = async () => {
    const tasks = await getTasks();
    return tasks;
}

export const createTask = async (task) => {
    const newTask = await addTask(task);
    return newTask;
}

export const updateTaskById = async (task) => {
    const updatedTask = await updateTask(task);
    return updatedTask;
}