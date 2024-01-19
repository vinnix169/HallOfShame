import { useState } from "react";


const Register = () => {
    const [userData, setUserData] = useState({
        email:String,
        username:String,
        password:String,
        avatar:String
    })

    return ( 
        <main>
            <form action="submit">
                <section>
                    <label htmlFor="avatar">Upload An Avatar:</label>
                    <input type="file" />
                </section>
                <section>
                    <div>Image</div>
                    <input required type="email" placeholder="Type Email..."/>
                </section>
                <section>
                    <div>Image</div>
                    <input required type="email" placeholder="Type Username..."/>
                </section>
                <section>
                    <div>Image</div>
                    <input required type="password" placeholder="Type Email..."/>
                </section>
                <input type="button"  value="aasadsadsadadsa"/>
            </form>
        </main>
     );
}
 
export default Register;