import { useState, useEffect, useRef } from "react"; // Imports React hooks for state, effects, and refs.
import { LockKeyhole, UserRound, X } from "lucide-react"; // Imports the icons used in the sign-in form, plus X for modal close.
import WelcomePage from "./WelcomePage"; // Imports the page shown after a successful sign-in.

function App() { // Starts the main app component that renders the login screen.
  const [name, setName] = useState(""); // Stores the user's entered name.
  const [password, setPassword] = useState(""); // Stores the user's entered password.
  const [statusMessage, setStatusMessage] = useState(""); // Stores the current message text.
  const [statusType, setStatusType] = useState(""); // Stores whether the current message is success or error.
  const [statusScope, setStatusScope] = useState(""); // Stores whether the message belongs to login or signup.
  const [isSubmitting, setIsSubmitting] = useState(false); // Tracks whether a login or signup request is in progress.
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks whether the user has successfully signed in.

  const setStatus = (type, message, scope) => { // Set the current message and its type.
    setStatusType(type);
    setStatusMessage(message);
    setStatusScope(scope);
  };

  const clearStatus = () => { // Clear the current message and its metadata.
    setStatusType("");
    setStatusMessage("");
    setStatusScope("");
  };

  const clearLoginFields = () => { // Clear the login input fields.
    setName("");
    setPassword("");
  };

  const clearSignupFields = () => { // Clear the signup input fields.
    setNewName("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async (event) => { // Creates the form submit handler for validation and navigation.
    event.preventDefault(); // Prevents the browser from reloading the page on submit.
    if (isSubmitting) return;
    clearStatus();

    if (!name.trim() || !password.trim()) { // Checks whether both fields have been filled in.
      setStatus("error", "Please enter your name and password.", "login"); // Show a single login error message.
      clearLoginFields(); // Clear inputs after the user submits.
      return; // Stop before sending a request.
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: name.trim(), password }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setStatus("error", result.message || "Unable to sign in. Please try again.", "login");
      } else {
        setStatus("success", "Login successful.", "login");
        setIsLoggedIn(true); // Switches the UI to the welcome page.
      }
    } catch (fetchError) {
      setStatus("error", "Unable to connect to the server. Please try again.", "login");
    } finally {
      setIsSubmitting(false);
      clearLoginFields(); // Clear login fields after the request completes.
    }
  };

  const handleBackToLogin = () => { // Creates the handler for returning to the sign-in screen.
    setIsLoggedIn(false); // Hides the welcome page.
    clearLoginFields(); // Clears any login inputs.
    clearStatus(); // Clears any status message shown on sign-in.
  };

  // Additional state for the Sign Up modal and its form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [modalErrors, setModalErrors] = useState({});

  const nameInputRef = useRef(null);
  const overlayRef = useRef(null);

  // Manage Escape key, focus, and preventing background scroll when modal is open
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") closeModal();
    }

    if (isModalOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // prevent background scroll
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      // focus first input
      setTimeout(() => nameInputRef.current?.focus(), 0);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isModalOpen]);

  function openModal() {
    setModalErrors({});
    clearStatus();
    clearSignupFields();
    setIsModalOpen(true);
  }

  function closeModal(keepStatus = false) {
    setIsModalOpen(false);
    if (!keepStatus && statusScope === "signup") {
      clearStatus();
    }
  }

  function handleOverlayClick(e) {
    if (e.target === overlayRef.current) closeModal();
  }

  async function handleSignUp(e) {
    e.preventDefault();
    if (isSubmitting) return;
    const errors = {};
    if (!newName.trim()) errors.newName = "Please enter a name.";
    if (!newPassword.trim()) errors.newPassword = "Please enter a password.";
    if (!confirmPassword.trim()) errors.confirmPassword = "Please confirm your password.";
    if (newPassword && confirmPassword && newPassword !== confirmPassword) errors.confirmPassword = "Passwords do not match.";

    setModalErrors(errors);
    clearStatus();

    if (Object.keys(errors).length > 0) {
      clearSignupFields();
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: newName.trim(),
          password: newPassword,
          confirmPassword,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setStatus("error", result.message || "Unable to create account.", "signup");
      } else {
        closeModal(true);
        setStatus("success", "Account created successfully. Please sign in.", "login");
      }
    } catch (fetchError) {
      setStatus("error", "Unable to connect to the server. Please try again.", "signup");
    } finally {
      setIsSubmitting(false);
      clearSignupFields();
    }
  }

  if (isLoggedIn) { // Shows the welcome page when sign-in is complete.
    return <WelcomePage name={name.trim()} onBack={handleBackToLogin} />; // Passes the name and back handler to the welcome page.
  }

  return ( // Begins the JSX returned for the sign-in screen.
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4 py-10"> {/*// Opens the full-screen container for the form.*/}
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-cyan-950/40 backdrop-blur"> {/*// Opens the dark sign-in card.*/}
        <div className="mb-8 text-center"> {/*// Opens the title section of the card.*/}
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.35em] text-cyan-400"> {/*// Opens the small welcome badge.*/}
            Welcome{/*this is the welcome text so just give anything at that spot if you have idea.*/}
          </p> {/*// Closes the welcome badge.*/}
          <h1 className="text-3xl font-semibold text-white">Sign in to continue</h1> {/*// Shows the main heading text.*/}
          <p className="mt-3 text-sm text-slate-400"> {/*// Opens the helper paragraph.*/}
            Enter your details below to open your account. {/*// Shows the helper text.*/}
          </p> {/*// Closes the helper paragraph.*/}
        </div> {/*// Closes the title section.*/}

        <form className="space-y-5" onSubmit={handleSubmit}> {/*// Opens the form and links it to the submit handler.*/}
          <label className="block"> {/*// Opens the name input label container.*/}
            <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300"> {/*// Opens the label row with the icon and text.*/}
              <UserRound className="h-4 w-4 text-cyan-400" /> {/*// Shows the user icon for the name field.*/}
              Name {/*// Shows the label text for the name field.*/}
            </span> {/*// Closes the label row.*/}
            <input // Opens the name input field.
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/40" // Styles the name input field.
              type="text" // Sets the input type to plain text.
              placeholder="Your name" // Gives the name field a hint.
              value={name} // Binds the input to the name state.
              onChange={(event) => setName(event.target.value)} // Updates the name state as the user types.
            /> {/*// Closes the name input field.*/}
          </label> {/*// Closes the name label container.*/}

          <label className="block"> {/*// Opens the password input label container.*/}
            <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300"> {/*// Opens the label row for the password field.*/}
              <LockKeyhole className="h-4 w-4 text-cyan-400" /> {/*// Shows the lock icon for the password field.*/}
              Password {/*// Shows the label text for the password field.*/}
            </span> {/*// Closes the label row.*/}
            <input 
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/40"
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            /> {/*// Closes the password input field.*/}
          </label> {/*// Closes the password label container.*/}

          {statusMessage && statusScope === "login" ? (
            <div
              className={`mt-2 rounded-2xl border px-4 py-3 text-sm ${
                statusType === "success"
                  ? "border-emerald-500 bg-emerald-500/10 text-emerald-200"
                  : "border-rose-400 bg-rose-400/10 text-rose-200"
              }`}
            >
              {statusType === "success" ? "✓ " : "✗ "}
              {statusMessage}
            </div>
          ) : null}

          <button 
            className="w-full rounded-2xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
            type="submit"
            disabled={isSubmitting}
          > {/*// Opens the button content.*/}
            Continue {/*// Shows the button label.*/}
          </button> {/*// Closes the submit button.*/}

          {/* Create account button centered below Continue */}
          <div className="mt-3 text-center">
            <button
              type="button"
              onClick={openModal}
              className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-cyan-300 hover:text-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
            >
              Create an account
            </button>
          </div>
        </form> {/*// Closes the sign-in form.*/}
      </div> {/*// Closes the sign-in card.*/}

      {/* Modal overlay and dialog */}
      {isModalOpen ? (
        <div
          ref={overlayRef}
          onMouseDown={handleOverlayClick}
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 py-8"
        >
          <div
            onMouseDown={(e) => e.stopPropagation()}
            className="w-full max-w-md transform rounded-3xl bg-slate-900 p-6 shadow-2xl shadow-black/60 transition-all duration-200 ease-out"
            style={{"backdropFilter": "blur(6px)"}}
            role="dialog"
            aria-modal="true"
            aria-labelledby="signup-title"
          >
            <div className="relative">
              <h2 id="signup-title" className="text-xl font-semibold text-white">Create New Account</h2>
              <p className="mt-1 text-sm text-slate-400">Create your account to get started.</p>
              {statusMessage && statusScope === "signup" ? (
                <div
                  className={`mt-2 rounded-2xl border px-4 py-3 text-sm ${
                    statusType === "success"
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-200"
                      : "border-rose-400 bg-rose-400/10 text-rose-200"
                  }`}
                >
                  {statusType === "success" ? "✓ " : "✗ "}
                  {statusMessage}
                </div>
              ) : null}

              {/* close X */}
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close"
                className="absolute right-0 top-0 -mr-2 -mt-2 inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-300 hover:bg-slate-800/60 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form className="mt-5 space-y-4" onSubmit={handleSignUp}>
              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
                  <UserRound className="h-4 w-4 text-cyan-400" />
                  New Name
                </span>
                <input
                  ref={nameInputRef}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/40"
                  type="text"
                  placeholder="Full name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
                {modalErrors.newName ? <p className="mt-2 text-sm text-rose-400">{modalErrors.newName}</p> : null}
              </label>

              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
                  <LockKeyhole className="h-4 w-4 text-cyan-400" />
                  New Password
                </span>
                <input
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/40"
                  type="password"
                  placeholder="Choose a password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                {modalErrors.newPassword ? <p className="mt-2 text-sm text-rose-400">{modalErrors.newPassword}</p> : null}
              </label>

              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
                  <LockKeyhole className="h-4 w-4 text-cyan-400" />
                  Confirm Password
                </span>
                <input
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/40"
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {modalErrors.confirmPassword ? <p className="mt-2 text-sm text-rose-400">{modalErrors.confirmPassword}</p> : null}
              </label>

              <div className="mt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-2xl px-4 py-2 text-sm text-slate-300 hover:bg-slate-800/50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-2xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App; // Exports the component so it can be rendered.
