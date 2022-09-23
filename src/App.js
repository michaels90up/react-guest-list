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
  const [inputValueFirstName, setInputValueFirstName] = useState('');
  const [inputValueLastName, setInputValueLastName] = useState('');
  const [guest, setGuest] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [checkBoxValue, setCheckBoxValue] = useState(false);

  const baseUrl = 'http://localhost:4000';
  async function fetchGuests() {
    const response = await fetch(`${baseUrl}/guests`);
    const allGuests = await response.json();

    console.log(allGuests);
  }

  useEffect(() => {
    fetchGuests().catch(() => {});
  }, []);

  useEffect(() => {
    if (guest) {
      setIsLoading(false);
    }
  }, [guest]);

  if (!guest) return <div>Loading ...</div>;

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
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <button>Remove</button>
      </form>
      <input
        form="checkbox"
        checked={checkBoxValue}
        onChange={(event) => setCheckBoxValue(event.currentTarget.checked)}
      />
    </div>
  );
}
