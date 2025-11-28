import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const [validated, setValidated] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    } else {
      // Handle form submission here (e.g., API call)
      console.log('Form submitted:', formData);
      setShowSuccess(true);
      
      // Reset form after successful submission
      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: ''
      });
      setValidated(false);

      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
    }
  };

  return (
    <Container className="contact-page py-5">
      <Row className="justify-content-center">
        <Col lg={8} xl={6}>
          <div className="text-center mb-5">
            <h1 className="display-4 mb-3">Contact Us</h1>
            <p className="lead text-muted">
              Get in touch for reservations or inquiries. We'd love to hear from you!
            </p>
          </div>

          {showSuccess && (
            <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
              Thank you for contacting us! We'll get back to you soon.
            </Alert>
          )}

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name *</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide your name.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label>Phone Number *</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide your phone number.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email Address *</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email address.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSubject">
              <Form.Label>Subject *</Form.Label>
              <Form.Select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              >
                <option value="">Select a subject</option>
                <option value="reservation">Reservation</option>
                <option value="inquiry">General Inquiry</option>
                <option value="catering">Catering</option>
                <option value="feedback">Feedback</option>
                <option value="other">Other</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select a subject.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formMessage">
              <Form.Label>Message *</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="message"
                placeholder="Enter your message"
                value={formData.message}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a message.
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-grid">
              <Button variant="primary" type="submit" size="lg" style={{background: "#c72a2a", border: "none"}}>
                Send Message
              </Button>
            </div>
          </Form>

          <div className="mt-5 pt-4 border-top text-center">
            <h5 className="mb-3">Other Ways to Reach Us</h5>
            <p className="mb-2">
              <strong>Phone:</strong> 0396893300
            </p>
            <p className="mb-2">
              <strong>Email:</strong> info@dtfusionz.com
            </p>
            <p className="mb-0">
              <strong>Address:</strong> 18A Essex St, Footscray, VIC

            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactPage;
