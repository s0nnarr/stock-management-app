import "./styles.css";
import Sidebar from '../../components/sidebar';
import Navbar from '../../components/navbar';
import { Plus, Pencil, Eraser } from "lucide-react";
//import Popup from './popup.jsx';
import { useFetch } from '../../hooks/useFetch';
import { useDelete } from '../../hooks/useDelete';

function Inventory() {

    const { data: products, loading, error } = useFetch("inventory");
    const { deleteData, loading: deleteLoading, error: deleteError } = useDelete("inventory");

    return (
        <div>
            <title>Inventory</title>
            <div style={{ display: 'flex' }}>
                <Sidebar tab={'Dashboard'} />
                <div style={{ flexGrow: 1 }}>
                    <Navbar />
                    <div className='container'>
                        <div className='inventory-header'>
                            {loading && <p>Loading...</p>}
                            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
                            {!loading && !error && (
                                <table className='inventory-table'>
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Product Name</th>
                                            <th>Price</th>
                                            <th>Unit</th>
                                            <th>Stock</th>
                                            <th>
                                                <button className="plus">
                                                    <Plus/>
                                                </button>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products?.map((product, index) => (
                                            <tr key={product._id || index} >
                                                <td>{index + 1}</td>
                                                <td>{product.productName}</td>
                                                <td>{product.price}$</td>
                                                <td>{product.unit}</td>
                                                <td>{product.stock}</td>
                                                <td>
                                                    <button className="edit">
                                                        <Pencil/>
                                                    </button></td>
                                                <td>
                                                    <button className="delete" onClick={() => {
                                                     deleteData({ id: product._id }, () => {
                                                     setProducts(products.filter(p => p._id !== product._id));
                                                          });
                                                         }}>
                                                        <Eraser/>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default Inventory;