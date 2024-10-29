import { createContext, useState, useEffect, useContext } from 'react';
import { base_url } from '../library/api';
import axios from 'axios';
import { AuthContext } from './Authcontext';

const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [product, setproduct] = useState({});
  const { authToken } = useContext(AuthContext); // Use AuthContext to get the authToken

  useEffect(() => {
    if (authToken) {
      getProducts();
    }
  }, [authToken]);

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${base_url}/get-all-todo`, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      });
      console.log(response.data);
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message);
      console.log(err.message, ': Error');
    }
  };
  const addProducts = async (todoData) => {
    console.log(todoData);
    try {
      const response = await axios.post(
        `${base_url}/add-todo`,
        todoData, // Pass todoData as the second argument
        {
          // Pass headers as the third argument
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      );
      console.log(response.data);
      setProducts((prev) => [...prev, response.data]);
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err.message);
      console.log(err.message, ': Error');
    }
  };

  const getSingleProduct = async (id, method, data = {}) => {
    try {
      if (method == 'GET') {
        const response = await axios.get(`${base_url}/edit-view/${id}`, {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        });
        setproduct(response.data);
        console.log(response.data);

        setLoading(false);
        return response.data;
      } else if (method == 'PUT') {
        console.log(data);
        const response = await axios.put(`${base_url}/edit-view/${id}`, data);
        setproduct(response.data);
        console.log(response.data);
        setLoading(false);
        return response.data;
      }
    } catch (err) {
      setLoading(false);
      setError(err.message);
      console.log(err.message, ': Error');
    }
  };

  const deleteSingleTodo = async (id) => {
    setLoading(true);
    try {
      const data = await axios.delete(`${base_url}/delete-todo/${id}`, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      });
      setProducts((prev) => prev.filter((item) => item.id !== id));
      console.log(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  //   const refetch = () => {
  //     getProducts();
  //   };

  useEffect(() => {
    if (authToken) {
      getProducts();
    }
  }, [authToken]);

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        error,
        addProducts,
        setLoading,
        getSingleProduct,
        deleteSingleTodo,
        product,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsContext, ProductsProvider };
