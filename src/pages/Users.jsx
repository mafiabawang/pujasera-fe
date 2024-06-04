import { useState } from 'react';
import { Table, Button, Spinner, Toast } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useFetchUsers, useDeleteUser } from '../features/user';

const Users = () => {
    const [message, setMessage] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const { data, isLoading: usersIsLoading, refetch: refetchUsers } = useFetchUsers();

    const { mutate: deleteUser } = useDeleteUser({
        onSuccess: (data) => {
            setMessage(data.message);
            setShowSuccess(true);
            refetchUsers();
        }
    });

    const confirmDeleteUser = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            deleteUser(id);
        }
    }

    const getRoleName = (role) => {
        switch (role) {
            case 1:
                return 'Buyer';
            case 2:
                return 'Seller';
            case 3:
                return 'Owner';
            case 4:
                return 'Admin';
            default:
                return 'Unknown';
        }
    };

    const renderProduct = () => {
        return data?.map((user) => (
            <tr key={user.id}>
                <td>{user.username}</td>
                <td>{getRoleName(user.role)}</td>
                <td>
                    <Link to={`/users/${user.id}`}>Edit</Link>
                    <Button variant="link" className="text-danger" onClick={() => confirmDeleteUser(user.id)}>Delete</Button>
                </td>
            </tr>
        ));
    }

    return (
        <div>
            <h1>Data Users</h1>
            <div className="mb-3">
                <Link to="/users/add" className="btn btn-primary">Tambah</Link>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {usersIsLoading ? (
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

export default Users;
