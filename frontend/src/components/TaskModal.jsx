import React from 'react';
import { useGlobalContext } from '../context/TasksContext';
import { Modal } from 'react-bootstrap';
import { createTask } from '../api/api';
import TaskForm from './TaskForm';

const TaskModal = ({ show, handleClose }) => {
    const { title, description, formValid, resetForm, createTaskAction, setMessage } = useGlobalContext();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formValid) {
            setMessage(true, "error", "Please fill in all the fields!");
            return;
        }

        const taskData = {
            title: title.value,
            description: description.value,
        };

        createTask(taskData).then((response) => {
            if (response.error === false) {
                createTaskAction(response.data);
                setMessage(true, "success", "Task added successfully!");
            } else {
                setMessage(true, "error", "Something went wrong!");
            }
        });
        resetForm();
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header className="border-0 mb-0 pb-0" closeButton>
                <Modal.Title>Create Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <TaskForm handleSubmit={handleSubmit} />

            </Modal.Body>
        </Modal>
    );
};

export default TaskModal;
