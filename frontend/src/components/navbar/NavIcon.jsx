const NavIcon = ({ icon: Icon, path }) => (
    <a className="text-xl hover:text-primary" href={path}>
      <Icon />
    </a>
);
  
export default NavIcon;