import React from "react";
import { useGlobalContext } from "../context/TasksContext";
import { Modal, Form, Button } from "react-bootstrap";
import { createTask } from "../api/api";
import { categoryOptions } from "../data/data";
import FieldError from "./UI/FieldError";

const TaskModal = ({ show, handleClose }) => {
    const { title, description, category, resetForm, createTaskAction, setMessage, onFocusHandler, onBlurHandler, valueChangeHandler, categoryHandler } = useGlobalContext();

    const fields = [
        {
            id: "title",
            name: "title",
            placeholder: "Title",
            label: "Title of task",
            value: title.value,
            touched: title.touched,
            hasError: title.hasError,
            error: title.error,
            msgType: title.msgType,
        },
        {
            id: "description",
            name: "description",
            placeholder: "Description",
            label: "Description of task",
            value: description.value,
            touched: description.touched,
            hasError: description.hasError,
            error: description.error,
            msgType: description.msgType,
        },
    ]

    const handleSubmit = (e) => {
        e.preventDefault();

        if (title.value.trim() === "" || description.value.trim() === "" || category.value === "") {
            setMessage(true, "error", "Please fill in all the fields!");
            return;
        }

        const taskData = {
            title: title.value,
            description: description.value,
            category: category.value
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

                <Form onSubmit={handleSubmit}>
                    {
                        fields.map((field) => {

                            const { id, name, placeholder, label, value, touched, hasError, error, msgType } = field;

                            return (
                                <Form.Group key={id} className="mb-3">
                                    <Form.Label className="ps-2 p-0 m-0 fw-medium" style={{ fontSize: "13px" }}>{label}</Form.Label>
                                    <Form.Control
                                        size="sm"
                                        as="textarea"
                                        rows={2}
                                        name={name}
                                        type="text"
                                        placeholder={placeholder}
                                        value={value}
                                        onChange={valueChangeHandler}
                                        onFocus={onFocusHandler}
                                        onBlur={onBlurHandler}
                                        className="rounded-3 input-field-bg position-relative border-0"
                                    />
                                    <FieldError
                                        touched={touched}
                                        hasError={hasError}
                                        error={error}
                                        msgType={msgType}
                                    />
                                </Form.Group>
                            )
                        }
                        )}
                    <Form.Group className="mb-2">
                        <Form.Label className="ps-2 p-0 m-0 fw-medium" style={{ fontSize: "13px" }}>Status of task</Form.Label>
                        <Form.Select
                            size="sm"
                            id="category"
                            name="category"
                            value={category.value}
                            onChange={categoryHandler}
                            className="rounded-3 input-field-bg border-0"
                        >
                            <option value="">Select category</option>
                            {categoryOptions.map(option => (
                                <option key={option.value} value={option.label} className="bg-light">
                                    {option.label}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Button type="submit" onClick={handleSubmit} className="btn btn-sm float-end rounded-3 btn-form border-0">
                        Add Task
                    </Button>
                </Form>

            </Modal.Body>
        </Modal>
    );
};

export default TaskModal;
