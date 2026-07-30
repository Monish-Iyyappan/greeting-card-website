import { useState } from "react"; // Imports React state support for storing form values.
import { LockKeyhole, UserRound } from "lucide-react"; // Imports the icons used in the sign-in form.
import WelcomePage from "./WelcomePage"; // Imports the page shown after a successful sign-in.

function App() { // Starts the main app component that renders the login screen.
  const [name, setName] = useState(""); // Stores the user's entered name.
  const [password, setPassword] = useState(""); // Stores the user's entered password.
  const [error, setError] = useState(""); // Stores any validation message to show the user.
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks whether the user has successfully signed in.

  const handleSubmit = (event) => { // Creates the form submit handler for validation and navigation.
    event.preventDefault(); // Prevents the browser from reloading the page on submit.

    if (!name.trim() || !password.trim()) { // Checks whether both fields have been filled in.
      setError("Please enter your name and password."); // Shows a helpful error message when values are missing.
      return; // Stops the function so the page does not switch.
    }

    setError(""); // Clears any previous error message.
    setIsLoggedIn(true); // Switches the UI to the welcome page.
  };

  const handleBackToLogin = () => { // Creates the handler for returning to the sign-in screen.
    setIsLoggedIn(false); // Hides the welcome page.
    setName(""); // Clears the name field.
    setPassword(""); // Clears the password field.
    setError(""); // Clears the error message.
  };

  if (isLoggedIn) { // Shows the welcome page when sign-in is complete.
    return <WelcomePage name={name.trim()} onBack={handleBackToLogin} />; // Passes the name and back handler to the welcome page.
  }

  return ( // Begins the JSX returned for the sign-in screen.
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4 py-10"> // Opens the full-screen container for the form.
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-cyan-950/40 backdrop-blur"> // Opens the dark sign-in card.
        <div className="mb-8 text-center"> // Opens the title section of the card.
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.35em] text-cyan-400"> // Opens the small welcome badge.
            Welcome // Shows the welcome badge text.
          </p> // Closes the welcome badge.
          <h1 className="text-3xl font-semibold text-white">Sign in to continue</h1> // Shows the main heading text.
          <p className="mt-3 text-sm text-slate-400"> // Opens the helper paragraph.
            Enter your details below to open your account. // Shows the helper text.
          </p> // Closes the helper paragraph.
        </div> // Closes the title section.

        <form className="space-y-5" onSubmit={handleSubmit}> // Opens the form and links it to the submit handler.
          <label className="block"> // Opens the name input label container.
            <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300"> // Opens the label row with the icon and text.
              <UserRound className="h-4 w-4 text-cyan-400" /> // Shows the user icon for the name field.
              Name // Shows the label text for the name field.
            </span> // Closes the label row.
            <input // Opens the name input field.
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/40" // Styles the name input field.
              type="text" // Sets the input type to plain text.
              placeholder="Your name" // Gives the name field a hint.
              value={name} // Binds the input to the name state.
              onChange={(event) => setName(event.target.value)} // Updates the name state as the user types.
            /> // Closes the name input field.
          </label> // Closes the name label container.

          <label className="block"> // Opens the password input label container.
            <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300"> // Opens the label row for the password field.
              <LockKeyhole className="h-4 w-4 text-cyan-400" /> // Shows the lock icon for the password field.
              Password // Shows the label text for the password field.
            </span> // Closes the label row.
            <input // Opens the password input field.
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/40" // Styles the password input field.
              type="password" // Hides the entered password.
              placeholder="Your password" // Gives the password field a hint.
              value={password} // Binds the input to the password state.
              onChange={(event) => setPassword(event.target.value)} // Updates the password state as the user types.
            /> // Closes the password input field.
          </label> // Closes the password label container.

          {error ? <p className="text-sm text-rose-400">{error}</p> : null} // Shows the validation error if one exists.

          <button // Opens the submit button.
            className="w-full rounded-2xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400" // Styles the submit button.
            type="submit" // Makes the button submit the form.
          > // Opens the button content.
            Continue // Shows the button label.
          </button> // Closes the submit button.
        </form> // Closes the sign-in form.
      </div> // Closes the sign-in card.
    </div> // Closes the main page container.
  ); // Ends the returned JSX block.
}

export default App; // Exports the component so it can be rendered.
