import React from 'react';
import { useGlobalContext } from '../context/TasksContext';
import TaskCard from './TaskCard';
import { Row, Col, Spinner } from 'react-bootstrap';
import { XCircle } from 'lucide-react';
import { useEffect } from 'react';
import { fetchTasks } from '../api/api';

const TaskList = ({ searchQuery }) => {
    const { tasks, isLoading, fetchTasksAction } = useGlobalContext();

    useEffect(() => {
        fetchTasks().then((response) => {
            if (response.error === false) {
                fetchTasksAction(response.data);
            }
        });
    }, [tasks]);

    // Organize tasks by category
    const tasksByCategory = {
        'To Do': [],
        'Doing': [],
        'Done': [],
    };

    tasks.forEach((task) => {
        tasksByCategory[task.category].push(task);
    });

    // Filter tasks based on search query
    const filteredTasks = tasks.filter((task) => {
        const lowerSearchQuery = searchQuery.toLowerCase();
        return (
            task.title.toLowerCase().includes(lowerSearchQuery) ||
            task.description.toLowerCase().includes(lowerSearchQuery)
        );
    });

    return (
        <Row>
            {Object.keys(tasksByCategory).map((category) => (
                <Col key={category} xs={12} md={4}>
                    <p className="fs-4 m-0 text-center rounded-4">
                        {category}
                    </p>
                    <Row>
                        {isLoading ? (
                            <div className="text-center">
                                <Spinner animation="border" className="spinner-clr" />
                            </div>
                        ) : filteredTasks.length === 0 ? (
                            <p className="text-danger fw-semibold text-capitalize text-center">
                                <XCircle size={16} /> No tasks available!
                            </p>
                        ) : (
                            filteredTasks
                                .filter((task) => task.category === category)
                                .map((task, index) => (
                                    <Col key={index} xs={12} sm={6} md={12} lg={6}>
                                        <TaskCard task={task} />
                                    </Col>
                                ))
                        )}
                    </Row>
                </Col>
            ))}
        </Row>
    );
};

export default TaskList;
