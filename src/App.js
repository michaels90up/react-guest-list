// const baseUrl = 'http://localhost:4000';
// const response = await fetch(`${baseUrl}/guests`);
// const allGuests = await response.json();
// console.log(allGuests);

import { useState } from 'react';

// Adding React component functions
function Guest(props) {
  return (
    <div data-test-id="guest">
      <h4>{props.user.firstName}</h4>
      <h4>{props.user.lastName}</h4>
    </div>
  );
}

export default function App() {
  const [inputValueFirstName, setInputValueFirstName] = useState('');
  const [inputValueLastName, setInputValueLastName] = useState('');

  return (
    <div>
      <h1>Guest List</h1>
      <p>Add your name to the guest list.</p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <label>
          First name
          <input
            value={inputValueFirstName}
            onChange={(event) =>
              setInputValueFirstName(event.currentTarget.value)
            }
          />
        </label>
      </form>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <label>
          Last name
          <input
            value={inputValueLastName}
            onChange={(event) =>
              setInputValueLastName(event.currentTarget.value)
            }
          />
        </label>
      </form>
      <button>Remove</button>
      <div>
        <Guest user={{ firstName: 'Michael', lastName: 'Schüssler' }} />
      </div>
    </div>
  );
}
