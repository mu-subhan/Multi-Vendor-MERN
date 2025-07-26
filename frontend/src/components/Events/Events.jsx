import React, { useEffect } from 'react'
import styles from '../../styles/styles'
import EventCard from "./EventCard"
import { useSelector, useDispatch } from 'react-redux';
import { getAllEvents } from '../../redux/actions/event';

const Events = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {allEvents && allEvents.length > 0 ? (
            <div className={`${styles.section}`}>
              <div className={`${styles.heading}`}>
                <h1>Popular Events</h1>
              </div>
              <div className='w-full grid'>
                <EventCard data={allEvents[0]} />
              </div>
            </div>
          ) : (
            <div className={`${styles.section}`}>
              <div className={`${styles.heading}`}>
                <h1>No Events Available</h1>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Events
