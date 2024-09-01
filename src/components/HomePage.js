import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <Container className="mt-5">
      <Row className="text-center mb-4">
        <Col>
          <h1>Welcome to Your Personal Finance Hub</h1>
          <p>Manage your spending, set goals, and estimate your tax payments all in one place.</p>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Budgeting</Card.Title>
              <Card.Text>
                Track your expenses and effortlessly manage your budget with our intuitive tools.
              </Card.Text>
              <Button variant="secondary" as={Link} to="/budgeting">Learn More</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Personal Financial Goals</Card.Title>
              <Card.Text>
                Set and track your financial goals to help you best plan your financial future.
              </Card.Text>
              <Button variant="secondary" as={Link} to="/financial-goals">Learn More</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Tax Calculators</Card.Title>
              <Card.Text>
                Use our tax calculators to optimize your tax planning and reduce your tax burden.
              </Card.Text>
              <Button variant="secondary" as={Link} to="/tax-calculator">Learn More</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
