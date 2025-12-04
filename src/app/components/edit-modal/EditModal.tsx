'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Border from '../wood-border/border';

interface EditModalProps {
    id: number;
    src: string;
    alt?: string;
    title: string;
    type: 'image' | 'video';
    description?: string;
    onClose: () => void;
    onUpdate?: () => void;
}

export default function EditModal({
    id,
    src,
    alt,
    title: initialTitle,
    type,
    description: initialDescription,
    onClose,
    onUpdate,
}: EditModalProps) {
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription || '');
    const [isSaving, setIsSaving] = useState(false);
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

    const handleSave = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!title.trim()) {
            alert('제목을 입력해주세요.');
            return;
        }

        setIsSaving(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}assets/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: title.trim(),
                    description: description.trim(),
                }),
            });

            if (response.ok) {
                onUpdate?.();
                onClose();
            } else {
                alert('수정에 실패했습니다.');
            }
        } catch (error) {
            console.error('Update failed:', error);
            alert('수정 중 오류가 발생했습니다.');
        } finally {
            setIsSaving(false);
        }
    };

    return createPortal(
        <div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <div className="relative" onClick={(e) => e.stopPropagation()}>
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
                        <div className="flex-1 space-y-3">
                            <div className="flex items-center justify-between">
                                <h2 className="font-esamanru font-bold text-[#5c2500] text-lg">수정하기</h2>
                                <button
                                    onClick={onClose}
                                    className="text-xl hover:scale-110 transition-transform sm:pr-3"
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
                                    onChange={(e) => setTitle(e.target.value)}
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
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="설명을 입력하세요"
                                    rows={3}
                                    className="w-full placeholder:text-[#8b6f47] bg-transparent px-3 md:px-4 py-2 border-4 border-[rgba(92,64,51,0.3)] font-esamanru text-[#5c2500] text-sm md:text-base resize-none focus:outline-none focus:border-[#cc6f04] transition-colors"
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    onClick={onClose}
                                    className="px-2 py-2 font-neodgm font-bold text-[#5c2500] hover:brightness-110 transition-all"
                                >
                                    취소
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="px-2 py-2 font-neodgm font-bold text-[#5c2500] hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSaving ? '저장 중...' : '저장'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}
