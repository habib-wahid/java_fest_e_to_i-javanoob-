import {Card,Form,FormGroup,Button,Col} from "react-bootstrap";
import {useEffect, useState} from "react";
import AuthUser from "../components/AuthUser";
import SideMenu from "../common/SideMenu";
import {useNavigate} from "react-router-dom";

export default function Account(){

    const navigate = useNavigate();
    const {getUser} = AuthUser();
    const user = getUser();
    const {http,httpmultipart} = AuthUser();
    const [data,setData] = useState({
        companyType : "Tech"
    });
    const [image,setImage] = useState("");
    const [companyType,setCompanyType] = useState("Tech");
    const [checkDataIsPresent,setCheckDataIsPresent] = useState(false);
    const [mlChecked,setMlChecked] = useState(false);
    const [security,setSecurity] = useState(false);
    const [blockChain,setBlockChain] = useState(false);
    const [web,setWeb] = useState(false);
    const [android,setAndroid] = useState(false);
    const [technologies,setTechnologies] = useState({});

    useEffect(()=>{
        fetchUserDetails();
    },[])


    const fetchUserDetails = ()=>{
        http.get('/api/getUser', {params:{username : user.userName}}).then((res)=>{
            console.log(res.data);
            setCheckDataIsPresent(true);
            setData({
                ...data,
                ['company'] : res.data.userName
            })
        })
    }

    const handleChange=(e)=>{

        if(e.target.name === "companyType"){
            setCompanyType(e.target.value);
        }

        if(e.target.name === "logo"){
            setImage(e.target.files[0]);
        }else{
            setData({
                ...data,
                [e.target.name] : e.target.value
            });

        }


    }

    const handleTechnology=(e)=>{
        if(e.target.name === "ml"){
            setMlChecked(!mlChecked);
        }
        if(e.target.name === "blockchain")
        {
            setBlockChain(!blockChain);
        }
        if(e.target.name === "security"){
            setSecurity(!security)
        }
        if(e.target.name === "web"){
            setWeb(!web)
        }
        if(e.target.name === "android"){
            setAndroid(!android)
        }
    }


    const onSubmit = ()=>{

        if(mlChecked){
            setTechnologies({
                ...technologies,
                ['ml'] : '1'
            })
        }else if(security){
            setTechnologies({
                ...technologies,
                ['security'] : '1'
            })
        }else if(blockChain){
            setTechnologies({
                ...technologies,
                ['blockChain'] : '1'
            })
        }else if(web){
            setTechnologies({
                ...technologies,
                ['web'] : '1'
            })
        }else {
            setTechnologies({
                ...technologies,
                ['android'] : '1'
            })
        }


        console.log("Data ",data)
        let formData = new FormData();
        formData.append("logo",image);
        formData.append("file",JSON.stringify(data));
        formData.append("technology",JSON.stringify(technologies));

        httpmultipart.post('user/upload',formData).then(
            (res)=>{
                console.log("result ",res);
                navigate('/dashboard')
            }
        )


        console.log("Form Data ",formData)
    }


    return(
        <div className="container">

            <div>
                <SideMenu />
            </div>

            <div>
                <Col sm={6}>
                    <Card style={{
                        marginTop:"50px"
                    }}>
                        <Card.Body>
                            <Card.Title>Fill Up Company Profile</Card.Title>
                            <br />
                            <Form>

                                <Form.Group className="mb-3">
                                    <Form.Label><b>Company Type</b></Form.Label>
                                    <Form.Select name="companyType" value={companyType} onChange={handleChange}>
                                        <option>Tech</option>
                                        <option>Marketing</option>
                                        <option>Educational</option>
                                        <option>Business</option>
                                        <option>Food</option>
                                        <option>Transport</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label><b>Company Description </b></Form.Label>
                                    <br />
                                    <textarea style={{
                                        width:"100%"
                                    }} name="description" onChange={handleChange} />
                                </Form.Group>

                                <Form.Group className="mb-3">

                                    <Form.Label><b>Select Technologies </b></Form.Label>

                                    <div className="topping">
                                        <input
                                            type="checkbox"
                                            name="ml"
                                            value="ml"
                                            checked={mlChecked}
                                            onChange={handleTechnology}
                                        />
                                        Machine Learning
                                    </div>
                                    <div className="topping">
                                        <input
                                            type="checkbox"
                                            name="blockchain"
                                            value="ml"
                                            checked={blockChain}
                                            onChange={handleTechnology}
                                        />
                                        Block Chain
                                    </div>
                                    <div className="topping">
                                        <input
                                            type="checkbox"
                                            name="security"
                                            value="ml"
                                            checked={security}
                                            onChange={handleTechnology}
                                        />
                                        Security
                                    </div>
                                    <div className="topping">
                                        <input
                                            type="checkbox"
                                            name="web"
                                            value="ml"
                                            checked={web}
                                            onChange={handleTechnology}
                                        />
                                        Web Development
                                    </div>
                                    <div className="topping">
                                        <input
                                            type="checkbox"
                                            name="android"
                                            value="ml"
                                            checked={android}
                                            onChange={handleTechnology}
                                        />
                                        Android
                                    </div>

                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label> <b>Company Logo  </b></Form.Label>
                                    <input type="file" name="logo" onChange={handleChange} />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label><b>Website URL </b> </Form.Label>
                                    <Form.Control type="text" name="website" onChange={handleChange}  />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label><b>LinkedIn URL </b> </Form.Label>
                                    <Form.Control type="text" name="linkedIn" onChange={handleChange}  />
                                </Form.Group>


                                <Button variant="primary" onClick={onSubmit}>
                                    Submit
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </div>

        </div>
    )
}