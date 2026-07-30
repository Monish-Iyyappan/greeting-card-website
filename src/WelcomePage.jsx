import { ArrowRight, Sparkles } from "lucide-react"; // Imports the icons used on the welcome page.

function WelcomePage({ name, onBack }) { // Starts the welcome page component and receives the user's name and back handler.
  return ( // Begins the JSX returned for the welcome screen.
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4 py-10"> {/*// Opens the full-screen welcome container.*/}
      <div className="w-full max-w-2xl rounded-3xl border border-cyan-900/50 bg-slate-900/80 p-8 shadow-2xl shadow-cyan-950/40 backdrop-blur"> {/*// Opens the large welcome card.*/}
        <div className="mb-6 flex items-center gap-3 text-cyan-400"> {/*// Opens the header row with the icon and label.*/}
          <Sparkles className="h-6 w-6" /> {/*// Shows the sparkle icon for the welcome header.*/}
          <p className="text-sm font-semibold uppercase tracking-[0.35em]">Account opened</p> {/*// Shows the status label for the welcome page.*/}
        </div> {/*// Closes the header row.*/}

        <h1 className="text-3xl font-semibold text-white sm:text-4xl"> {/*// Opens the main welcome heading.*/}
          Welcome back, {name}! {/*// Displays the personalized greeting with the user's name.*/}
        </h1> {/*// Closes the welcome heading.*/}
        <p className="mt-4 text-lg text-slate-400"> {/*// Opens the supporting description paragraph.*/}
          Your sign-in was successful, and this page now opens like a full account landing page. {/*// Explains that the second page is acting like a real account screen.*/}
        </p> {/*// Closes the description paragraph.*/}

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950/70 p-6"> {/*// Opens the content box inside the welcome card.*/}
          <p className="text-sm text-slate-300"> {/*// Opens the inside content paragraph.*/}
            You can use this space to show account details, profile content, or any other page you want after login. {/*// Explains that this area can hold more account information.*/}
          </p> {/*// Closes the inside content paragraph.*/}
        </div> {/*// Closes the content box.*/}

        <button // Opens the back button.
          className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400" // Styles the back button.
          onClick={onBack} // Calls the parent handler when the button is pressed.
          type="button" // Makes the button act as a normal button instead of a submit button.
        > {/*// Opens the button content.*/}
          Go back to sign in {/*// Shows the button label.*/}
          <ArrowRight className="h-4 w-4" /> {/*// Shows the arrow icon on the button.*/}
        </button> {/*// Closes the back button.*/}
      </div> {/*// Closes the welcome card.*/}{/*// Closes the full-screen welcome container.*/}
    </div> 
  ); // Ends the returned JSX block.
}

export default WelcomePage; // Exports the welcome component so it can be used by the app.
{/*now update the sign in page where if the person needs to sign up

design:

have a small button below the continue button
after i click that button it opens a new box in the same page and blurs the sign in page behind
in this new box it should ask new name and new password and confirm */}