/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { Form, Button, Spinner, Toast } from 'react-bootstrap';
import { useCreatePujasra, useEditPujasera, useFetchPujaseras, useFetchPujaseraById } from '../features/pujasera';
import { useFetchUsers } from '../features/user';

const AddEditPujasera = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showSuccess, setShowSuccess] = useState(false);
    const [message, setMessage] = useState('');

    const { refetch: refecthPujaseras } = useFetchPujaseras();
    const { data: owners } = useFetchUsers(3);

    const { mutate: createPujasera, isLoading: createPujaseraIsLoading } = useCreatePujasra({
        onSuccess: (data) => {
            setMessage(data.message);
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                navigate('/pujasera');
            }, 1000);
            refecthPujaseras();
        }
    });

    const { mutate: editPujasera, isLoading: editPujaseraIsLoading } = useEditPujasera({
        onSuccess: (data) => {
            setMessage(data.message);

            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                navigate('/pujasera');
            }, 1000);
            refecthPujaseras();
        }
    });

    const formik = useFormik({
        initialValues: {
            owner_id: "",
            name: "",
            lat: "",
            long: "",
        },
        onSubmit: () => {
            if (id) {
                const { name, lat, long } = formik.values;
                editPujasera({ id, body: { name, lat, long } });

                formik.setFieldValue("name", "");
                formik.setFieldValue("lat", "");
                formik.setFieldValue("long", "");
            } else {
                const { owner_id, name, lat, long } = formik.values;
                createPujasera({
                    owner_id, name, lat, long
                });

                formik.setFieldValue("owner_id", "");
                formik.setFieldValue("name", "");
                formik.setFieldValue("lat", "");
                formik.setFieldValue("long", "");
            }
        }
    });

    if (id) {
        const { data } = useFetchPujaseraById(id);
        useEffect(() => {
            if (id) {

                if (data) {
                    formik.setFieldValue("name", data.name);
                    formik.setFieldValue("lat", data.lat);
                    formik.setFieldValue("long", data.long);
                }
            }
        }, [data]);
    }

    const handleFormInput = (e) => formik.setFieldValue(e.target.name, e.target.value);

    return (
        <div>
            <h1 className="mb-3">{id ? 'Edit' : 'Add'} Pujasera</h1>
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
                        <Form.Group controlId="lat" className="mb-3">
                            <Form.Label>Latitude</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter latitude"
                                name="lat"
                                onChange={handleFormInput}
                                value={formik.values.lat}
                            />
                        </Form.Group>
                        <Form.Group controlId="long" className="mb-3">
                            <Form.Label>Longitude</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter longitude"
                                name="long"
                                onChange={handleFormInput}
                                value={formik.values.long}
                            />
                        </Form.Group>
                    </>
                )}
                {!id && (
                    <>
                        <Form.Group controlId="owner_id" className="mb-3">
                            <Form.Label>Owner Name</Form.Label>
                            <Form.Select
                                name="owner_id"
                                onChange={handleFormInput}
                                value={formik.values.owner_id}
                            >
                                {owners && owners.map((owner) => (
                                    <option key={owner.id} value={owner.id}>{owner.username}</option>
                                ))}
                            </Form.Select>
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
                        <Form.Group controlId="lat" className="mb-3">
                            <Form.Label>Latitude</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter latitude"
                                name="lat"
                                onChange={handleFormInput}
                                value={formik.values.lat}
                            />
                        </Form.Group>
                        <Form.Group controlId="long" className="mb-3">
                            <Form.Label>Longitude</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter longitude"
                                name="long"
                                onChange={handleFormInput}
                                value={formik.values.long}
                            />
                        </Form.Group>
                    </>
                )}

                {(createPujaseraIsLoading || editPujaseraIsLoading) ? (
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

export default AddEditPujasera;
