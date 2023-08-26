import React, { useState } from 'react';
import { useGlobalContext } from '../context/TasksContext';
import { Card } from 'react-bootstrap';
import { deleteTask } from '../api/api';
import UpdateModal from './UpdateModal';

const TaskCard = ({ task }) => {

    const { title, description, status } = task;
    const { deleteTaskAction, setMessage } = useGlobalContext();
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const handleDelete = () => {
        deleteTask(task._id).then((response) => {
            if (response.error === false) {
                deleteTaskAction(task._id);
                setMessage(true, "success", "Task deleted successfully!");
            } else {
                setMessage(true, "error", "Something went wrong!");
            }
        });
    };
    const handleUpdate = (updatedTask) => {
        setShowUpdateModal(false);
    };

    const handleShowUpdateModal = () => {
        setShowUpdateModal(true);
    };

    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
    };

    return (
        <>

            <div className="my-4 d-flex justify-content-center align-items-center mx-2">
                <Card className="shadow rounded-4 border-0" style={{ width: "30rem" }}>

                    <Card.Body className="my-2 mx-2" style={{ position: "relative" }}>
                        <Card.Title className="">{title}</Card.Title>
                        <Card.Text className="" style={{ fontSize: "14px" }}>{description}</Card.Text>
                    </Card.Body>

                    <Card.Footer className="text-muted bg-transparent border-0 pt-0">
                        <span variant="danger" className="text-decoration-underline mx-2" style={{ fontSize: "12px", cursor: "pointer" }} onClick={handleDelete}>
                            Delete
                        </span>
                        <span variant="success" className="text-decoration-underline mx-2" style={{ fontSize: "12px", cursor: "pointer" }} onClick={handleShowUpdateModal}>
                            Edit
                        </span>

                    </Card.Footer>
                    <span
                        style={{ position: "absolute", top: 5, right: 5 }}
                        className="badge text-dark rounded-pill bg-warning"
                    >
                        {status}
                    </span>
                </Card>

            </div>
            {/* Update Modal */}
            <UpdateModal show={showUpdateModal} handleClose={handleCloseUpdateModal} task={task} handleUpdate={handleUpdate} />
        </>

    );
};

export default TaskCard;
