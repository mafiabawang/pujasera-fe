import { useState } from 'react';
import { Table, Button, Spinner, Toast } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useFetchPujaseras, useDeletePujasera } from '../features/pujasera';

const Pujasera = () => {
    const [message, setMessage] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const { data, isLoading: pujaserasIsLoading, refetch: refetchPujaseras } = useFetchPujaseras();

    const { mutate: deletePujasera } = useDeletePujasera({
        onSuccess: (data) => {
            setMessage(data.message);
            setShowSuccess(true);
            refetchPujaseras();
        }
    });

    const confirmDeletePujasera = (id) => {
        if (window.confirm('Are you sure you want to delete this places?')) {
            deletePujasera(id);
        }
    }

    const renderProduct = () => {
        return data?.map((place) => (
            <tr key={place.id}>
                <td>{place.owner_name}</td>
                <td>{place.place_name}</td>
                <td>
                    <Link to={`/pujasera/${place.id}`}>Edit</Link>
                    <Button variant="link" className="text-danger" onClick={() => confirmDeletePujasera(place.id)}>Delete</Button>
                </td>
            </tr>
        ));
    }

    return (
        <div>
            <h1>Data Pujaseras</h1>
            <div className="mb-3">
                <Link to="/pujasera/add" className="btn btn-primary">Tambah</Link>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Owner Name</th>
                        <th>Place Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {pujaserasIsLoading ? (
                        <tr>
                            <td colSpan="3" className="text-center">
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </td>
                        </tr>
                    ) : data.length === 0 ? (
                        <tr>
                            <td colSpan="3">
                                <div className="alert alert-light" role="alert">
                                    There are no records to display
                                </div>
                            </td>
                        </tr>
                    ) : (
                        renderProduct()
                    )}
                </tbody>
            </Table>
            <div className="d-flex justify-content-center">
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item"><a className="page-link" href="#">4</a></li>
                        <li className="page-item"><a className="page-link" href="#">5</a></li>
                    </ul>
                </nav>
            </div>
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
};

export default Pujasera;
