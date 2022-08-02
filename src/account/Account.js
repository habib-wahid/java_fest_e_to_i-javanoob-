import {Card,Form,FormGroup,Button,Col} from "react-bootstrap";
import {useState} from "react";
import AuthUser from "../components/AuthUser";

export default function Account(){

    const {httpmultipart} = AuthUser();
    const [data,setData] = useState({
    });
    const [image,setImage] = useState("");
    const [companyType,setCompanyType] = useState("Tech");

    const handleChange=(e)=>{


        if(e.target.name === "logo"){
            setImage(e.target.files[0]);
        }else{
            setData({
                ...data,
                [e.target.name] : e.target.value
            });

        }


    }

    const onSubmit = ()=>{

        let formData = new FormData();
        formData.append("logo",image);
        formData.append("file",JSON.stringify(data));

        httpmultipart.post('user/upload',formData).then(
            (res)=>{
                console.log("result ",res);
            }
        )
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
                            <Form.Control type="text" name="company" onChange={handleChange} placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Company Type</Form.Label>
                            <Form.Select name="companyType" value={companyType} onChange={handleChange}>
                                <option>Tech</option>
                                <option>Marketing</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Company Description</Form.Label>
                            <br />
                            <textarea style={{
                                width:"100%"
                            }} name="description" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Company Logo </Form.Label>
                            <input type="file" name="logo" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Investment Found </Form.Label>
                            <Form.Control type="text" name="investment" onChange={handleChange}  />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Investment Needed </Form.Label>
                            <Form.Control type="text" name="investmentNeeded" onChange={handleChange}  />
                        </Form.Group>

                        <Button variant="primary" onClick={onSubmit}>
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            </Col>
        </div>
    )
}