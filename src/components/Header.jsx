import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Disc } from 'react-feather';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div>
            <Navbar className="bg-primary">
                <Container>
                    <Navbar.Brand>

                        <Link to={'/'} style={{textDecoration:'none'}} >
                            <span className='text-warning'>

                                <Disc />

                                <span className='ms-2'>PlyAll</span>

                            </span>

                        </Link>


                    </Navbar.Brand>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header