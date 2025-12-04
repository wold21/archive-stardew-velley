'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Border from '../wood-border/border';

interface ImageModalProps {
    id: number;
    src: string;
    alt?: string;
    title: string;
    type: 'image' | 'video';
    description?: string;
    onClose: () => void;
}

export default function EditModal({ src, alt, title, type, description, onClose }: ImageModalProps) {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [onClose]);

    return createPortal(
        <div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <div className="relative">
                <Border />
                <div className="bg-box-background p-3 md:p-6">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                        {/* 프리뷰 영역 */}
                        <div className="flex-shrink-0 w-full md:w-48 h-48 bg-white rounded-lg overflow-hidden border-2 border-[rgba(92,64,51,0.3)]">
                            {type === 'image' ? (
                                <img src={src} alt={alt} className="w-full h-full object-cover" />
                            ) : (
                                <video src={src} className="w-full h-full object-cover" controls />
                            )}
                        </div>

                        {/* 메타 정보 입력 영역 */}
                        <div className="flex-1 space-y-1">
                            <div className="flex items-start md:items-center justify-between flex-wrap gap-2">
                                <button
                                    // onClick={(e) => {
                                    //     e.stopPropagation();
                                    //     handleRemoveFile(index);
                                    // }}
                                    className="text-lg md:text-lg hover:scale-110 transition-transform self-start md:self-auto"
                                >
                                    ❌
                                </button>
                            </div>

                            <div>
                                <label className="block font-esamanru font-bold text-[#5c2500] mb-2 text-sm md:text-base">
                                    제목
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    // onChange={(e) => handleMetaChange(index, 'title', e.target.value)}
                                    maxLength={20}
                                    placeholder="제목을 입력하세요 (필수)"
                                    className="w-full placeholder:text-[#8b6f47] bg-transparent px-3 md:px-4 py-2 border-4 border-[rgba(92,64,51,0.3)] font-esamanru text-[#5c2500] text-sm md:text-base focus:outline-none focus:border-[#cc6f04]"
                                />
                            </div>

                            <div>
                                <label className="block font-esamanru font-bold text-[#5c2500] mb-2 text-sm md:text-base">
                                    설명
                                </label>
                                <textarea
                                    value={description}
                                    // onChange={(e) => handleMetaChange(index, 'description', e.target.value)}
                                    placeholder="설명을 입력하세요"
                                    rows={3}
                                    className="w-full placeholder:text-[#8b6f47] bg-transparent px-3 md:px-4 py-2 border-4 border-[rgba(92,64,51,0.3)] font-esamanru text-[#5c2500] text-sm md:text-base resize-none focus:outline-none focus:border-[#cc6f04] transition-colors"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}
