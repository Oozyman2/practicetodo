import { useContext, useEffect } from 'react';
import { ProductsContext } from '../context/Productcontext';
import axios from 'axios';
import Cards from './Cards';

const Todolist = () => {
  const { products, loading } = useContext(ProductsContext);

  return (
    <div className=''>
      <div className='row gap-1 justify-content-center m-auto '>
        {loading ? (
          <div
            class='spinner-border text-warning'
            style={{ height: '10rem', width: '10rem' }}
            role='status'
          >
            <span class='visually-hidden'>Loading...</span>
          </div>
        ) : (
          products.map((item) => (
            <Cards
              name={item.todo_name}
              description={item.todo_desc}
              status={item.todo_status}
              time={item.time_created}
              id={item.id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Todolist;
