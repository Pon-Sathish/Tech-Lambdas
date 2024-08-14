import { useState, } from "react"
import banner from "../Images/banner2.png"
import { useNavigate } from "react-router-dom"
function Login_Form() {
    const navigate = useNavigate();

    const [name, setname] = useState("")
    const [passsword, setpassword] = useState("")
    const [errname, seterrname] = useState("")
    const [errpasssword, seterrpassword] = useState("")
    let RegexPass = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    function Login() {
        let valid = true
        if (name == "" || name == undefined) {
            seterrname("*Please Enter Your User Name!*");
            valid = false
        }
        else {
            seterrname("")
        }
        if (passsword == "" || passsword == undefined) {
            seterrpassword("*Please Enter Your User Password!*");
            valid = false
        }
        else if (!RegexPass.test(passsword)) {
            seterrpassword("*Please Enter Your User Strong Password!*");
            valid = false
        }
        else {
            seterrpassword("")
        }
        if (valid) {
            navigate('/Purchase_Page')
        }

    }
    return <>
        <div className="bannerDesign">
            <div className="bannerContent">
                <div>
                    <h1>Welcome Back !</h1>
                    <h1 style={{ color: "blue" }}>Sign in to</h1>
                    <p>lorem ipsum is simply</p>
                    <p>User name</p>
                    <input
                        placeholder="Enter Your User Name"
                        value={name}
                        onChange={(ele) => setname(ele.target.value)}
                    />
                    <br />
                    <small style={{ color: "red" }}>{errname}</small>
                    <p>Password</p>
                    <input
                        type="password"
                        placeholder="Enter Your Passsword"
                        value={passsword}
                        onChange={(ele) => setpassword(ele.target.value)}
                    />
                    <br />
                    <small style={{ color: "red" }}>{errpasssword}</small>
                    <br />
                    <button onClick={Login}>Login</button>
                </div>
            </div>
            <div className="bannerImg" style={{ backgroundImage: "url(/banner2.png)" }}>
                <img src={banner} />
            </div>
        </div>
    </>
}
export default Login_Form