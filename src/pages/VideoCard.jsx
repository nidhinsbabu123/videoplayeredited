import React from 'react'
import Card from 'react-bootstrap/Card';
import { Trash2 } from 'react-feather';

import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { addHistory, deleteVideo } from '../service/allApi';
// for the purpose of generating id for using in Adding watch history while clicking the card
import { v4 as uuidv4 } from 'uuid'; 

// destructuring card from View component (props)
// destructuring the response from handleDeleteStatus() which is defined in 'View' component.
function VideoCard({card, handleDeleteStatus, insideCategory}) {

    // Delete a card using API Call
    // We will get the 'id' when the onClick event in the trash.
    const removeItem = async (id) => {
        // API Call
        const res = await deleteVideo(id)
        console.log(res);
        // to update the value of function handleDeleteStatus(true/false)
        if(res.status >= 200 && res.status < 300){
            handleDeleteStatus(true)
        }
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    // To the purpose of adding watch history, we are making handleShow() as async.
    const handleShow = async () => {
        setShow(true)
        const uid = uuidv4()
        console.log(uid);

        // to take todays date to show it in the watch history
        const cardTime = new Date()
        console.log(cardTime);
        // card is in object form, so we are destructuring it
        const{caption, url} = card

        // if the card has any value in it
        if(uid != "", caption != "", url != "", cardTime != ""){
            // the data should be stored in following format in the back-end(watch history)
            const body = {
                id : uid,
                cardname : caption,
                url,
                Date : cardTime
            }

            const res = await addHistory(body)
            console.log(res);
        }
    }

    // Drag Started()
    const dragStarted = (e, id) => {
        console.log('Drag Started & Source Card ID : '+id );
        // setData is predefined()
        e.dataTransfer.setData("cardId", id)
    }


    return (
        <>

            <div>

                {/* Card */}

                <Card className='shadow m-2' draggable onDragStart={e => dragStarted(e, card?.id)} >
                    <Card.Img onClick={handleShow} variant="top" height={'200px'} src={card?.thumbnail} />
                    <Card.Body>
                        <Card.Title>
                            <span>{card?.caption}</span>

                            <span> 

                                {
                                    insideCategory ? "" :
                                    <Trash2 onClick={() => removeItem(card?.id)} color='red' style={{ float: 'right' }} />
                                }
                                
                                

                             </span>

                        </Card.Title>

                    </Card.Body>
                </Card>

                {/* Modal */}

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Video Caption</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                    <iframe width={'100%'} height={'400px'} src={`${card?.url}?autoplay=1`} title="The Boy In the Striped Pajamas trailer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

                    </Modal.Body>
                </Modal>

            </div>

        </>
    )
}

export default VideoCard