import { Outlet, Link } from "react-router-dom";

export default function Root() {
  return (
    <>
      <header>
        <nav className="max-w-screen-sm mx-auto px-4 py-4">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <Link to="/" className="text-2xl font-bold">
              Contactable
            </Link>
            <div className="flex gap-4 items-center justify-end flex-grow">
              <Link to="/favorites" className="hover:text-indigo-600">
                Favorites
              </Link>
              <Link
                to="/new"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-600/90 flex-shrink-0"
              >
                New Contact
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-screen-sm mx-auto px-4 py-8">
        <Outlet />
      </main>
    </>
  );
}
