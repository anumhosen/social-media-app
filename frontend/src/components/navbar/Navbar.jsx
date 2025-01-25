import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import TabletNavbar from "./TabletNavbar";

function Navbar() {
  return (
    <nav className="sticky w-full bg-gray-800 bg-clip-padding  backdrop-blur-lg bg-opacity-40 border-b sm:border-none sm:mb-4 sm:rounded-lg z-50 text-gray-300">
      <DesktopNavbar />
      <TabletNavbar />
      <MobileNavbar />
    </nav>
  );
}
export default Navbar;
