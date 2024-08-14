import { FaBell } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import grid from "../Images/gridimg.png"
import React, { useEffect, useState } from "react";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom";
import axios from "axios";
function New_Login() {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState('center');
    const [SchoolBag, setSchoolBag] = useState("");
    const [Sandals, setSandals] = useState("");
    const [Umbrella, setUmbrella] = useState("");
    const [TiffinBox, setTiffinBox] = useState("");
    const [WaterBottle, setWaterBottle] = useState("");
    const [Pro, setPro] = useState([])


    function Details_Get() {
        axios.get('http://localhost:3002/Product')
            .then((ele) => {
                setPro(ele.data)
            })
            .catch(() => {
                console.log("Error");

            })
    }

    useEffect(() => {
        Details_Get()
    }, []);


    const navigate = useNavigate();

    function Submit() {
        let newProduct
        if (SchoolBag !== "" || Sandals !== "" || Umbrella !== "" || TiffinBox !== "" || WaterBottle !== "") {
             newProduct = {
                Id: Pro.length + 1,
                SchoolBag: SchoolBag,
                Sandals: Sandals,
                Umbrella: Umbrella,
                TiffinBox: TiffinBox,
                WaterBottle: WaterBottle,
            };
            console.log("Product added:", newProduct);
        } else {
            console.log("No product selected");
        }
        navigate('/Add_Product', { state: { newProduct } })

    }


    const footerContent = (
        <div className="yesno">
            <Button label="Cancel" icon="pi pi-times" onClick={() => setVisible(false)} className="no" />
            <Button label="Submit" icon="pi pi-check" onClick={Submit} autoFocus className="yes" />
        </div>
    );

    const show = (position) => {
        setPosition(position);
        setVisible(true);
    };

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
                            /><br /><br /><br />
                            <label><span>*</span> Customer Name :</label> <input
                                placeholder="Name"
                            /><br /><br /><br />
                            <label><span>*</span> Mobile Number :</label> <input
                                placeholder="Number"
                            /><br /><br /><br />
                            <label><span>*</span> Location :</label> <input
                                placeholder="Location"
                            /><br /><br /><br />
                        </div>
                        <div>
                            <img src={grid} alt="grid" />
                            <div className="flex flex-wrap justify-content-center gap-2 mb-2">
                                <Button label="Add-Product" icon="pi pi-arrow-left" onClick={() => show('right')} className="add" style={{ minWidth: '10rem' }} />
                            </div>
                            <div className="cancelButton">
                                <button className="cancel">Cancel</button>
                                <button className="save">Save</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="card">
                <Dialog header="Header" visible={visible} position={position} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }} footer={footerContent} draggable={false} resizable={false}>
                    <div className="School">
                        <div>
                            <p>School Bag</p>
                            <p>Sandals</p>
                            <p>Umbrella</p>
                            <p>Tiffin Box</p>
                            <p>Water Bottle</p>
                        </div>
                        <div>
                            <input type="checkbox"
                                value={SchoolBag}
                                onChange={(ele) => setSchoolBag("SchoolBag")}
                            /><br />
                            <input type="checkbox"
                                value={Sandals}
                                onChange={(ele) => setSandals("Sandals")}
                            /><br />
                            <input type="checkbox"
                                value={Umbrella}
                                onChange={(ele) => setUmbrella("Umbrella")}
                            /><br />
                            <input type="checkbox"
                                value={TiffinBox}
                                onChange={(ele) => setTiffinBox("TiffinBox")}
                            /><br />
                            <input type="checkbox"
                                value={WaterBottle}
                                onChange={(ele) => setWaterBottle("WaterBottle")}
                            /><br />
                        </div>
                    </div>
                </Dialog>
            </div>
        </div>
    </>
}
export default New_Login