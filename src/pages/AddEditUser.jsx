/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Form, Button, Spinner, Toast } from 'react-bootstrap';
import { useCreateUser, useEditUser, useFetchUsers, useFetchUserById } from '../features/user';

const AddEditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showSuccess, setShowSuccess] = useState(false);
    const [message, setMessage] = useState('');

    const { refetch: refecthUsers } = useFetchUsers();

    const { mutate: createUser, isLoading: createUserIsLoading } = useCreateUser({
        onSuccess: (data) => {
            setMessage(data.message);
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                navigate('/users');
            }, 1000);
            refecthUsers();
        }
    });

    const { mutate: editUser, isLoading: editUserIsLoading } = useEditUser({
        onSuccess: (data) => {
            setMessage(data.message);

            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                navigate('/users');
            }, 1000);
            refecthUsers();
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
            if (id) {
                const { username, email } = formik.values;
                editUser({ id, body: { username, email } });

                formik.setFieldValue("username", "");
                formik.setFieldValue("email", "");
            } else {
                const { username, email, password, role } = formik.values;
                createUser({
                    username, email, password, role: parseInt(role)
                });

                formik.setFieldValue("username", "");
                formik.setFieldValue("email", "");
                formik.setFieldValue("password", "");
                formik.setFieldValue("role", 0);
            }
        }
    });

    if (id) {
        const { data } = useFetchUserById(id);
        useEffect(() => {
            if (id) {
                if (data) {
                    formik.setFieldValue('username', data.username);
                    formik.setFieldValue('email', data.email);
                }
            }
        }, [data]);
    }


    const handleFormInput = (e) => formik.setFieldValue(e.target.name, e.target.value);

    return (
        <div>
            <h1 className="mb-3">{id ? 'Edit' : 'Add'} User</h1>
            <Form onSubmit={formik.handleSubmit}>
                {id && (
                    <>
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
                    </>
                )}
                {!id && (
                    <>
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

                    </>
                )}

                {(createUserIsLoading || editUserIsLoading) ? (
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

export default AddEditUser;
