export default function Border() {
    return (
        <>
            {/* 상단 테두리 */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#8a3a06] to-[#cc6f04]"></div>
            {/* 하단 테두리 */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#8a3a06] to-[#cc6f04]"></div>
            {/* 좌측 테두리 */}
            <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-[#8a3a06] to-[#cc6f04]"></div>
            {/* 우측 테두리 */}
            <div className="absolute top-0 right-0 bottom-0 w-1.5 bg-gradient-to-b from-[#8a3a06] to-[#cc6f04]"></div>
        </>
    );
}