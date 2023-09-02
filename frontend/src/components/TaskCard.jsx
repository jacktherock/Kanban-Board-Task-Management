import React, { useState } from "react";
import { useGlobalContext } from "../context/TasksContext";
import { Card } from "react-bootstrap";
import { deleteTask } from "../api/api";
import UpdateModal from "./UpdateModal";
import { Draggable } from 'react-beautiful-dnd';

const TaskCard = ({ task, index }) => {

    const { title, description, category } = task;
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
    const handleUpdate = () => {
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
            <Draggable draggableId={task._id} index={index}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <div className="my-4 d-flex justify-content-center align-items-center mx-2">
                            <Card className="shadow rounded-4 border-0 card-bg" style={{ width: "30rem" }}>

                                <Card.Body className="my-3 mx-2" style={{ position: "relative" }}>
                                    <Card.Title className="fs-6">{title}</Card.Title>
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
                                    className="badge text-dark rounded-pill card-badge fw-semibold font-monospace"
                                >
                                    {category}
                                </span>
                            </Card>

                        </div>
                    </div>
                )}
            </Draggable>

            {/* Update Modal */}
            <UpdateModal show={showUpdateModal} handleClose={handleCloseUpdateModal} task={task} handleUpdate={handleUpdate} />
        </>

    );
};

export default TaskCard;
