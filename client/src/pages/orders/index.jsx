import React from 'react'
import "./styles.css";

function Orders() {
    return (
        <div className='container'>
            <div className='order-component'>
                <table className='orders-table'>
                    <thead>
                        <tr>
                            <tp>No.</tp>
                            <tp>Product Name</tp>
                            <tp>Price</tp>
                            <tp>Unit</tp>
                            <tp>Stock</tp>
                        </tr>
                    </thead>
                </table>
            </div>

            <div className='order-component'>
                <table className='orders-table'>
                    <thead>
                        <tr>
                            <button className='dropdown-button'> V </button>
                            <tp>No.</tp>
                            <tp>Product Name</tp>
                            <tp>Price</tp>
                            <tp>Unit</tp>
                            <tp>Stock</tp>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    )
}

export default Orders