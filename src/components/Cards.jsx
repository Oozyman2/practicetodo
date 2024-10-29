import React from 'react';
import cardTop from '../assets/icon1.svg';
import './cards.css';
import { Link } from 'react-router-dom';
import ViewTodo from './ViewTodo';
import { convertDateFormat } from '../utils/library';

const Cards = ({ name, description, status, time, id }) => {
  return (
    <>
      <div className='solution_cards_box border-3 col-md-3 col-lg-2 p-2 col-12'>
        <div className='solution_card'>
          <div className='hover_color_bubble'></div>
          <div className='so_top_icon d-flex justify-content-between'>
            <img src={cardTop} alt='' className='ml-2' />
            {/* <div className='fw-bolder d-flex  h5 bg-dark text-warning '>
            <span className='p-2 fw-lighter'>
              {convertDateFormat(time).split(' ')[0]}
            </span>

            <div
              style={{
                fontSize: '0.8rem',
              }}
              className='text-black bg-warning text-center p-1 fw-light'
            >
              {convertDateFormat(time).split(' ')[1].slice(0, 3)} <br />
              {convertDateFormat(time).split(' ')[2]}
            </div>
          </div> */}
          </div>
          <div className='solu_title'>
            <h3 className='pt-1 display-6 fw-bold text-capitalize'>{name}</h3>
          </div>
          <div className='solu_description  px-1 text-lowercase'>
            {/* <p>
              {description.length > 20
                ? description.substring(0, 50) + '...'
                : description}
            </p> */}
            <div className='d-flex align-items-center my-3 justify-content-between'>
              <Link to={`Todo/${id}`}>
                <button
                  type='button'
                  className='read_more_btn btn btn-outline-success rounded-5 py-1 px-3'
                >
                  View
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
