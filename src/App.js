/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { useEffect, useState } from 'react';

// function Guest(props) {
//   return (
//     <div data-test-id="guest">
//       <h4>{props.guest.firstName}</h4>
//       <h4>{props.guest.lastName}</h4>
//     </div>
//   );
// }

export default function App() {
  const [valueFirstName, setValueFirstName] = useState('');
  const [valueLastName, setValueLastName] = useState('');

  const [guests, setGuests] = useState([]); // deciding on variable name

  const [isLoading, setIsLoading] = useState(false);

  const [checkBoxValue, setCheckBoxValue] = useState(false); // necessary ?

  const baseUrl = 'http://localhost:4000'; // correct ?

  // Fetching data from API

  useEffect(() => {
    async function fetchGuests() {
      setIsLoading(true);

      const response = await fetch(`${baseUrl}/guests`);
      const data = await response.json();
      setGuests(data);
      setIsLoading(false);
    }
    fetchGuests().catch((err) => {
      err();
    }); //
  }, []);

  // Adding guest

  async function addGuest() {
    const response = await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: valueFirstName,
        lastName: valueLastName,
      }),
    });
    const createdGuest = await response.json();
    setGuests([createdGuest, ...guests]);
  }

  // Removing guest

  async function removeGuest(id) {
    const response = await fetch(`${baseUrl}/guests/${id}`, {
      method: 'DELETE',
    });
    const deletedGuest = await response.json();
    setGuests(guests.filter((el) => el.id !== deletedGuest.id));
  }

  // Updating guest

  async function updateGuest(id) {
    const response = await fetch(`${baseUrl}/guests/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: true }),
    });
    const updatedGuest = await response.json();
    setGuests(
      guests.map((el) => (el.id !== updatedGuest.id ? el : updatedGuest)),
    );
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
      <input
        type="checkbox"
        checked={checkBoxValue}
        onChange={(event) => setCheckBoxValue(event.currentTarget.checked)}
      />
    </div>
  );
}
