import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

export default function NavItem(props) {
  const { link, name } = props;
  const className = props.className || "";
  return (
    <Nav.Link>
      <Link to={link} className={className}>
        {name}
      </Link>
    </Nav.Link>
  );
}
