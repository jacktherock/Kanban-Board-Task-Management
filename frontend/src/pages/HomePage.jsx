import React, { useState } from 'react';
import TaskList from '../components/TaskList';
import { Container, Button } from 'react-bootstrap';
import TaskModal from '../components/TaskModal';
import { PlusCircle } from 'lucide-react';

const HomePage = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Container className="my-4" fluid>
            <Button variant="info" className="text-white btn btn-sm rounded-3 mx-5" onClick={handleShow}>
                Create New Task <PlusCircle size={16} />
            </Button>

            <TaskModal show={show} handleClose={handleClose} />
            <TaskList show={show} handleShow={handleShow} handleClose={handleClose} />
        </Container>
    );
};

export default HomePage;
