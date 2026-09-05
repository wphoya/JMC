import React, { useState, useEffect, useRef } from 'react';

export default function ProductManager() {
  // 1. 상태(State) 정의
  const [products, setProducts] = useState([]);
  const [brand, setBrand] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const fileInputRef = useRef(null);

  // 2. 컴포넌트 마운트 시 LocalStorage에서 데이터 불러오기
  useEffect(() => {
    const savedData = localStorage.getItem('react_products');
    if (savedData) {
      setProducts(JSON.parse(savedData));
    }
  }, []);

  // 3. 천 단위 콤마 포맷팅 헬퍼 함수
  const formatPrice = (value) => {
    return Number(value).toLocaleString() + '원';
  };

  // 4. 파일 업로드 시 Base64 인코딩 문자열로 변환
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target.result); // Base64 데이터 저장
    };
    reader.readAsDataURL(file);
  };

  // 5. 상품 등록 이벤트 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!image) {
      alert('이미지가 업로드되지 않았습니다.');
      return;
    }

    const newProduct = {
      id: Date.now(),
      brand,
      title,
      price: parseInt(price, 10),
      image,
      link: 'product_detail_01.html',
    };

    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem('react_products', JSON.stringify(updatedProducts));

    // 폼 입력값 초기화
    setBrand('');
    setTitle('');
    setPrice('');
    setImage('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // 6. 상품 삭제 이벤트 핸들러
  const handleDelete = (id) => {
    if (window.confirm('이 상품을 삭제하시겠습니까?')) {
      const updatedProducts = products.filter((p) => p.id !== id);
      setProducts(updatedProducts);
      localStorage.setItem('react_products', JSON.stringify(updatedProducts));
    }
  };

  return (
    <div className="flex gap-10 p-5 max-w-[1100px] mx-auto bg-[#f9f9f9] min-h-screen font-sans">
      
      {/* SECTION 1: 관리자 등록 폼 */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow-md max-w-[500px] h-fit">
        <h2 className="text-2xl font-bold border-b-2 border-gray-800 pb-2 mb-5 text-gray-800">
          상품 등록 관리자 (React)
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">브랜드명</label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="예: MEDIPEEL"
              className="w-full p-2.5 border border-gray-300 rounded text-sm focus:outline-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">상품명</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 메디필 콜라겐 랩핑 마스크팩"
              className="w-full p-2.5 border border-gray-300 rounded text-sm focus:outline-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">판매 가격 (원)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="예: 29990"
              className="w-full p-2.5 border border-gray-300 rounded text-sm focus:outline-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">상품 이미지 업로드</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              className="w-full p-1 border border-gray-300 rounded text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded font-bold hover:bg-blue-700 transition"
          >
            상품 등록하기
          </button>
        </form>

        {/* 등록된 상품 백오피스 리스트 관리 테이블 */}
        {products.length > 0 && (
          <table className="w-full mt-6 border-collapse text-xs text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border border-gray-200">상품명</th>
                <th className="p-2 border border-gray-200">가격</th>
                <th className="p-2 border border-gray-200">관리</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => (
                <tr key={prod.id}>
                  <td className="p-2 border border-gray-200 max-w-[150px] truncate">
                    <strong>[{prod.brand}]</strong> {prod.title}
                  </td>
                  <td className="p-2 border border-gray-200">{formatPrice(prod.price)}</td>
                  <td className="p-2 border border-gray-200">
                    <button
                      onClick={() => handleDelete(prod.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* SECTION 2: 사용자 화면 (실시간 인덱스) */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow-md max-w-[480px]">
        <h2 className="text-2xl font-bold border-b-2 border-gray-800 pb-2 mb-5 text-gray-800">
          실시간 인덱스 화면
        </h2>

        {products.length === 0 ? (
          <p className="text-gray-400 italic text-center py-8">
            등록된 상품이 없습니다. 상품을 등록해 주세요.
          </p>
        ) : (
          products.map((prod, index) => (
            <React.Fragment key={prod.id}>
              {/* 요청하신 상품 카드 고유 디자인 구조 구현 */}
              <div className="mb-10 border border-gray-100 p-5 max-w-[400px] shadow-sm bg-white rounded">
                <a href={prod.link} className="no-underline text-gray-800 block">
                  <div className="text-center h-[200px] flex items-center justify-center bg-gray-50 rounded overflow-hidden">
                    <img
                      src={prod.image}
                      alt={prod.title}
                      className="max-w-full max-h-full h-auto object-contain"
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg my-1.5 leading-snug font-normal">
                      [{prod.brand}] {prod.title}
                    </h3>
                    <p className="text-xl font-bold text-[#e44d26] my-1.5">
                      {formatPrice(prod.price)}
                    </p>
                  </div>
                </a>
              </div>
              
              {/* 마지막 상품 뒤에는 가로선(<hr>) 배제 로직 */}
              {index < products.length - 1 && (
                <hr className="border-0 h-px bg-gray-300 my-10 max-w-[440px]" />
              )}
            </React.Fragment>
          ))
        )}
      </div>

    </div>
  );
}