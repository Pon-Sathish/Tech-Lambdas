import { FaBell } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
function Add_Product() {
    const [date, setdate] = useState("");
    const [name, setname] = useState("");
    const [number, setnumber] = useState("");
    const [landlocation, setlandlocation] = useState("");
    // 
    const [errdate, seterrdate] = useState("");
    const [errname, seterrname] = useState("");
    const [errnumber, seterrnumber] = useState("");
    const [errlocation, seterrlocation] = useState("");
  
    const Num = /[0-9]/;
    const no = /^\d{10}$/;
    const [data, setdata] = useState([]);
    const [nextId, setNextId] = useState(1);
    const navigate = useNavigate();

    function Details_Get() {
        axios.get('http://localhost:3002/Details')
            .then((ele) => {
                setdata(ele.data)
            })
            .catch(() => {
                console.log("Error");

            })
    }

    useEffect(() => {
        Details_Get()
    }, []);

    function Save() {
        if (date == "" || date == undefined) {
            seterrdate("Please Select Date")
        }
        else {
            seterrdate("")
        }
        if (name == "" || name == undefined) {
            seterrname("Please Enter Your Name")
        }
        else {
            seterrname("")
        }
        if (number == "" || number == undefined) {
            seterrnumber("Please Enter Your Number")
        }
        else if (!Num.test(number)) {
            seterrnumber("Type Number Only")
        }
        else if (!no.test(number)) {
            seterrnumber("Type A 10 Digit Number")
        }
        else {
            seterrnumber("")
        }
        if (landlocation == "" || landlocation == undefined) {
            seterrlocation("Please Enter Your location")
        }
        else {
            seterrlocation("")
        }
        //Store
        if (date != "" && name != "" && number != "" && landlocation != "") {
            axios.post('http://localhost:3002/Details', { Id: data.length + 1, Date: date, Name: name, Number: number, Landlocation: landlocation });

            axios.post('http://localhost:3002/Product', newProduct)
                .then(() => {
                    navigate('/Purchase_Page');
                    console.log('sucessssfully');
                })
                .catch(() => {
                    console.log("faild");

                })
        }


    }
    function Cancel() {
        window.location.reload();

    }

    ////props
    const location = useLocation();
    const { newProduct } = location.state || {};

    return <>
        <div className='purchasePage'>
            <div className='purchaseDesign'>
                <h1><label>Tech</label> Lambdas</h1>
                <button>Log Out</button>
            </div>
            <div className='purchaseContent'>
                <div className='purchaseIcon'>
                    <div><h1>Purchase</h1></div>
                    <div><FaBell className='bell' /></div>
                </div>
                <div className='purchaseButton'>
                    <div><GoArrowLeft className="arro" /><span className="arro1">Create New Purchase</span></div>
                </div>
                <div>
                    <div className="addProduct">
                        <div>
                            <label><span>*</span> Date :</label> <input
                                className="date"
                                type="date"
                                placeholder="Select Date"
                                value={date}
                                onChange={(ele) => setdate(ele.target.value)} />
                            <p>{errdate}</p>
                            <br />
                            <label><span>*</span> Customer Name :</label> <input
                                placeholder="Name"
                                value={name}
                                onChange={(ele) => setname(ele.target.value)}
                            />
                            <p>{errname}</p>

                            <br />
                            <label><span>*</span> Mobile Number :</label> <input
                                placeholder="Number"
                                value={number}
                                onChange={(ele) => setnumber(ele.target.value)} />
                            <p>{errnumber}</p>

                            <br />
                            <label><span>*</span> Location :</label> <input
                                placeholder="Location"
                                value={landlocation}
                                onChange={(ele) => setlandlocation(ele.target.value)} />
                            <p>{errlocation}</p>
                            <br />
                        </div>
                        <div>
                            <h2 className="S_elect">Selectd Product</h2>
                            <div>
                                <div>
                                    {/* {newProduct.map((newProduct) => ( */}
                                        <>
                                            <p>{newProduct.SchoolBag}</p>
                                            <p>{newProduct.Sandals}</p>
                                            <p>{newProduct.Umbrella}</p>
                                            <p>{newProduct.TiffinBox}</p>
                                            <p>{newProduct.WaterBottle}</p>
                                        </>
                                    {/* ))} */}
                                </div>
                            </div>
                        </div>
                        <div className="sameButton">
                            <div className="cancelButton">
                                <button className="cancel" onClick={Cancel}>Cancel</button>
                                <button className="save" onClick={Save}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </>
}
export default Add_Product