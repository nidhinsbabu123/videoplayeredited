import React from 'react'
import { PlusSquare } from 'react-feather'

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { addVideo } from '../service/allApi';

// For update the value of state'serverRes' in 'Home.jsx' component. --- For the purpose of showing added data without refreshing the page in 'View.jsx' component.
// Destructuring the response from the function handleResponse, to update'serverRes' state in Home.jsx
function Add({handleResponse}) {

    // State for storing data when Add button clicked from the Modal
    // The 'key' in the state 'uploadData' is here given as identical to '/videos' resources of the back-end (localhost : 4000).
    // The values in the state 'uploadData' is given as a single object, in the key value pair form
    const [uploadData, setUploadData] = useState({
        id: "",
        caption: "",
        thumbnail: "",
        url: ""
    })

    // setInput() definition which is called in onChange event occured in Form.Control
    const setInput = (e) => {
        // setUploadData(e.target.value)

        const { name, value } = e.target
        // If we not use spread/rest operator(...). Then data of the uploadData state is displayed with each attributes, and not together.
        // That's why we give the 'name' attribute to the input of the form(here the Form.Control)
        // After that by using the rest operator(...), we are able to see our output as a single object in the console.
        // While using spread/rest operator, we need to specify the state's name along with it a comma.
        setUploadData({ ...uploadData, [name]: value })
    }
    console.log(uploadData);

    // extractUrl function which is called onChange in Form.Control of 'Video Link' input section
    const extractUrl = (e) => {
        // console.log(e.target.value);

        let youtubeUrl = e.target.value

        if (youtubeUrl.includes("v=")) {
            // to find the position of 'v=' portion.  (എത്രാമത്തെ position ഇൽ ആണ് v എന്നു കണ്ടുപിടിക്കാൻ)
            let index = youtubeUrl.indexOf("v=")
            console.log(index);

            // Extracted key is in videoUrl
            let videoUrl = youtubeUrl.substring(index + 2, index + 13)
            console.log(videoUrl);

            // <iframe width="853" height="480" src="https://www.youtube.com/embed/nYEoxne_20Y" title="Neela Nilave - Video Song | RDX | Kapil Kapilan | Sam CS | Shane Nigam,Antony Varghese,Neeraj Madhav" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

            // So here videoUrl variable is inside a function. We need this inside the 'url' in the state 'uploadData'. We cannot do it directly; hence asigning it to a variable videoData.
            let videoData = uploadData
            videoData.url = `https://www.youtube.com/embed/${videoUrl}`

            // Now the data 'url' inside the videoData has changed. Now asign it to the state uploadData by using its state-updation-function - setUploadData.
            setUploadData(videoData)

        }
        console.log(uploadData);
    }

    // Going to do the Api Call 'addVideo'
    // handleAdd() definition; it is called in the onClick event in Add button of the Modal.
    const handleAdd = async () => {
        // To check wether the inputs contains some value or not
        // destructuring the values from the object inside the state 'uploadData'
        const { id, caption, thumbnail, url } = uploadData

        if (!id || !caption || !thumbnail || !url) {
            alert('Please Fill the form completely')
        } else {
            // When we use Api call for POST & EDIT(UPDATE), we need to pass the body. Here the body is in 'uploadData' state.
            let response = await addVideo(uploadData)
            // console.log(response.data);

            if (response.status >= 200 && response.status < 300) {
                // console.log(response.data);

                // To send the response to 'View.jsx' component through 'Home.jsx', the value in 'handleResponse' is destructured in the Add({handleResponse}). We are using that.
                handleResponse(response.data) 

                // To automatically close the Modal
                setShow(false)

                alert('Video Uploaded Successfully !!!')


            } else {
                // Here if we provide same id to the video, then it shows this alert.
                alert('Please provide a unique id')
            }

        }
    }


    // State for Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <>

            <div onClick={handleShow} className='btn' >

                <PlusSquare color='green' size={60} />

            </div>

            {/* Modals */}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Upload Video Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>

                        {/* Here the attribute name is given to each Form.Control  */}

                        {/* id */}
                        <FloatingLabel className='mb-3' controlId="floatingid" label="Id">
                            <Form.Control onChange={setInput} name='id' type="text" placeholder="Uploading Video_id" />
                        </FloatingLabel>

                        {/* Caption */}
                        <FloatingLabel className='mb-3' controlId="floatingcaption" label="uploading video caption">
                            <Form.Control onChange={setInput} name='caption' type="text" placeholder="uploading video caption" />
                        </FloatingLabel>

                        {/* Image URL */}
                        <FloatingLabel className='mb-3' controlId="floatingimage" label="video cover url">
                            <Form.Control onChange={setInput} name='thumbnail' type="text" placeholder="Video Cover_Image URL" />
                        </FloatingLabel>

                        {/* Video Link */}
                        <FloatingLabel className='mb-3' controlId="floatinglink" label="uploading video link">

                            {/* Here instead of going setInput(), we are using another function to extract key from youtube url */}
                            <Form.Control onChange={extractUrl} name='url' type="text" placeholder="Video Link" />
                        </FloatingLabel>



                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleAdd} variant="primary">Add</Button>
                </Modal.Footer>
            </Modal>


        </>
    )
}

export default Add