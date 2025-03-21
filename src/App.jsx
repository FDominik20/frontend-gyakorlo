import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Row, Col, Modal, Form } from "react-bootstrap";
import { BiPencil, BiFileText } from "react-icons/bi"; // Módosított ikonok

const App = () => {
  const [halak, setHalak] = useState([]);
  const [selectedHal, setSelectedHal] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [halForm, setHalForm] = useState({ name: "", description: "" });

  const apiUrl = "https://halak.onrender.com/api/Halak";

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => setHalak(response.data))
      .catch((error) => console.error("Hiba a halak lekérésekor:", error));
  }, []);

  const handleViewDetails = (id) => {
    axios
      .get(`${apiUrl}/${id}`)
      .then((response) => {
        setSelectedHal(response.data);
        setHalForm({
          name: response.data.name,
          description: response.data.description,
        });
        setShowModal(true);
      })
      .catch((error) => console.error("Hiba a hal részleteinek lekérésekor:", error));
  };

  const handleUpdateHal = () => {
    axios
      .put(`${apiUrl}/${selectedHal.id}`, halForm)
      .then((response) => {
        setHalak((prevHalak) =>
          prevHalak.map((hal) =>
            hal.id === selectedHal.id ? response.data : hal
          )
        );
        setShowModal(false);
      })
      .catch((error) => console.error("Hiba a hal frissítésekor:", error));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setHalForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  return (
    <div className="container mt-5">
      <h1>Halak listája</h1>
      <Row>
        {halak.map((hal) => (
          <Col key={hal.id} md={4}>
            <Card className="mb-4">
              <Card.Img
                variant="top"
                src={`data:image/jpeg;base64,${hal.image}`}
                alt={hal.name}
              />
              <Card.Body>
                <Card.Title>{hal.name}</Card.Title>
                <Card.Text>{hal.description}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => handleViewDetails(hal.id)}
                >
                  <BiFileText /> Részletek
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedHal ? selectedHal.name : ""} Részletek</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formHalName">
              <Form.Label>Hal neve</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={halForm.name}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formHalDescription">
              <Form.Label>Leírás</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={halForm.description}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleUpdateHal}>
              <BiPencil /> Módosítás
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default App;
