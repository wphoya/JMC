import { HashRouter, Routes, Route } from 'react-router-dom';
import UserPage from './pages/UserPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* 주소창 매핑 다중 예외 처리 */}
        <Route path="/" element={<UserPage />} />
        {/* 💡 혹시라도 경로가 밀려 들어오는 경우를 대비한 안전 장치 */}
        <Route path="*" element={<UserPage />} /> 
        
        {/* 관리자 페이지 진입 경로 */}
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;