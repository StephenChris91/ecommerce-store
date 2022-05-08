import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

export default function FormContainer({ children }) {
    

    return (
        <Container className="mt-2 mx-auto">
            <Row className="justify-content-md-venter">
                <Col md={6} xs={12}>
                    { children}
                </Col>
            </Row>
        </Container>

    )
}
