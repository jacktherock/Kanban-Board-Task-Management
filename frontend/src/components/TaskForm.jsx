import React from 'react';
import { useGlobalContext } from '../context/TasksContext';
import FieldError from './UI/FieldError';
import { Form, Button } from 'react-bootstrap';

const TaskForm = ({ handleSubmit }) => {
    const { title, description, onFocusHandler, onBlurHandler, valueChangeHandler } = useGlobalContext();

    const fields = [
        {
            id: "title",
            name: "title",
            placeholder: "Title",
            label: "Title",
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
            label: "Description",
            value: description.value,
            touched: description.touched,
            hasError: description.hasError,
            error: description.error,
            msgType: description.msgType,
        },
    ]

    return (
        <Form onSubmit={handleSubmit}>
            {
                fields.map((field) => {

                    const { id, name, placeholder, label, value, touched, hasError, error, msgType } = field;

                    return (
                        <Form.Group key={id} className="mb-2">
                            <Form.Label className="ps-2 p-0 m-0 fw-semibold" style={{ fontSize: "13px" }}>{label}</Form.Label>
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
                                className="rounded-3"
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
            <Button variant="success" type="submit" onClick={handleSubmit} className="btn btn-sm float-end rounded-3">
                Add Task
            </Button>
        </Form>
    );
};

export default TaskForm;
