import AuthUser from "./AuthUser";

export default function Dashboard(){

    const {getUser} = AuthUser();
    const user = getUser();

    return(
        <div className="container">
            user dashboard

            <div>
                <h1>Name</h1>
                {
                    user.name
                }
                <h1>Id</h1>
                {
                    user.id
                }
                <h1>Username</h1>
                {
                    user.userName
                }
            </div>
        </div>
    )

}