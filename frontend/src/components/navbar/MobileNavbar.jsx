import MobileMenu from "./MobileMenu";

const MobileNavbar = () => {
  return (
    <div className="flex sm:hidden items-center justify-between px-4 py-1">
      <h1 className="text-lg font-bold">SocialMedia</h1>
      <MobileMenu />
    </div>
  );
};

export default MobileNavbar;
