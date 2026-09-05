import { useState } from 'react';

export default function UserPage() {
  const [products] = useState(() => {
    const savedData = localStorage.getItem('react_products');
    return savedData ? JSON.parse(savedData) : [];
  });

  const formatPrice = (value) => {
    return Number(value).toLocaleString() + '원';
  };

  return (
    /* ml-0과 max-w-7xl 설정을 주어 전체 쇼핑몰 판형을 완벽한 왼쪽 기준으로 배치합니다. */
    <div className="w-full max-w-7xl ml-0 p-5 bg-white min-h-screen font-sans">
      <h2 className="text-2xl font-bold border-b-2 border-gray-800 pb-4 mb-8 text-gray-800 text-left pl-2">
        🛍️ 마스크팩 전문 쇼핑몰
      </h2>

      {products.length === 0 ? (
        <p className="text-gray-400 italic text-left pl-2 py-12">
          현재 등록된 상품이 없습니다.
        </p>
      ) : (
        /* 💡 핵심 변경: 가로 3개씩 배치하고, 4개째부터 자동으로 아랫줄로 넘겨주는 유연한 그리드 배치 */
        /* grid-cols-1(기본 모바일 1열) -> md:grid-cols-3(PC 화면에서 3열)로 설정하여 화면 크기에 따라 완벽한 3분할을 유지하며 아랫줄로 자동 래핑(줄바꿈)됩니다. */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-6 justify-items-start">
          {products.map((prod) => (
            <div 
              key={prod.id} 
              className="group border border-gray-100 p-4 w-full max-w-[360px] shadow-sm bg-white rounded-lg hover:shadow-md transition-all duration-200"
            >
              <a href={prod.link || "#"} className="no-underline text-gray-800 block">
                
                {/* 1:1 고정 비율 이미지 영역 */}
                <div className="w-full aspect-square bg-gray-50 rounded-md overflow-hidden relative">
                  <img
                    width="120"
                    height="150"
                    src={prod.image}
                    alt={prod.title}
                    className="w-full h-full object-cover absolute top-0 left-0 transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* 마우스 호버 시 상세 내용 노출 */}
                  <div className="absolute inset-0 bg-black/75 flex items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
                    <div className="text-white text-center">
                      <p className="text-xs uppercase tracking-wider font-bold text-blue-400 mb-1">Product Info</p>
                      <p className="text-sm leading-relaxed overflow-y-auto max-h-[160px] break-all">
                        {prod.description || '등록된 상세 내용이 없습니다.'}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* 상품명 및 가격 영역 */}
                <div className="mt-4">
                  <h3 className="text-base my-1.5 leading-snug font-normal min-h-[48px] line-clamp-2 text-gray-800">
                    [{prod.brand}] {prod.title}
                  </h3>
                  <p className="text-lg font-bold text-[#e44d26] my-1.5">
                    {formatPrice(prod.price)}
                  </p>
                </div>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}