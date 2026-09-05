import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserPage from './pages/UserPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* http://localhost:5173/ -> 사용자 쇼핑몰 화면 */}
        <Route path="/" element={<UserPage />} />
        
        {/* http://localhost:5173/admin -> 관리자 등록 화면 */}
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;