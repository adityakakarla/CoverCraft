import Link from "next/link";

const links = [
    {name: 'About', path: '/about'},
    {name: 'Dashboard', path: '/dashboard'},
    {name: 'Sign In', path: '/sign-in'}
]

export default function Navbar() {
  return (
    <nav>
      <ul className="flex justify-between items-center py-8 bg-sky-50 fixed top-0 left-0 w-full z-50 text-slate-800 text-xl px-10">
        <div className="flex">
          <li>
            <Link
              href="/"
              className="hover:text-sky-600 transition duration-300 font-bold"
            >
              Home
            </Link>
          </li>
        </div>
        <div className="flex gap-12">
            {links.map((link) => (
                <Link href={link.path} className="hover:text-sky-600 transition duration-300 font-semibold cursor-pointer" key={link.name}>{link.name}</Link>
            ))}
        </div>
      </ul>
    </nav>
  );
}
