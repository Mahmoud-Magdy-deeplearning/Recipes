import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/navBar";
import Footer from "./components/footer";
import Content from "./pages/content";
import "./styles/appStyle.sass";

function App() {
  return (
    <Router>
      <div className="layout">
        <NavBar />
        <Content />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
