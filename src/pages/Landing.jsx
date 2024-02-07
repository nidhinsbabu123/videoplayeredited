
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function Landing() {

    // handleNavigate() --- which is called in button --> Click here to know more BUTTON
    // To redirect from one page to another ---> use the hook useNavigate
    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate('/home')
    }

    return (
        <div>

            <Row className='align-items-center'>
                <Col></Col>
                <Col lg={6}>


                    <h1>Welcome to PlyAll.com</h1>

                    <p>Where user can view their favourite videos. You can upload any youtube videos by copy and paste youtube url. PlyAll also allows users to add and remove their uploaded videos. Arragement of the list in different categories by drag and drop.</p>

                    <p>Its free !!! Try Now</p>

                    <button onClick={handleNavigate} className='btn btn-success'>Click here to know more</button>





                </Col>
                <Col lg = {5}>
                    <img className='img-fluid shadow' src="https://d2jx2rerrg6sh3.cloudfront.net/images/Article_Images/ImageForArticle_23436_16724020537624860.jpg" alt="No Img" />
                </Col>
            </Row>

            

        </div>
    )
}

export default Landing