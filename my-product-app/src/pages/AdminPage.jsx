import { useState, useRef } from 'react';

export default function AdminPage() {
  const [products, setProducts] = useState(() => {
    const savedData = localStorage.getItem('react_products');
    return savedData ? JSON.parse(savedData) : [];
  });

  const [brand, setBrand] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const fileInputRef = useRef(null);

  const formatPrice = (value) => {
    return Number(value).toLocaleString() + '원';
  };

  // 💡 비동기로 안전하게 파일을 Base64 문자열로 변환하는 함수
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // 💡 폼 제출 이벤트 핸들러 수정
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. 파일이 실제로 인풋에 담겨있는지 다이렉트로 체크
    const files = fileInputRef.current?.files;
    if (!files || files.length === 0) {
      alert('이미지가 업로드되지 않았습니다. 파일을 선택해 주세요.');
      return;
    }

    try {
      // 2. 등록 버튼을 누른 순간 해당 파일을 즉시 문자열 데이터로 변환
      const base64Image = await convertFileToBase64(files[0]);

      const newProduct = {
        id: Date.now(),
        brand,
        title,
        price: parseInt(price, 10),
        image: base64Image, // 변환 성공한 안전한 이미지 주소 매핑
        description,
        link: '#',
      };

      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);
      localStorage.setItem('react_products', JSON.stringify(updatedProducts));

      // 3. 성공 후 폼 값 깔끔하게 비우기
      setBrand('');
      setTitle('');
      setPrice('');
      setDescription('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      
      alert('상품이 성공적으로 등록되었습니다!');
    } catch (error) {
      console.error(error);
      alert('이미지 처리 중 에러가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('이 상품을 삭제하시겠습니까?')) {
      const updatedProducts = products.filter((p) => p.id !== id);
      setProducts(updatedProducts);
      localStorage.setItem('react_products', JSON.stringify(updatedProducts));
    }
  };

  return (
    <div className="max-w-[500px] mx-auto p-5 bg-white min-h-screen font-sans shadow-sm">
      <h2 className="text-2xl font-bold border-b-2 border-gray-800 pb-2 mb-5 text-gray-800">
        ⚙️ 상품 등록 관리자 시스템
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-600 mb-1">브랜드명</label>
          <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="예: MEDIPEEL" className="w-full p-2.5 border border-gray-300 rounded text-sm focus:outline-blue-500" required />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-600 mb-1">상품명</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="예: 메디필 콜라겐 랩핑 마스크팩" className="w-full p-2.5 border border-gray-300 rounded text-sm focus:outline-blue-500" required />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-600 mb-1">판매 가격 (원)</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="예: 29990" className="w-full p-2.5 border border-gray-300 rounded text-sm focus:outline-blue-500" required />
        </div>
        
        <div>
          <label className="block text-sm font-bold text-gray-600 mb-1">상품 상세 내용 (마우스 오버 시 노출)</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="상품에 대한 핵심 장점이나 상세 설명을 입력하세요." 
            className="w-full p-2.5 border border-gray-300 rounded text-sm focus:outline-blue-500 h-20 resize-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-600 mb-1">상품 이미지 업로드</label>
          {/* 이제 여기서는 onChange로 상태를 미리 바꾸지 않고 인풋 하드웨어가 쥐고만 있게 만듭니다. */}
          <input type="file" accept="image/*" ref={fileInputRef} className="w-full p-1 border border-gray-300 rounded text-sm" required />
        </div>
        <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded font-bold hover:bg-blue-700 transition">
          신규 상품 등록하기
        </button>
      </form>

      {/* 등록 현황 관리 테이블 */}
      {products.length > 0 && (
        <table className="w-full mt-8 border-collapse text-xs text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border border-gray-200">상품명</th>
              <th className="p-2 border border-gray-200">가격</th>
              <th className="p-2 border border-gray-200">관리</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod.id} className="hover:bg-gray-50">
                <td className="p-2 border border-gray-200 max-w-[150px] truncate">
                  <strong>[{prod.brand}]</strong> {prod.title}
                </td>
                <td className="p-2 border border-gray-200">{formatPrice(prod.price)}</td>
                <td className="p-2 border border-gray-200">
                  <button onClick={() => handleDelete(prod.id)} className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}