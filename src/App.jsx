import React, { useState, useEffect } from 'react'
import './style.css';
import toast, { Toaster } from 'react-hot-toast';

const App = () => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [noTouched, setNoTouched] = useState(false);
  const API = 'https://dog.ceo/api'
  
  function handleData() {
    try {
      setIsLoading(true)
      fetch(`${API}/breeds/image/random`, {
        method : 'GET',
      })
      .then(response => response.text())
      .then(response => {
        response = JSON.parse(response);
        setImage(response.message);
        setIsLoading(false)
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false)
      })
    } catch (e) {
      setError(e);
    }
  }

  useEffect(() => {
    handleData(); 
  }, [])

  function handleApprove() {
    toast('Пойдём гулять!', {
      icon: '👏',
    });
  }

  return (
    <div className='page'>
      <div className='content'>
        <div className='loading'>
          {isLoading && <p>Loading...</p>}
        </div>
        {image && <img src={image} alt="cat" />}
        {noTouched ? 
          <p className='text'>А такой?</p> :
          <p className='text'>Будь моей собакой?</p>
        }
        <div className='buttons'>
          <button
            className='button'
            onClick={handleApprove}
          >
              Да
          </button>
          <button
            onClick={() => {
              handleData();
              setNoTouched(true);
            }}
            className='button'
          >
            Нет
          </button>
        </div>
        {error && <p>error</p>}
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '16px'
          }
        }}
      />
    </div>
  )
}

export default App;
