import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../context/TasksContext';
import { Form, Modal, Button } from 'react-bootstrap';
import { updateTaskById } from '../api/api';
import FieldError from './UI/FieldError';
import { categoryOptions } from '../data/data';

const UpdateModal = ({ show, handleClose, task, handleUpdate }) => {
    const { title, description, category, formValid, resetForm, setMessage, onFocusHandler, valueChangeHandler, onBlurHandler } = useGlobalContext();

    const [titleValue, setTitleValue] = useState(task.title);
    const [descriptionValue, setDescriptionValue] = useState(task.description);
    const [categoryValue, setCategoryValue] = useState(task.category);

    // useEffect(() => {
    //     setTitleValue(task.title);
    //     setDescriptionValue(task.description);
    //     setCategoryValue(task.category);
    // }, [task]);

    const handleValueChange = (e, setValue) => {
        setValue(e.target.value);
        onFocusHandler(e);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // if (!formValid) {
        //     setMessage(true, "error", "Please fill in all the fields!");
        //     return;
        // }

        const updatedTask = {
            _id: task._id,
            title: titleValue,
            description: descriptionValue,
            category: categoryValue
        };

        updateTaskById(updatedTask).then((response) => {
            if (response.error === false) {
                handleUpdate(updatedTask);
                setMessage(true, "success", "Task updated successfully!");
            } else {
                setMessage(true, "error", "Something went wrong!");
            }
        });

        resetForm();
    };

    const fields = [
        {
            id: "title",
            name: "title",
            placeholder: "Title",
            label: "Title of task",
            value: titleValue,
            touched: title.touched,
            hasError: title.hasError,
            error: title.error,
            msgType: title.msgType,
            handleValueChange: (e) => handleValueChange(e, setTitleValue),
        },
        {
            id: "description",
            name: "description",
            placeholder: "Description",
            label: "Description of task",
            value: descriptionValue,
            touched: description.touched,
            hasError: description.hasError,
            error: description.error,
            msgType: description.msgType,
            handleValueChange: (e) => handleValueChange(e, setDescriptionValue),
        },
    ]

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header className="border-0 mb-0 pb-0" closeButton>
                <Modal.Title>Update Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {
                        fields.map((field) => {

                            const { id, name, placeholder, label, value, touched, hasError, error, msgType, handleValueChange } = field;

                            return (
                                <Form.Group key={id} className="mb-3">
                                    <Form.Label className="ps-2 p-0 m-0 fw-medium" style={{ fontSize: "13px" }}>{label}</Form.Label>
                                    <Form.Control
                                        size="sm"
                                        as="textarea"
                                        rows={2}
                                        id={id}
                                        name={name}
                                        type="text"
                                        placeholder={placeholder}
                                        value={value}
                                        onChange={handleValueChange}
                                        onBlur={onBlurHandler}
                                        className="rounded-3 input-field-bg "
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
                        <Form.Label className="ps-2 p-0 m-0 fw-medium" style={{ fontSize: "13px" }}> Status of task</Form.Label>
                        <Form.Select
                            size="sm"
                            id="category"
                            name="category"
                            value={categoryValue}
                            onChange={(e) => { handleValueChange(e, setCategoryValue) }}
                            className="rounded-3 input-field-bg "
                        >
                            <option value="" >Select category</option>
                            {categoryOptions.map(option => (
                                <option key={option.value} value={option.label}>
                                    {option.label}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Button type="submit" className="btn btn-sm float-end rounded-3 btn-form border-0">
                        Update Task
                    </Button>
                </Form>
            </Modal.Body>
        </Modal >
    );
};

export default UpdateModal;
