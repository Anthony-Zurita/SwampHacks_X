//inspired by tutorial of implementing auth0: https://www.youtube.com/watch?v=pAzqscDx580&ab_channel=DaveGray

import { Container, Row, Col, Card } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
    const { user, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <Container className="mt-4">
                <Row className="justify-content-center">
                    <Col md={8} lg={6}>
                        <Card className="text-center shadow">
                            <Card.Header className="bg-white">
                                <h2 className="fw-bold text-dark mb-0">User Dashboard</h2>
                            </Card.Header>
                            <Card.Body>
                                <div className="d-grid gap-2">
                                    {user?.picture && (
                                        <img 
                                            src={user.picture} 
                                            alt={user?.name} 
                                            className="rounded-circle mx-auto"
                                            style={{ width: '100px', height: '100px' }}
                                        />
                                    )}
                                    <h2>{user?.name}</h2>
                                    <p className="text-muted">{user?.email}</p>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    );
}

export default Profile