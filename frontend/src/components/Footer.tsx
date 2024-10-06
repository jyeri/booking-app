export const Footer = () => {
  return (
    <div className="bg-blue-800 py-10">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-white text-3xl tracking-tight font-bold">
          &copy; 2024 BALLDAY.booking
        </span>
        <span className="flex text-white tracking-tight font-bold gap-4">
          <a href="#" className="cursor-pointer hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="cursor-pointer hover:underline">
            Terms of Service
          </a>
        </span>
      </div>
    </div>
  );
};
