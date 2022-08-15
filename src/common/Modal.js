import React, {useEffect, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import AuthUser from "../components/AuthUser";

export default function ModalComponent({show,setShow,item}){


    const {http} = AuthUser();
    const [data,setData] = useState({
        id:item.id
    });

    useEffect(()=>{
        console.log("ITem ",item)
    },[])


    const handleClose=()=>{
        setShow(false)
    }

    const handleChange=(e)=>{
        setData({
            ...data,
            [e.target.name]:e.target.value
        })
    }


    const onSubmit=()=>{
        console.log("Data ",data)

        http.post("/post/make-investment",data).then((res)=>{
            console.log(res.data);
            setShow(false);
        })
    }


    return(
        <div>
            <Modal backdrop="static" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Investment Details Form </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label><b> Name </b></Form.Label> <br />
                            <Form.Control type="text" name="name" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label> <b>Investment Amount </b></Form.Label>
                            <Form.Control type="text" name="investment" onChange={handleChange}  />
                        </Form.Group>

                    </Form>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
