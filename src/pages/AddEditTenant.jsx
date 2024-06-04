/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { Form, Button, Spinner, Toast } from 'react-bootstrap';
import { useCreateTenant, useEditTenant, useFetchTenants, useFetchTenantById } from '../features/tenants';

const AddEditTenant = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showSuccess, setShowSuccess] = useState(false);
    const [message, setMessage] = useState('');

    const { refetch: refecthTenants } = useFetchTenants();

    const { mutate: createTenant, isLoading: createTenantIsLoading } = useCreateTenant({
        onSuccess: (data) => {
            setMessage(data.message);
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                navigate('/merchants');
            }, 1000);
            refecthTenants();
        }
    });

    const { mutate: editTenant, isLoading: editTenantIsLoading } = useEditTenant({
        onSuccess: (data) => {
            setMessage(data.message);

            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                navigate('/merchants');
            }, 1000);
            refecthTenants();
        }
    });

    const formik = useFormik({
        initialValues: {
            seller_id: "",
            place_id: "",
            name: "",
            about: ""
        },
        onSubmit: () => {
            if (id) {
                const { name, about } = formik.values;
                editTenant({ id, body: { name, about } });

                formik.setFieldValue("name", "");
                formik.setFieldValue("about", "");
            } else {
                const { seller_id, place_id, name, about } = formik.values;
                createTenant({
                    seller_id, place_id, name, about
                });

                formik.setFieldValue("seller_id", "");
                formik.setFieldValue("place_id", "");
                formik.setFieldValue("name", "");
                formik.setFieldValue("about", "");
            }
        }
    });

    if (id) {
        const { data } = useFetchTenantById(id);
        useEffect(() => {
            if (id) {
                if (data) {
                    formik.setFieldValue("name", data.name);
                    formik.setFieldValue("about", data.about);
                }
            }
        }, [data]);
    }

    const handleFormInput = (e) => formik.setFieldValue(e.target.name, e.target.value);

    return (
        <div>
            <h1 className="mb-3">{id ? 'Edit' : 'Add'} Merchant</h1>
            <Form onSubmit={formik.handleSubmit}>
                {id && (
                    <>
                        <Form.Group controlId="name" className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                name="name"
                                onChange={handleFormInput}
                                value={formik.values.name}
                            />
                        </Form.Group>
                        <Form.Group controlId="about" className="mb-3">
                            <Form.Label>About</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter About"
                                name="about"
                                onChange={handleFormInput}
                                value={formik.values.about}
                            />
                        </Form.Group>
                    </>
                )}
                {!id && (
                    <>
                        <Form.Group controlId="seller_id" className="mb-3">
                            <Form.Label>Seller ID</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Seller ID"
                                name="seller_id"
                                onChange={handleFormInput}
                                value={formik.values.seller_id}
                            />
                        </Form.Group>
                        <Form.Group controlId="place_id" className="mb-3">
                            <Form.Label>Place ID</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Place ID"
                                name="place_id"
                                onChange={handleFormInput}
                                value={formik.values.place_id}
                            />
                        </Form.Group>
                        <Form.Group controlId="name" className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                name="name"
                                onChange={handleFormInput}
                                value={formik.values.name}
                            />
                        </Form.Group>
                        <Form.Group controlId="about" className="mb-3">
                            <Form.Label>About</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter About"
                                name="about"
                                onChange={handleFormInput}
                                value={formik.values.about}
                            />
                        </Form.Group>
                    </>
                )}

                {(createTenantIsLoading || editTenantIsLoading) ? (
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

export default AddEditTenant;
