import Navbar from "react-bootstrap/Navbar";
import { Container} from "react-bootstrap";
import NavItem from "./navItem"

function NavBar() {
    return (
            <Navbar bg="dark" variant="dark" fixed="top">
                <Container>
                    <Navbar.Brand className="NavBrand">Mahmoud Magdy Recipes</Navbar.Brand>
                    <NavItem name="All Recipies" link='/' className='navItem'/>
                    <NavItem name="Add Recipe" link='/addRecipe' className='navItem'/>
                </Container>
            </Navbar>
    );
}

export default NavBar;
