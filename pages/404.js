import Link from 'next/link';
import { Button } from '@/components/ui/button'; // Assuming you're using a custom button from Shadcn or your own UI

export default function Custom404() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-black to-gray-900 text-center px-4 text-white">
      {/* Background of stars */}
      <div className="absolute inset-0 bg-stars bg-cover bg-center opacity-40"></div>

      {/* Main content */}
      <h1 className="text-8xl font-bold text-purple-500 relative z-10">404</h1>
      <p className="mt-4 text-3xl font-semibold text-blue-300 relative z-10">
        Oops! You're lost in space.
      </p>
      <p className="mt-2 text-lg text-gray-400 relative z-10">
        The page you're looking for might have drifted away into a black hole.
      </p>

      {/* Button */}
      <div className="mt-6 relative z-10">
        <Link href="/">
          <Button className="bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition-all px-6 py-3 rounded-lg text-lg">
            Navigate Back to Earth
          </Button>
        </Link>
      </div>


    </div>
  );
}
