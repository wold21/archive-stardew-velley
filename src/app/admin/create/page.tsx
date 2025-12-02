'use client';
import Border from '@/app/components/wood-border/border';
import { useState } from 'react';

interface FileWithMeta {
    file: File;
    preview: string;
    type: 'image' | 'video';
    title: string;
    description: string;
}

export default function CreatePage() {
    const [files, setFiles] = useState<FileWithMeta[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [loading, setLoading] = useState(false);

    const createFileWithMeta = (file: File): FileWithMeta => {
        const preview = URL.createObjectURL(file);
        const type = file.type.startsWith('image/') ? 'image' : 'video';
        return {
            file,
            preview,
            type,
            title: '',
            description: '',
        };
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            const newFiles = selectedFiles
                .filter((file) => !files.some((f) => f.file.name === file.name))
                .map(createFileWithMeta);
            setFiles([...files, ...newFiles]);
            e.target.value = '';
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files) {
            const droppedFiles = Array.from(e.dataTransfer.files);
            const validFiles = droppedFiles
                .filter((file) => file.type.startsWith('image/') || file.type.startsWith('video/'))
                .filter((file) => !files.some((f) => f.file.name === file.name))
                .map(createFileWithMeta);
            setFiles([...files, ...validFiles]);
        }
    };

    const handleRemoveFile = (index: number) => {
        URL.revokeObjectURL(files[index].preview);
        setFiles(files.filter((_, i) => i !== index));
    };

    const handleMetaChange = (index: number, field: 'title' | 'description', value: string) => {
        const newFiles = [...files];
        newFiles[index][field] = value;
        setFiles(newFiles);
    };

    const handleBoxClick = () => {
        document.getElementById('fileInput')?.click();
    };


    const handleSubmit = async () => {
        const formData = new FormData();
        files.forEach((fileData) => {
            formData.append('file', fileData.file);
            formData.append('titles', fileData.title);
            formData.append('descriptions', fileData.description || '');
        });

        try {
            setLoading(true);
            const response = await fetch (`${process.env.NEXT_PUBLIC_API_BASE_URL}assets`, {
                method: 'POST',
                body: formData,
            });
            console.log('Upload response:', response);
            // 업로드 후 상태 초기화
            if (response.ok) {
                setFiles([]);
                alert('업로드 성공!');
            } else {
                alert('업로드 실패!');
            }
        } catch (error) {
            console.error('Upload failed:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
    <>  
        {loading && (
            <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center'>
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(30)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1.5 h-1.5 bg-white rotate-45 animate-twinkle"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 3}s`,
                                animationDuration: `${2 + Math.random() * 2}s`,
                                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
                            }}
                        />
                    ))}
                </div>
                <div className='font-neodgm font-bold text-white text-2xl animate-pulse'>
                    노예 일상 추가 중...
                </div>
            </div>
        )}
        
        <div className="flex flex-col w-full h-full p-4 md:p-6 gap-6">
            {/* 파일 업로드 영역 */}
            <div className="relative w-full max-w-4xl mx-auto flex-shrink-0">
                <Border />
                <div
                    onClick={handleBoxClick}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`w-full h-32 md:h-40 flex items-center justify-center cursor-pointer bg-box-background transition-all ${
                        isDragging ? 'brightness-110 scale-[1.02]' : ''
                    }`}
                >
                    <div className="text-center font-esamanru font-bold text-[#5c2500] px-4">
                        <p className="text-lg md:text-2xl mb-2">파일을 드래그하거나 클릭하세요</p>
                        <p className="text-xs md:text-sm opacity-70">이미지 / 비디오 파일만 업로드</p>
                        <p className="text-xs md:text-xs opacity-70">@ 100MB 이하 / 최대 100개</p>
                    </div>
                </div>
            </div>

            <input
                id="fileInput"
                type="file"
                multiple
                accept="image/*, video/*"
                onChange={handleFileChange}
                className="hidden"
            />

            {/* 파일 목록 및 메타 정보 입력 - 스크롤 영역 */}
            {files.length > 0 && (
                <div className="flex-1 overflow-y-auto w-full max-w-4xl mx-auto">
                    <div className="space-y-4 md:space-y-6 pr-2">
                        {files.map((fileData, index) => (
                            <div key={index} className="relative">
                                <Border />
                                <div className="bg-box-background p-3 md:p-6">
                                    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                                        {/* 프리뷰 영역 */}
                                        <div className="flex-shrink-0 w-full md:w-48 h-48 bg-white rounded-lg overflow-hidden border-2 border-[rgba(92,64,51,0.3)]">
                                            {fileData.type === 'image' ? (
                                                <img
                                                    src={fileData.preview}
                                                    alt="preview"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <video
                                                    src={fileData.preview}
                                                    className="w-full h-full object-cover"
                                                    controls
                                                />
                                            )}
                                        </div>

                                        {/* 메타 정보 입력 영역 */}
                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-start md:items-center justify-between flex-wrap gap-2">
                                                <div className="flex items-start gap-3 md:gap-5 flex-col md:flex-row">
                                                    <div className='flex items-center'> 
                                                        <span className="text-xs font-esamanru font-bold text-[#5c2500]">
                                                            업로드 타입 : 
                                                        </span>
                                                        <span className="pl-2 text-xs font-esamanru font-bold text-[#5c2500]">
                                                            {fileData.type === 'image' ? '이미지' : '비디오'}
                                                        </span>
                                                    </div>
                                                    <div className='flex items-center'>
                                                        <span className="text-xs font-esamanru font-bold text-[#5c2500]">
                                                            파일명 : 
                                                        </span>
                                                        <span className="pl-2 text-xs font-esamanru text-[#8b6f47] truncate max-w-[200px] md:max-w-xs">
                                                            {fileData.file.name}
                                                        </span>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleRemoveFile(index);
                                                    }}
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
                                                    value={fileData.title}
                                                    onChange={(e) => handleMetaChange(index, 'title', e.target.value)}
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
                                                    value={fileData.description}
                                                    onChange={(e) => handleMetaChange(index, 'description', e.target.value)}
                                                    placeholder="설명을 입력하세요"
                                                    rows={3}
                                                    className="w-full placeholder:text-[#8b6f47] bg-transparent px-3 md:px-4 py-2 border-4 border-[rgba(92,64,51,0.3)] font-esamanru text-[#5c2500] text-sm md:text-base resize-none focus:outline-none focus:border-[#cc6f04] transition-colors"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 전시하기 버튼 */}
            {files.length > 0 && (
                <div onClick={()=> handleSubmit()} className="relative w-full max-w-4xl mx-auto flex-shrink-0">
                    <Border />
                    <button disabled={loading} className="w-full py-4 md:py-5 bg-box-background font-bold font-neodgm text-[#5c2500] text-lg md:text-xl lettering-widest">
                        {loading ? '노예 일상 추가 중...' : `전시하기 (${files.length}개 파일)`}
                    </button>
                </div>
            )}
        </div>
    </>
    );
}
