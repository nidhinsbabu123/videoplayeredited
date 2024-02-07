import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Add from './Add'
import View from './View'
import Category from './Category'
import { Link } from 'react-router-dom'

function Home() {

    // Presently, after adding video, we are able to see it in our view component only after refreshing the page. So here we are using the method STATE_LIFTING.
    // When we do API Call in the component Add.jsx - we will get data as an object. so we are giving empty object inside the state.
    const [serverRes, setServerRes] = useState({})

    // to update the value in 'serverRes' state, we are defining a function.
    const handleResponse = (res) => {
        setServerRes(res)
    }



    return (
        <>
            <div className='container-fluid'>

                {/* <Link>Watch History</Link> */}

                <Row>
                    {/* For Add Component Design */}
                    <Col lg={1} >

                        {/* To update the value of the state 'serverRes' we are sending the function handleResponse to the      'Add.jsx' component */}
                        <Add handleResponse={handleResponse} />
                    </Col>

                    <Col lg={9} >

                        <div className='d-flex justify-content-center align-items-center'>
                            <Link style={{ textDecoration: 'none', fontSize: '30px', color: 'blue' }} to={'/watchhistory'} >Click to show Watch History</Link>
                        </div>


                    </Col>

                </Row>

                {/* For View & Category component Design */}

                <Row>

                    {/* <Col lg={1} ></Col> */}

                    <Col lg={8} >

                        {/* After updated value of the state 'serverRes' through handleResponse(which got the value from 'Add.jsx component'), we are sending it to view the Added video details. */}
                        <View serverRes={serverRes} />
                    </Col>

                    <Col lg={4} >
                        <Category />
                    </Col>



                </Row>

            </div>
        </>
    )
}

export default Home