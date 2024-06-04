import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { Form, Button, Spinner, Toast } from 'react-bootstrap';
import { useEditUser, useFetchUserById, useFetchUsers } from '../features/user';
const UserEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showSuccess, setShowSuccess] = useState(false);
    const [message, setMessage] = useState('');

    const { refetch: refecthUsers } = useFetchUsers();

    const { mutate: editUser, isLoading: editUserIsLoading } = useEditUser({
        onSuccess: (data) => {
            setMessage(data.message);
            refecthUsers();
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                navigate('/users');
            }, 1000);
        }
    });

    const { data } = useFetchUserById(id);

    const formik = useFormik({
        initialValues: {
            username: (!data) ? '' : data.username,
            email: (!data) ? '' : data.email,
            id: (!data) ? '' : data.id
        },
        onSubmit: () => {
            const { username, email, id } = formik.values;
            editUser({ id, body: { username, email } });
            formik.setFieldValue("username", "");
            formik.setFieldValue("email", "");
            formik.setFieldValue("id", "");
        }
    });

    const handleFormInput = (e) => formik.setFieldValue(e.target.name, e.target.value);

    return (
        <div>
            <h1 className="mb-3">Edit User</h1>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group controlId="id" className="mb-3">
                    <Form.Control
                        type="hidden"
                        name="id"
                        value={formik.values.id}
                    />
                </Form.Group>
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
                {(editUserIsLoading) ? (
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

export default UserEdit;