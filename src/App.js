export default function App() {
  return (
    <div>
      <form>
        <label>
          First name:
          <input name="first name" />
        </label>
      </form>
      <form>
        <label>
          Last name:
          <input name="last name" />
        </label>
      </form>
      <button className="delete button">Remove</button>
    </div>
  );
}
