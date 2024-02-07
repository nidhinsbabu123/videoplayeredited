import React, { useEffect, useState } from 'react'
import { deleteHistory, getHistory } from '../service/allApi'
import { Button, Table } from 'react-bootstrap'


function Watchhistory() {

    const [history, sethistory] = useState([])

    useEffect(() => {
        getWatchHistory()
    }, [])

    const getWatchHistory = async () => {
        // const res = await getHistory()
        // console.log(res);
        // Destructuring tge data from API call to get the Added history and display it on console.
        const { data } = await getHistory()
        sethistory(data)
    }
    console.log(history);

    // To remove a history --- starting from here
    const removeHistory = async (id) => {
        // DELETE API Call
        const res = await deleteHistory(id)
        console.log(res);
        getWatchHistory()
    }





    return (
        <>

            <h1 className='text-warning text-center'>Watch History</h1>

            {/* <Table className='table-shadow m-3 text-danger text-center fs-4 border rounded'> */}
            <Table striped bordered hover>

                <thead>
                    <tr>
                        <th>Sl.No</th>
                        {/* <th>ID</th> */}
                        <th>Card Name</th>
                        <th>Url</th>
                        <th>Date</th>
                        <th>Remove History</th>
                    </tr>
                </thead>

                <tbody>

                    {
                        // index = is index of array
                        history?.map((item, index) => (
                            <tr>
                                <td>{index+1}</td>
                                {/* <td>{item?.id}</td> */}
                                <td>{item?.cardname}</td>
                                <td>{item?.url}</td>
                                <td>{item?.Date}</td>
                                <td> <Button onClick={() => removeHistory(item?.id)} className='btn btn-warning'>Remove</Button> </td>
                            </tr>
                        ))


                    }


                </tbody>

            </Table>


        </>
    )
}

export default Watchhistory