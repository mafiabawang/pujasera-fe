import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Form, Button, Spinner, Toast } from 'react-bootstrap';
import { useCreateUser, useFetchUsers } from '../features/user';

const UserAdd = () => {
    const navigate = useNavigate();
    const [showSuccess, setShowSuccess] = useState(false);
    const [message, setMessage] = useState('');

    const { refetch: refecthUsers } = useFetchUsers();

    const { mutate: createUser, isLoading: createUserIsLoading } = useCreateUser({
        onSuccess: (data) => {
            refecthUsers();
            setMessage(data.message);
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                navigate('/users');
            }, 1000);
        }
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            role: 0,
        },
        onSubmit: () => {
            const { username, email, password, role } = formik.values;
            createUser({ username, email, password, role: parseInt(role) });

            formik.setFieldValue("username", "");
            formik.setFieldValue("email", "");
            formik.setFieldValue("password", "");
            formik.setFieldValue("role", 0);
        }
    });

    const handleFormInput = (e) => formik.setFieldValue(e.target.name, e.target.value);

    return (
        <div>
            <h1 className="mb-3">Add User</h1>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group controlId="username" className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        name="username"
                        onChange={handleFormInput}
                        value={formik.values.username}
                    />
                </Form.Group>
                <Form.Group controlId="email" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        onChange={handleFormInput}
                        value={formik.values.email}
                    />
                </Form.Group>
                <Form.Group controlId="password" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        name="password"
                        onChange={handleFormInput}
                        value={formik.values.password}
                    />
                </Form.Group>
                <Form.Group controlId="role" className="mb-3">
                    <Form.Label>Role</Form.Label>
                    <Form.Select
                        name="role"
                        onChange={handleFormInput}
                        value={formik.values.role}
                    >
                        <option value="1">Buyer</option>
                        <option value="2">Seller</option>
                        <option value="3">Owner</option>
                        <option value="4">Admin</option>
                    </Form.Select>
                </Form.Group>
                {(createUserIsLoading) ? (
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>) : (
                    <Button variant='primary' type='submit'>
                        Submit
                    </Button>
                )}
            </Form>
            <Toast
                onClose={() => setShowSuccess(false)}
                show={showSuccess}
                delay={2000}
                autohide
                className="bg-success text-white position-absolute top-0 end-0 m-3"
            >
                <Toast.Body>{message}</Toast.Body>
            </Toast>
        </div>
    );
}

export default UserAdd;