import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import VideoCard from './VideoCard'
import { getVideo } from '../service/allApi'


function View({serverRes}) {

  // State - to know weather the card is deleted or not through API Call in 'Videocard.jsx' component.
  const[deleteStatus, setDeleteStatus] = useState(false)

  // Function to check the user pressed delete button or not.
  // The function is called in 'VideoCard' component through props.
  const handleDeleteStatus = (res) => {
    setDeleteStatus(res)
  }

  // State to display the data which we already get through by calling getallVideos() in the useEffect
  const [allVideos, setAllVideos] = useState([])

  // Items to show when the page is loaded
  useEffect(() => {

    getallVideos()

    // If we leave the [] empty, then the page will load only for one time. If we put numbers inside the [1 or 2 or 3...] the page will load multiple times. 
  }, [serverRes, deleteStatus])


  // Function definition for Api Call to get the added videos from the back end and show it to the view component. 
  const getallVideos = async () => {
    const response = await getVideo()
    // console.log(response.data);

    // taking the response to the state allVideos to display purpose
    setAllVideos(response.data)
  }
  console.log('All Videos array : ', allVideos);


  return (
    <>

      <div className='border p-3 rounded m-4' >

        <Row>

          {/* Placing the column inside the curly braces to take the data in the state 'allVideos' from the javascript section to jsx section */}

          {
            // We are asigning the data from allVideos to a variable named video
            allVideos.map(video => (

              <Col sm={12} md={6} >

                {/* sending the data of video to the VideoCard component using props  */}
                <VideoCard card = {video} handleDeleteStatus = {handleDeleteStatus} />
              </Col>

            ))

          }

        </Row>

      </div>

    </>
  )
}

export default View