import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="bg-primary text-white sidebar">
            <div className="p-3">
                <h3>Pujasera</h3>
            </div>
            <Nav className="flex-column">
                <Nav.Link as={Link} to="/" className="text-white">
                    Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to="/users" className="text-white">
                    Data Users
                </Nav.Link>
                <Nav.Link as={Link} to="/pujasera" className="text-white">
                    Data Pujasera
                </Nav.Link>
                <Nav.Link as={Link} to="/merchants" className="text-white">
                    Data Merchants
                </Nav.Link>
            </Nav>
        </div>
    );
};

export default Sidebar;