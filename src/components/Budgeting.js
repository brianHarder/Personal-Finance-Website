import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

const Budgeting = () => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [expenses, setExpenses] = useState([]);

  // Calculate total expense amount
  const totalAmount = expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0).toFixed(2);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount && category) {
      setExpenses([...expenses, { amount, category }]);
      setAmount('');
      setCategory('');
    }
  };

  const handleDelete = (index) => {
    const newExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(newExpenses);
  };

  return (
    <Container className="budgeting-container">
      <Row className="justify-content-center mb-4">
        <Col xs={12} md={8} lg={6}>
          <h1 className="text-center">Expense Tracker</h1>
          <Form onSubmit={handleSubmit} className="mb-4">
            <Form.Group controlId="formAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                required
              />
            </Form.Group>
            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter category"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Add Expense
            </Button>
          </Form>
          <h3 className="text-center mb-4">Total: ${totalAmount}</h3>
          <Row>
            {expenses.map((expense, index) => (
              <Col xs={12} md={6} lg={4} key={index} className="mb-3">
                <Card>
                  <Card.Body>
                    <Card.Title>{expense.category}</Card.Title>
                    <Card.Text>${expense.amount}</Card.Text>
                    <Button variant="danger" onClick={() => handleDelete(index)}>
                      Remove
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Budgeting;
