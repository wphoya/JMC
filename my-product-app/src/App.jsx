import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserPage from './pages/UserPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    /* 💡 핵심: 깃허브 배포 주소의 하위 경로명을 basename으로 명시해 줍니다. */
    <BrowserRouter basename="/JMC/my-product-app">
      <Routes>
        <Route path="/" element={<UserPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;