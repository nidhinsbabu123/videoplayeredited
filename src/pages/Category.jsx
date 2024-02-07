import React, { useEffect } from 'react'
import { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { addcategory, deletecategory, getVideos, getcategory, updateCategory } from '../service/allApi';
import { Trash2 } from 'react-feather';
import VideoCard from './VideoCard';



function Category() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // To add a category
    // Value will be updated through handleAddCategory().
    const [addCategory, setAddCategory] = useState({
        id: "",
        name: "",
        allVideos: []
    })

    // function to update value in the state 'addCategory'
    // handleAddCategory() --> function is called through the onChange event.
    const handleAddCategory = (e) => {
        // explaining about similar operations in Add.jsx setInput() definition
        const { name, value } = e.target
        setAddCategory({ ...addCategory, [name]: value })
    }
    console.log(addCategory);

    // Function handleAdd() called in the onClick of the button Add
    const handleAdd = async (e) => {
        e.preventDefault()

        // the value 'id' & 'name' will get from the state 'addCategory'
        const { id, name } = addCategory
        if (!id || !name) {
            alert('Please fill the form completely')
        } else {
            // during POST/DELETE API Call we need to pass the body. Here the body is in the state 'addCategory'
            const res = await addcategory(addCategory)
            console.log(res);
            if (res.status >= 200 && res.status < 300) {
                setShow(false)
                alert('Category added successfully')
                // After added successfully it need to show without refreshing the page. So the function is called again
                getCategorylist()
            } else {
                alert('Please provide a unique id')
            }
        }
    }

    // We must show the category names when the page is loaded.
    useEffect(() => {
        getCategorylist()
    }, [])

    // Now we need to display the category names as the list which we got the list already by calling getCategorylist() in the useEffect.
    const [allcategories, setallcategories] = useState([])

    // Function to show the catogary names after added the name of category
    const getCategorylist = async () => {
        const resp = await getcategory()
        console.log(resp);
        setallcategories(resp.data)
    }
    console.log(allcategories);

    // To delete category by calling handleDeleteCategory() through onClick event in the Trash button inside a span.
    const handleDeleteCategory = async (e, id) => {
        // to remove auto reload
        e.preventDefault()

        // API Call
        const res = await deletecategory(id)
        console.log(res);

        // To show the remaining catogories after deletion, without refreshing the page
        getCategorylist()

    }

    // onDragOver() definition.
    const dragOver = (e) => {
        e.preventDefault()
        console.log("Draging over the Category");
    }

    // Droped() from the card
    const dropped = async (e, categoryId) => {
        console.log("Category Id : ", categoryId);
        let sourceCardId = e.dataTransfer.getData("cardId")
        console.log("sourceCardId : ", sourceCardId);

        const { data } = await getVideos(sourceCardId)
        console.log(data);

        let selectedCategory = allcategories.find(item => item.id == categoryId)
        console.log('Target category details : ', selectedCategory);
        selectedCategory.allVideos.push(data)
        console.log("Updated category details : ", selectedCategory);
        await updateCategory(categoryId, selectedCategory)
        getCategorylist()

    }




    return (
        <>

            <div className='d-grid' >

                <div onClick={handleShow} className='btn btn-success m-2' >Add Category</div>

            </div>


            {
                // We are giving paranthesis after the arrow function variable to avoid extra writing of return statement while using curly braces.
                allcategories.map(item => (

                    // here we are droping the draged data from the 'Videocard' component
                    <div droppable onDragOver={e => dragOver(e)} onDrop={e => dropped(e, item?.id)}>
                        <div className='border rounded mt-3 p-2'>

                            <div className='d-flex justify-content-between'>
                                <h4> {item?.name} </h4>

                                <span onClick={e => handleDeleteCategory(e, item?.id)} > <Trash2 color='red' /> </span>

                            </div>




                            {/* <div className='bg-warning'> */}

                                <Row className='mt-1 d-flex flex-column'>
                                    {
                                        item?.allVideos.map((card) => (
                                            <Col>
                                                {/* insideCategory is used to remove Trash symbol inside category video card */}
                                                <VideoCard card={card} insideCategory={true} />

                                            </Col>
                                        ))
                                    }
                                </Row>



                            {/* </div> */}





                        </div>
                    </div>


                ))
            }




            {/* Modal */}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>

                        <FloatingLabel className='mb-3' controlId="floatingid" label="Id">
                            <Form.Control name='id' onChange={handleAddCategory} type="text" placeholder="Category Id" />
                        </FloatingLabel>

                        {/* OnChange - handleAddCategory functioncall */}
                        <FloatingLabel className='mb-3' controlId="floatingcaption" label="Caption">
                            <Form.Control name='name' onChange={handleAddCategory} type="text" placeholder="Caption" />
                        </FloatingLabel>

                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={handleAdd} variant="primary">Add</Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default Category