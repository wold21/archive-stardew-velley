'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import ImageModal from '../image-modal/ImageModal';
import VideoModal from '../video-modal/videoModal';
import EditModal from '../edit-modal/EditModal';
import Border from '../wood-border/border';

interface CardProps {
    id: number;
    thumbnailPath: string;
    filePath: string;
    title: string;
    description?: string;
    fileType: string;
    onUpdate?: () => void;
}

export default function Card({ id, thumbnailPath, filePath, title, description, fileType, onUpdate }: CardProps) {
    const pathname = usePathname();
    const isAdmin = pathname.includes('/admin');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const mainPath = `${process.env.NEXT_PUBLIC_ASSET_BASE_URL}/${filePath}`;
    const thumbPath = `${process.env.NEXT_PUBLIC_ASSET_BASE_URL}/${thumbnailPath}`;
    console.log('Card Rendered:', { id, thumbnailPath, filePath, title, description, fileType });

    // 메뉴 외부 클릭 시 닫기
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMenuOpen]);

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsMenuOpen(false);
        setIsEditModalOpen(true);
    };

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!confirm('노예의 삭제된 기억은 다시 돌아올 수 없슴...')) return;

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}assets/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                onUpdate?.();
            } else {
                alert('삭제에 실패했습니다.');
            }
        } catch (error) {
            console.error('Delete failed:', error);
            alert('삭제 중 오류가 발생했습니다.');
        }
        setIsMenuOpen(false);
    };
    return (
        <>
            {isModalOpen &&
                (fileType === 'image' ? (
                    <ImageModal
                        src={mainPath}
                        alt={`${title}`}
                        title={title}
                        description={description}
                        onClose={() => setIsModalOpen(false)}
                    />
                ) : (
                    <VideoModal
                        src={mainPath}
                        title={title}
                        description={description}
                        onClose={() => setIsModalOpen(false)}
                    />
                ))}
            {isEditModalOpen && (
                <EditModal
                    id={id}
                    src={mainPath}
                    alt={title}
                    title={title}
                    type={fileType as 'image' | 'video'}
                    description={description}
                    onClose={() => setIsEditModalOpen(false)}
                    onUpdate={onUpdate}
                />
            )}
            <div key={id} className="break-inside-avoid mb-4">
                <div className="relative bg-brownwood bg-size-[100%_100%] bg-center p-2 transition-transform duration-100 rounded-lg hover:brightness-105 group">
                    {/* 케밥 메뉴 버튼 */}
                    {isAdmin && (
                        <div ref={menuRef} className="absolute top-3.5 right-4 z-10">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsMenuOpen(!isMenuOpen);
                                }}
                                className="w-5 h-5 lg:w-7 lg:h-7 flex items-center justify-center bg-gray-600 opacity-50 rounded-full shadow-lg hover:opacity-80 transition-colors"
                            >
                                <span className="text-white text-base font-bold">⋮</span>
                            </button>

                            {/* 드롭다운 메뉴 */}
                            {isMenuOpen && (
                                <div className="absolute xs:text-xs md:text-base top-10 right-0 bg-gradient-to-b from-[#e2985f] via-[#f3be6d] to-[#e2985f] shadow-xl overflow-hidden min-w-[100px]">
                                    <div className="relative">
                                        <Border />
                                        <button
                                            onClick={handleEdit}
                                            className="w-full pl-5 pt-4 pb-3 text-left font-esamanru text-[#5c2500] hover:bg-[rgba(92,64,51,0.1)] transition-colors"
                                        >
                                            <span>수정</span>
                                        </button>
                                        <button
                                            onClick={handleDelete}
                                            className="w-full pl-5 pt-3.5 pb-3 text-left font-esamanru text-[#5c2500] hover:bg-[rgba(92,64,51,0.1)] transition-colors"
                                        >
                                            <span>삭제</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <div onClick={() => setIsModalOpen(true)} className="cursor-pointer">
                        <div className="relative overflow-hidden bg-white border-2 border-[rgba(92,64,51,0.3)] rounded">
                            <img
                                src={thumbPath}
                                alt={title}
                                className="w-full h-auto object-cover [image-rendering:pixelated] hover:scale-110 transition-transform duration-200"
                            />
                        </div>

                        <div className="bg-gradient-to-b from-[#e2985f] via-[#f3be6d] to-[#e2985f] p-3 mt-2 border-2 border-[rgba(92,64,51,0.2)]">
                            <h3 className="font-neodgm font-bold text-shadow text-sm text-[#5c2500] tracking-wider">
                                {title}
                            </h3>
                            {description && (
                                <p className="font-neodgm font-light text-shadow text-xs mt-2 text-[#8b6f47] leading-relaxed whitespace-pre-wrap break-words line-clamp-[10]">
                                    {description}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
