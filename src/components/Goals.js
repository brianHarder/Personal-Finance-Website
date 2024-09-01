import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import emailjs from '@emailjs/browser';

const Goals = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [goal1, setGoal1] = useState('');
  const [goal2, setGoal2] = useState('');
  const [goal3, setGoal3] = useState('');
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    const newErrors = [];
    if (!name) newErrors.push('Name is required');
    if (!email) {
      newErrors.push('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.push('Email must be a valid email address');
    }
    if (!age || isNaN(age) || age <= 0) newErrors.push('Age must be a positive number');
    if (!goal1) newErrors.push('Goal #1 is required');
    if (!goal2) newErrors.push('Goal #2 is required');
    if (!goal3) newErrors.push('Goal #3 is required');
    return newErrors;
  };

  const sendEmail = () => {
    const templateParams = {
      name,
      email,
      age,
      goal1,
      goal2,
      goal3,
    };

    emailjs.send('service_cxddb2a', 'template_ix30agz', templateParams, '91cuVh82CALQ9XiEX')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setSuccessMessage('Goals submitted and email sent successfully!');
      }, (err) => {
        console.log('FAILED...', err);
        setErrors(['Failed to send email. Please try again later.']);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (formErrors.length > 0) {
      setErrors(formErrors);
      setSuccessMessage('');
      return;
    }
    setErrors([]);

    sendEmail();

    setName('');
    setEmail('');
    setAge('');
    setGoal1('');
    setGoal2('');
    setGoal3('');
  };

  return (
    <Container className="goals-container">
      <h1 style={{color: "darkgreen"}}>Financial Goals</h1>
      {errors.length > 0 && (
        <Alert variant="danger">
          {errors.map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </Alert>
      )}
      {successMessage && (
        <Alert variant="success">
          {successMessage}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email (form will be sent here)"
            required
          />
        </Form.Group>
        <Form.Group controlId="age">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter your age"
            required
          />
        </Form.Group>
        <Form.Group controlId="goal1">
          <Form.Label>Goal #1</Form.Label>
          <Form.Control
            type="text"
            value={goal1}
            onChange={(e) => setGoal1(e.target.value)}
            placeholder="Enter your first goal"
            required
          />
        </Form.Group>
        <Form.Group controlId="goal2">
          <Form.Label>Goal #2</Form.Label>
          <Form.Control
            type="text"
            value={goal2}
            onChange={(e) => setGoal2(e.target.value)}
            placeholder="Enter your second goal"
            required
          />
        </Form.Group>
        <Form.Group controlId="goal3">
          <Form.Label>Goal #3</Form.Label>
          <Form.Control
            type="text"
            value={goal3}
            onChange={(e) => setGoal3(e.target.value)}
            placeholder="Enter your third goal"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Goals;
