import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/HomePage"
import Message from "./components/UI/Message";
import Header from "./components/UI/Header";
import Footer from "./components/UI/Footer";

const App = () => {

  return (
    <div className="bg-dark">
      <Header />
      <Message />
      <HomePage />
      <Footer />
    </div>
  )
}

export default App
