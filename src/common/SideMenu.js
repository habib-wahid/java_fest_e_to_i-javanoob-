import {Button, ButtonGroup, Dropdown, Stack} from "react-bootstrap";
import {Link} from "react-router-dom";


export default function SideMenu(){
    return(

        <div>
            <Stack style={{
                marginTop:"10px",
                float:"right",
            }} direction="horizontal" gap={3}>
                <div>
                    <Dropdown as={ButtonGroup}>
                        <Button variant="success">Setting</Button>

                        <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

                        <Dropdown.Menu>
                            <Dropdown.Item>
                                <Link className="link-style" to="/account">
                                    Account
                                </Link>
                            </Dropdown.Item>

                            <Dropdown.Item>
                                <Link className="link-style" to="/create-posts">
                                    Create Posts
                                </Link>
                            </Dropdown.Item>

                            <Dropdown.Item>
                                <Link className="link-style" to="/user-posts">
                                    User Posts
                                </Link>
                            </Dropdown.Item>

                            <Dropdown.Item>
                                <Link className="link-style" to="#">
                                    Sign-Out
                                </Link>
                            </Dropdown.Item>


                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </Stack>
        </div>

    )
}