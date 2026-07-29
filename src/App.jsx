import { useState } from "react"; // Load state for form values.
import { LockKeyhole, UserRound } from "lucide-react"; // Load icons for the form.
function App() { // Start the homepage component.
  const [name, setName] = useState(""); // Hold the entered name.
  const [password, setPassword] = useState(""); // Hold the entered password.
  return ( // Return JSX for the page.
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4 py-10"> // Full-screen card layout.
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-cyan-950/40 backdrop-blur"> // Main form card.
        <div className="mb-8 text-center"> // Header wrapper.
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.35em] text-cyan-400"> // Small badge text.
            Welcome
          </p>
          <h1 className="text-3xl font-semibold text-white"> // Main title.
            Sign in to continue
          </h1>
          <p className="mt-3 text-sm text-slate-400"> // Supporting text.
            Enter your details below to open your account.
          </p>
        </div>
        <form className="space-y-5"> // Form container.
          <label className="block"> // Name input wrapper.
            <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300"> // Label row.
              <UserRound className="h-4 w-4 text-cyan-400" /> // Name icon.
              Name
            </span>
            <input // Name field.
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/40" // Input styling.
              type="text" // Text entry.
              placeholder="Your name" // Hint text.
              value={name} // Bind value to state.
              onChange={(event) => setName(event.target.value)} // Update name on input.
            />
          </label>
          <label className="block"> // Password input wrapper.
            <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300"> // Label row.
              <LockKeyhole className="h-4 w-4 text-cyan-400" /> // Password icon.
              Password
            </span>
            <input // Password field.
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/40" // Input styling.
              type="password" // Hide password.
              placeholder="Your password" // Hint text.
              value={password} // Bind value to state.
              onChange={(event) => setPassword(event.target.value)} // Update password on input.
            />
          </label>
          <button // Login button.
            className="w-full rounded-2xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400" // Button styling.
            type="submit" // Submit form.
          >
            Continue // Button label.
          </button>
        </form>
      </div>
    </div>
  );
}
export default App; // Export the component for Vite.
