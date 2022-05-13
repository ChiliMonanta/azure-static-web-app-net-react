import { Container, Nav, Navbar } from 'react-bootstrap'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import './NavMenu.css'

export const NavMenu = () => {

    const [selectedMenu, setSelectedMenu] = useState<string>('default')

    return (
        <header>
            <Navbar collapseOnSelect
                expand="true"
                className='navbar navbar-dark navbar-header'>
                <Container className='container-fluid navbar-top-row ps-3  '>
                    <Navbar.Brand className='navbar-brand ps-2' href="/">Static Web App</Navbar.Brand>
                    <Navbar.Toggle></Navbar.Toggle>
                </Container>
                <Navbar.Collapse>

                    <Nav activeKey={selectedMenu}
                        onSelect={(selectedKey) => {
                            console.log(selectedKey)
                            setSelectedMenu(selectedKey || "default")
                        }
                        }
                        className="flex-column">
                        <Nav.Item className='px-3'>
                            <Nav.Link as={Link} to="/" eventKey="default">
                                <span className="nav-oi oi oi-home" aria-hidden="true"></span>Home
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className='px-3'>
                            <Nav.Link as={Link} to="/counter" eventKey="counter">
                                <span className="nav-oi oi oi-plus" aria-hidden="true"></span>Counter
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className='px-3'>
                            <Nav.Link as={Link} to="/fetch-data" eventKey="weather">
                                <span className="nav-oi oi oi-list-rich" aria-hidden="true"></span>Fetch data
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

        </header >
    );
}
