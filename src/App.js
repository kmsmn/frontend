import { Route, Routes } from 'react-router-dom';
import Day from './components/Day';
import AddDay from './components/AddDay';
import AddWord from './components/AddWord';
import ErrorDisplay from './components/ErrorDisplay';
import ChangeRem from './components/ChangeRem';
import EmptyPage from './components/EmptyPage';
import Header from './components/Header';
import Days from './components/Days';
import Modal from 'react-modal/lib/components/Modal';

Modal.setAppElement('#root');
export default function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Days />} />
        <Route path='day/:dayNum' element={<Day />} />
        <Route path='add-day' element={<AddDay />} />
        <Route path='add-word' element={<AddWord />} />
        <Route path='change-rem' element={<ChangeRem />} />
        <Route path='error' element={<ErrorDisplay />} />
        <Route path='*' element={<EmptyPage />} />
      </Routes>
    </div>
  );
}
