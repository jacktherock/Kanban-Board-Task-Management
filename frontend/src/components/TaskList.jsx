import React from 'react';
import { useGlobalContext } from '../context/TasksContext';
import TaskCard from './TaskCard';
import { fetchTasks } from '../api/api';
import { Row, Col, Spinner } from 'react-bootstrap';
import { XCircle } from 'lucide-react'

const TaskList = () => {
    const { tasks, isLoading, fetchTasksAction } = useGlobalContext();


    fetchTasks().then((response) => {
        if (response.error === false) {
            fetchTasksAction(response.data);
        }
    });

    return (
        <Row>
            {isLoading ? (
                <Col className="text-center">
                    <Spinner animation="border" variant="primary" />
                </Col>
            ) : (tasks.length === 0 ? (
                <Col className="text-center">
                    <p className="text-danger fw-semibold text-capitalize">
                        <XCircle size={16} /> No tasks available!
                    </p>
                </Col>
            ) : (
                tasks.map((task, index) => (
                    <Col key={index} xs={12} sm={6} md={4} lg={4}>
                        <TaskCard task={task} />
                    </Col>
                ))
            )
            )}
        </Row>
    );
};

export default TaskList;
