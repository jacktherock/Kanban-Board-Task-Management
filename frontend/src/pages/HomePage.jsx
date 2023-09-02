import React, { useState } from "react";
import TaskList from "../components/TaskList";
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import TaskModal from "../components/TaskModal";
import { PlusCircle, Search } from "lucide-react";

const HomePage = () => {

    const [show, setShow] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Container className="py-4 home-bg min-vh-100" fluid>
            <Row>

                <Col xs={12} sm={6} md={6} lg={6}>
                    <Form className="px-2 pb-4">
                        <Form.Group className="d-flex">
                            <Form.Control
                                size="sm"
                                type="text"
                                placeholder="Search task"
                                className=" mr-sm-2 rounded-3 border-0 input-field-bg"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Form.Label className="my-auto px-2">
                                <Search size="17" />
                            </Form.Label>
                        </Form.Group>
                    </Form>
                </Col>
                <Col xs={12} sm={6} md={6} lg={6}>
                    <div className="px-2 pb-4">
                        <Button className="text-white btn-add-form btn btn-sm rounded-3 border-0" onClick={handleShow}>
                            Create New Task <PlusCircle size={16} />
                        </Button>
                    </div>
                </Col>
            </Row>

            <TaskModal show={show} handleClose={handleClose} />
            <TaskList show={show} handleShow={handleShow} handleClose={handleClose} searchQuery={searchQuery} />
        </Container>
    );
};

export default HomePage;
