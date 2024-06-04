import { useState } from 'react';
import { Table, Button, Spinner, Toast } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useFetchTenants, useDeleteTenant } from '../features/tenants';

const Pujasera = () => {
    const [message, setMessage] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const { data, isLoading: tenantsIsLoading, refetch: refecthTenants } = useFetchTenants();

    const { mutate: deleteTenant } = useDeleteTenant({
        onSuccess: (data) => {
            setMessage(data.message);
            setShowSuccess(true);
            refecthTenants();
        }
    });

    const confirmDeleteTenant = (id) => {
        if (window.confirm('Are you sure you want to delete this Merchant?')) {
            deleteTenant(id);
        }
    }

    const renderProduct = () => {
        return data?.map((tenant) => (
            <tr key={tenant.id}>
                <td>{tenant.seller_name}</td>
                <td>{tenant.place_name}</td>
                <td>{tenant.tenant_name}</td>
                <td>
                    <Link to={`/merchants/${tenant.id}`}>Edit</Link>
                    <Button variant="link" className="text-danger" onClick={() => confirmDeleteTenant(tenant.id)}>Delete</Button>
                </td>
            </tr>
        ));
    }

    return (
        <div>
            <h1>Data Merchants</h1>
            <div className="mb-3">
                <Link to="/merchants/add" className="btn btn-primary">Tambah</Link>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Seller Name</th>
                        <th>Place Name</th>
                        <th>Tenant Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tenantsIsLoading ? (
                        <tr>
                            <td colSpan="3" className="text-center">
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </td>
                        </tr>
                    ) : data.length === 0 ? (
                        <tr>
                            <td colSpan="4">
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
