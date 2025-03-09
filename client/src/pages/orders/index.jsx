import React from 'react'
import "./styles.css";
import { useState } from 'react';
import Dropdown from '../../components/dropdown/index.jsx'

function Orders() {
    const [dropdownRef, setDropdownRef] = useState(null);

    const orders = [ /* for testing purposes */
        { id: 1, name: 'Macbook Titanium', price: "$10", unit: 'pcs', stock: 50},
        { id: 2, name: 'IPhone 18', price: "$20", unit: 'pcs', stock: 100},
    ]

    return (
        <div className='container'>
            {orders.length > 0 ? (
                orders.map((order) => (
                    <div key={order.id} className='order-component'>
                        <table className='orders-table'>
                            <thead>
                                <tr>
                                    <th>
                                        <button className="dropdown-button"
                                        onClick={() => setDropdownRef(dropdownRef === order.id ? null : order.id)}>
                                            V
                                        </button>
                                        {dropdownRef === order.id && (
                                            <Dropdown 
                                                displayMenu={dropdownRef === order.id}
                                                parentState={setDropdownRef}
                                                menuOptions={menuOptions}
                                            />
                                        )}
                                    </th>
                                    <tp>No. </tp>
                                    <tp>Product Name </tp>
                                    <tp>Price</tp>
                                    <tp>Unit</tp>
                                    <tp>Stock</tp>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td>{order.id}</td>
                                    <td>{order.name}</td>
                                    <td>{order.unit}</td>
                                    <td>{order.stock}</td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                ))
            ) : (<div>No orders</div>)}
        </div>
    )
}

export default Orders