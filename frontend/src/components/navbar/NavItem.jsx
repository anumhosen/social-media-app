const NavItem = ({ icon: Icon, label, path }) => (
  <a className="flex items-center gap-2 text-lg hover:text-primary" href={path}>
    <Icon className="text-xl" />
    <span>{label}</span>
  </a>
);

export default NavItem;
