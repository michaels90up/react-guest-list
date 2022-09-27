/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { useEffect, useState } from 'react';

// Emotion styling:

export default function App() {
  const [valueFirstName, setValueFirstName] = useState('');
  const [valueLastName, setValueLastName] = useState('');
  const [guests, setGuests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // const [checkBoxValue, setCheckBoxValue] = useState(false);
  // necessary ?

  const baseUrl = 'http://localhost:4000'; // correct ?

  // Fetching data from API

  async function fetchGuests() {
    const response = await fetch(`${baseUrl}/guests`);
    const allGuests = await response.json();
    setGuests(allGuests);
    setIsLoading(false);
  }
  useEffect(() => {
    fetchGuests().catch(() => {});
  }, []);

  // Adding guest

  async function addGuest() {
    if (valueFirstName && valueLastName) {
      // precondition
      const response = await fetch(`${baseUrl}/guests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: valueFirstName,
          lastName: valueLastName,
          attending: false, // attendance
        }),
      });
      const createdGuest = await response.json();
      const newGuests = [...guests];
      newGuests.unshift(createdGuest);
      setGuests(newGuests);
    }
  }

  // Removing guest

  async function removeGuest(id) {
    const response = await fetch(`${baseUrl}/guests/${id}`, {
      method: 'DELETE',
    });
    const deletedGuest = await response.json();
    const newGuests = guests.filter((guest) => guest.id !== deletedGuest.id);
    setGuests(newGuests);
  }

  // Updating guest

  async function updateGuest(id, checkBoxValue) {
    const response = await fetch(`${baseUrl}/guests/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: checkBoxValue }),
    });
    const updatedGuest = await response.json();
    let newGuestValue = [...guests];
    newGuestValue = newGuestValue.map((guest) =>
      guest.id === id ? updatedGuest : guest,
    );
    setGuests(newGuestValue);
  }

  // if (!guest) return <div>Loading ...</div>;

  return (
    <div>
      <h1>Guest List</h1>
      <p>Add your name to the guest list.</p>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          await addGuest();
          setValueFirstName('');
          setValueLastName('');
        }}
      >
        <label>
          First name
          <input
            value={valueFirstName}
            disabled={isLoading}
            onChange={(event) => {
              setValueFirstName(event.currentTarget.value);
            }}
          />
        </label>
        <label>
          Last name
          <input
            value={valueLastName}
            disabled={isLoading}
            onChange={(event) => {
              setValueLastName(event.currentTarget.value);
            }}
          />
        </label>
        <button
          onClick={async () => {
            await removeGuest();
          }}
        >
          Remove
        </button>
      </form>
      {!isLoading ? (
        <div>
          <h2>Guest List:</h2>
        </div>
      ) : (
        <div>Loading...</div>
      )}
      {/* <input
        type="checkbox"
        checked={checkBoxValue}
        onChange={(event) => setCheckBoxValue(event.currentTarget.checked)}
      />*/}
    </div>
  );
}
