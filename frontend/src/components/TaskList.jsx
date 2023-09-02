import React, { useState } from "react";
import { useGlobalContext } from "../context/TasksContext";
import TaskCard from "./TaskCard";
import { Row, Col, Spinner } from "react-bootstrap";
import { XCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { fetchTasks } from "../api/api";

const TaskList = ({ searchQuery }) => {
    const { tasks, isLoading, fetchTasksAction } = useGlobalContext();
    const tasksPerPage = 5; // Number of tasks to show per page

    // This effect runs whenever tasks change
    useEffect(() => {
        // Fetch tasks when the component mounts
        fetchTasks().then((response) => {
            if (response.error === false) {
                fetchTasksAction(response.data);
            }
        });
    }, [tasks]);

    // Organize tasks by category
    const tasksByCategory = {
        "To Do": [],
        "Doing": [],
        "Done": [],
    };

    // Loop through the tasks and categorize them
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

    // Create a state to manage the current page for each category
    const [currentPage, setCurrentPage] = useState({
        "To Do": 0,
        "Doing": 0,
        "Done": 0,
    });

    // Function to get paginated tasks for a specific category
    const getPaginatedTasks = (category) => {
        const startIdx = currentPage[category] * tasksPerPage;
        const endIdx = startIdx + tasksPerPage;
        return filteredTasks
            .filter((task) => task.category === category)
            .slice(startIdx, endIdx);
    };

    // Function to handle next page for a specific category
    const handleNextPage = (category) => {
        setCurrentPage({
            ...currentPage,
            [category]: currentPage[category] + 1,
        });
    };

    // Function to handle previous page for a specific category
    const handlePrevPage = (category) => {
        if (currentPage[category] > 0) {
            setCurrentPage({
                ...currentPage,
                [category]: currentPage[category] - 1,
            });
        }
    };

    // Function to navigate to a specific page number
    const handlePageClick = (category, pageNumber) => {
        setCurrentPage((prev) => ({
            ...prev,
            [category]: pageNumber,
        }));
    };

    return (
        <Row>
            {Object.keys(tasksByCategory).map((category, index) => (
                <Col key={category} xs={12} md={4}>

                    {/* Add a partition for mobile screens */}
                    {index > 0 && (
                        <hr className="d-md-none d-lg-none mb-3" />
                    )}

                    <div className="d-flex justify-content-around align-items-center">
                        {/* Category title */}
                        <p className="fs-4 m-0 text-center rounded-4 fw-medium">
                            {category}
                        </p>

                        <div>
                            {/* Previous button */}
                            <button
                                onClick={() => handlePrevPage(category)}
                                className="btn btn-sm btn-light rounded-pill me-1"
                                disabled={currentPage[category] === 0}
                            >
                                <ChevronLeft size="14" />
                            </button>

                            {/* Page numbers */}
                            {Array.from(
                                {
                                    length: Math.ceil(filteredTasks.filter(
                                        (task) => task.category === category
                                    ).length / tasksPerPage)
                                },
                                (_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handlePageClick(category, index)}
                                        className={`btn btn-sm border-0
                                        ${currentPage[category] === index
                                                ? "text-decoration-underline" : "text-decoration-none"}`}
                                    >
                                        {index + 1}
                                    </button>
                                )
                            )}

                            {/* Next button */}
                            <button
                                onClick={() => handleNextPage(category)}
                                className="btn btn-sm btn-light rounded-pill ms-1"
                                disabled={currentPage[category] >=
                                    Math.ceil(filteredTasks.filter(
                                        (task) => task.category === category
                                    ).length / tasksPerPage) - 1}
                            >
                                <ChevronRight size="14" />
                            </button>
                        </div>
                    </div>

                    {
                        isLoading ? (
                            < div className="text-center py-5" >
                                {/* show loading spinner when tasks fetching */}
                                <Spinner animation="border" className="spinner-clr" />
                            </div>
                        ) : (
                            <Row>
                                {getPaginatedTasks(category).length === 0 ? (
                                    <p className="text-danger fw-semibold text-capitalize text-center py-5">
                                        {/* show warning when no tasks */}
                                        <XCircle size={16} /> No tasks available!
                                    </p>
                                ) : (
                                    getPaginatedTasks(category).map((task, index) => (
                                        <Col key={index} xs={12} sm={6} md={12} lg={12}>
                                            {/* show tasks by pagination and as per searching query */}
                                            <TaskCard task={task} />
                                        </Col>
                                    ))
                                )}

                            </Row>
                        )
                    }
                </Col>
            ))
            }
        </Row>
    );
};

export default TaskList;
