import { useState, useEffect, useCallback, useContext } from 'react';
import { ProductsContext } from '../../context/Productcontext';
import axios from 'axios';

const UseCustom = (url, method) => {
  const { setallProducts } = useContext(ProductsContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getProducts = useCallback(async () => {
    try {
      setLoading(true);
      if (method === 'GET') {
        const response = await axios.get(`${url}/get-all-todo`);
        console.log(response.data);
        setallProducts(response.data);
        setProducts(response.data);
        setLoading(false);
      } else {
        console.error('Unsupported method');
      }
    } catch (err) {
      setLoading(false);
      setError(err.message);
      console.log(err.message, ': Error');
    }
  }, [url, method]);

  useEffect(() => {
    getProducts();
  }, [url, method]);

  const refetch = () => {
    getProducts();
  };
  return { refetch, products, loading, error };
};

export default UseCustom;
