import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/HomePage'
import Message from './components/UI/Message';
import Header from './components/UI/Header';

const App = () => {

  return (
    <>
      <Header />
      <Message />
      <HomePage />
    </>
  )
}

export default App
