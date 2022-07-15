import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import deleteicon from './delete-icon.svg';
import editicon from './edit-icon.svg';
import star from './star.svg';



function App() {
  const [listOfItems, setListOfItems] = useState([]);
  const [sku, setSku] = useState("");
  const [itemname, setItemname] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
 
  
//Get Items from database
  useEffect(() => {
    Axios.get("http://localhost:3001/getItems").then((response) => {
      setListOfItems(response.data);
    });
  }, []);

//Upload Item
  const createItem = () => {
    Axios.post("http://localhost:3001/createItem", {
      sku,
      itemname,
      description,
      quantity,
    }).then((response) => {
      setListOfItems([
        ...listOfItems,
        {
          sku,
          itemname,
          description,
          quantity,
        },
      ]);
    });
  };
//Update item
  const ItemToUpdate = (id) => {
    const newQuantity = prompt ("Enter new Quantity:");
    Axios.put("http://localhost:3001/update", {
      newQuantity: newQuantity,
      id: id
    }).then(() => {setListOfItems(listOfItems.map((items) => {
      return items._id == id ? {_id:id, sku: items.sku, itemname: items.itemname, description: items.description, quantity:newQuantity} : items;
    }));
    });
  };
//Delete Item
  const ItemToDelete = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then(()=>{
      setListOfItems(listOfItems.filter((items)=>{
        return items._id != id;
      }))
    })
  }

  return (
   
    <div className="App">

      <div className="itemsDisplay">
        <h1>ADD PRODUCTS</h1>
        <div>
        <input
          type="text"
          placeholder="SKU..."
          onChange={(event) => {
            setSku(event.target.value);
          }}
        />
        <br/>
        <input
          type="text"
          placeholder="Item name..."
          onChange={(event) => {
            setItemname(event.target.value);
          }}
        />
        <br/>
        <input
          type="text"
          placeholder="Description..."
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
        <br/>
        <input
          type="number"
          placeholder="Quantity..."
          onChange={(event) => {
            setQuantity(event.target.value);
          }}
        />
        <br/>
        {/* <input
          type="file"
          multiple
          onChange={(event) => {
            setImg(event.target.value);
          }}
        /> */}
        
        <button onClick={createItem}> Add Product </button>
        </div>
        <br/><br/>
        <h1>PRODUCTS</h1>
        <br/><br/>
        <table>
        <tr>
                <th>SKU</th>
                <th>ITEM NAME</th>
                <th>DESCRIPTION</th>
                <th>QUANTITY</th>
                <th></th>
              </tr>
        {listOfItems.map((items) => {
          return (
            
              
              <tr>
                  <td>{items.sku}</td>
                  <td>{items.itemname}</td>
                  <td>{items.description}</td>
                  <td>{items.quantity}</td>
                  <td>
                    <a onClick={()=> {ItemToUpdate(items._id);}}> <img src={editicon} alt="editicon"></img> </a>
                    <a onClick={()=> {ItemToDelete(items._id);}}> <img src={deleteicon} alt="deleteicon"></img> </a>
                    <a href=""> <img src={star} alt="star"></img> </a>
                  </td>
              </tr>
            
          );
        })}
        </table>
      </div>

      
    </div>
  );
}

export default App;

