'use client';
import Border from '@/app/components/wood-border/border';
import { useState } from 'react';

export default function CreatePage() {
    const [files, setFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            files.map((file) => {
                if (file.name === selectedFiles[0].name) {
                    return;
                }
            })
            setFiles([...files, ...selectedFiles]);
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
            // 이미지와 비디오만 필터링
            const validFiles = droppedFiles
            .filter((file) => file.type.startsWith('image/') || file.type.startsWith('video/'))
            .filter((file) => !files.some((existingFile) => existingFile.name === file.name));
            setFiles([...files, ...validFiles]);
        }
    };

    const handleRemoveFile = (index: number) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    const handleBoxClick = () => {
        document.getElementById('fileInput')?.click();
    };
    return (
        <div className="p-0 flex flex-col items-center justify-center w-full h-full">
            <div className="relative w-2/3 h-64">
                <Border/>
                <div
                    onClick={handleBoxClick}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className="w-full h-full gap-5 items-center justify-center text-white text-lg lg:text-2xl cursor-pointer p-5 bg-box-background"
                >
                    <div className="flex flex-col gap-3 w-full h-full font-bold text-lg font-esamanru text-[#5c2500]">
                        {files.length > 0 ? (
                        <div className="overflow-scroll overflow-x-hidden pl-3">
                            {files.map((file, index) => (
                                <div className="flex items-center justify-between font-esamanru text-[#5c2500] mb-1" key={index}>
                                    <span>
                                        {file.name} ({file.type.startsWith('image/') ? '이미지' : '비디오'})
                                    </span>
                            <button
                                onClick={() => handleRemoveFile(index)}
                                className="text-red-500 hover:text-red-900 text-xl cursor-pointer"
                            >
                                ❌
                            </button>
                            </div>
                            ))}
                        </div>
                        ) : (
                            <span>파일 던지거나 클릭해 등록하세요!</span>
                        )}
                        
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
            <div className='relative mt-5'>
                <Border/>
                <button className='px-8 py-5 bg-box-background font-bold font-esamanru text-[#5c2500]'>전시하기</button>
            </div>
        </div>
    );
}
