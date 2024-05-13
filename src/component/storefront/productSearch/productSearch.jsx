import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../../services/product';
import './productSearch.css';

function ProductSearchPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllProducts();
        if (Array.isArray(response.data)) {
          setProducts(response.data);
          setLoading(false);
        } else {
          console.error('Response does not contain an array of products:', response.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };
  
  const filteredProducts = products
    .filter((product) => {
      
      return product.Title.toLowerCase().startsWith(searchTerm);
    })
    .sort((a, b) => a.Title.localeCompare(b.Title)); 
  

  const sortProducts = () => {
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (sortAsc) {
        return a.Title.localeCompare(b.Title);
      } else {
        return b.Title.localeCompare(a.Title);
      }
    });
    setProducts(sortedProducts);
    setSortAsc(!sortAsc);
  };

  const redirectToProductPage = (sellerUsername, productId) => {
    window.location.href = `/${sellerUsername}/product/${productId}`;
  };

  return (
    <div className="page-container"> {}
      <div className="all-products-container">
        <h1>All Products</h1>
        <div className="filter-bar">
          <input
            type="text"
            placeholder="Search for products"
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          searchTerm === '' ? (
            <p>Please enter a search term to display products.</p>
          ) : (
            <div className="products-list">
              {filteredProducts.map((product, index) => (
                <div key={index} className="product-card">
                  <h2>{product.Title}</h2>
                  <p>Description: {product.Description}</p>
                  <p>Price: {product.Price}</p>
                  <p>Stock: {product.Stock}</p>
                  <div className="product-image-container"> {}
                    <img src={`https://imagedelivery.net/BMDilndsvZPipd90__49rQ/${product.ProductImage}/public`} alt="Product" className="product-image" /> {/* Updated image source */}
                  </div>
                  <p>Seller Username: {product.SellerUsername}</p>
                  <button onClick={() => redirectToProductPage(product.SellerUsername, product.ProductId)}>View Product</button>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default ProductSearchPage;
