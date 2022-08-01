import {Card,Form,FormGroup,Button,Col} from "react-bootstrap";
import {useState} from "react";

export default function Account(){

    const [data,setData] = useState({});
    const [companyType,setCompanyType] = useState("Tech");

    const handleChange=(e)=>{
        console.log(e.target.name)

    }
    return(
        <div>

            <Col sm={6}>
            <Card>
                <Card.Body>
                    <Card.Title>Fill Up Company Profile</Card.Title>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Company Name </Form.Label>
                            <Form.Control type="email" name="company" onClick={handleChange} placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Company Type</Form.Label>
                            <Form.Select name="select" value={companyType} onChange={handleChange}>
                                <option>Tech</option>
                                <option>Marketing</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            </Col>
        </div>
    )
}