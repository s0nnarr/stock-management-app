import React, { useContext } from 'react'
import './index.css'
import { AuthContext } from '../../context/authContext';
import Sidebar from '../../components/sidebar';
import Navbar from '../../components/navbar';
import { useFetch } from '../../hooks/useFetch';
import AreaReChart from '../../components/AreaReChart';
import BarReChart from '../../components/BarReChart';

function Dashboard() {

    const { user } = useContext(AuthContext)

    return (
        <>
            <Sidebar tab={'Dashboard'} />
            <Navbar />
            <main className='dashboard-main'>
                <div className='dashboard-div-stats'>
                    <div className='dashboard-div-orders'>
                        <h3 className='dashboard-h3-category'>Orders</h3>
                        <ol>
                            <li>
                                <label>TO BE PROCESSED</label>
                                <p>200</p>
                            </li>
                            <li>
                                <label>TO BE SHIPPED</label>
                                <p>360</p>
                            </li>
                            <li>
                                <label>TO BE DELIVERED</label>
                                <p>120</p>
                            </li>
                            <li>
                                <label>TOTAL</label>
                                <p>680</p>
                            </li>
                        </ol>
                    </div>
                    <div className='dashboard-div-orders'>
                        <h3 className='dashboard-h3-category'>Inventory</h3>
                        <div className='dashboard-div-inventory'>
                            <div className='dashboard-div-inventoryStats'>
                                <h4>High value inventory</h4>
                                <ol>
                                    <li>
                                        <h3>Laptop IdeaPad i5</h3>
                                        <p>58000€</p>
                                    </li>
                                    <li>
                                        <h3>Kingston 16GB RAM</h3>
                                        <p>18250€</p>
                                    </li>
                                    <li>
                                        <h3>Macbook Pro M2</h3>
                                        <p>8300€</p>
                                    </li>
                                </ol>
                            </div>
                            <div className='dashboard-div-inventoryStats'>
                                <h4>Inventory status</h4>
                                <ol>
                                    <li>
                                        <h3>Total</h3>
                                        <p>426</p>
                                    </li>
                                    <li>
                                        <h3>Low stock</h3>
                                        <p>28</p>
                                    </li>
                                    <li>
                                        <h3>Zero stock</h3>
                                        <p>6</p>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                    <div className='dashboard-div-orders'>
                        <h3 className='dashboard-h3-category'>Sales</h3>
                        <div className='dashboard-div-inventory'>
                            <div className='dashboard-div-inventoryStats'>
                                <h4>Revenue</h4>
                                <AreaReChart />
                            </div>
                            <div className='dashboard-div-inventoryStats'>
                                <h4>Top selling</h4>
                                <BarReChart />
                            </div>
                        </div>
                    </div>
                </div>
            </main >
        </>
    )
}

export default Dashboard