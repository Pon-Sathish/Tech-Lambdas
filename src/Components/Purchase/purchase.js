import { FaBell } from "react-icons/fa";
import { CgSearch } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useRef } from "react";

function Purchase_Page() {
    const navigate = useNavigate();
    const [data, setdata] = useState([])
    const [state, setstate] = useState([])
    const [showData, setShowData] = useState({ row: 0, show: false })
    const [tempData, setTempData] = useState([]);
    const initialRender = useRef(true);

    function addnew() {

        navigate('/New_Login')

    }
    useEffect(() => {
        axios.get('http://localhost:3002/Details')
            .then((res) => {
                setdata(res.data);
            })
            .catch(() => {
                console.log("Wrong");

            })
    }, [])


    function Show(selectRow) {
        setShowData({ row: selectRow, show: !showData.show })
        console.log("state", state, data, selectRow)
        setstate(() => {
            const dummy = tempData.filter((item) => { console.log("id", item); return !showData.show && item.Id === selectRow });
            return dummy;
        }
        )
    }
    useEffect(() => {
        axios.get('http://localhost:3002/Product')
            .then((res) => {
                setstate(res.data);
                setTempData(res.data);
            })
            .catch(() => {
                console.log("Ethuku Work Ahgala");

            })
    }, [])

    console.log(state);

    const renderButton = (show, index, position) => {
        if (show && index) {
            return <button onClick={() => Show(position)} className="show">x</button>
        }
        else if (!show && index) {
            return <button onClick={() => Show(position)} className="show">+</button>
        }
        else {
            return <button onClick={() => Show(position)} className="show">+</button>
        }
    }

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
                    <div><h3>All Purchase</h3></div>
                    <div className='input'><div><input placeholder="Search" /></div><div className="searchicon"><CgSearch className="icon" /></div></div>
                    <div className='addNew'><button onClick={addnew}>+ Add New</button></div>
                </div>
                <div className="purchase_Details">
                    <div className="Details_Head">
                        <span className="dot">.</span>
                        <span>SNo</span>
                        <span>Date</span>
                        <span>Name</span>
                        <span>Mobile Number</span>
                        <span>Location</span>
                        <span>Action</span>
                    </div>
                    <br />
                    {
                        data.map((ele, index) => {
                            return <>
                                <div className="Product_Data">
                                    {renderButton(showData.show, showData.row === ele.Id, ele.Id)}
                                    {/* {showData.row===index && showData.show? <button onClick={()=>Show(ele.Id)} className="show">x</button> :  <button onClick={()=>Show(ele.Id)}>+</button>} */}
                                    <span>{index + 1}</span>
                                    <span>{ele.Date}</span>
                                    <span>{ele.Name}</span>
                                    <span>{ele.Number}</span>
                                    <span>{ele.Landlocation}</span>
                                    <span>Action</span>
                                </div>
                                <br />
                                {/*  */}

                            </>
                        })
                    }
                    {showData.show && state?.map((elem, i) => {
                        return <>
                            <div>
                                <span>{i + 1}</span>
                                <span>{elem.SchoolBag}</span>
                                <span>{elem.Sandals}</span>
                                <span>{elem.Umbrella}</span>
                                <span>{elem.TiffinBox}</span>
                                <span>{elem.WaterBottle}</span>
                            </div>
                        </>

                    })
                    }
                </div>
            </div>
        </div>
    </>
}
export default Purchase_Page



// //



