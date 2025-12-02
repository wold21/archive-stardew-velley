'use client';

import { useState } from 'react';
import ImageModal from '../image-modal/ImageModal';
import VideoModal from '../video-modal/videoModal';

interface CardProps {
    id: number;
    thumbnailPath: string;
    filePath: string;
    title: string;
    description?: string;
    fileType: string;
}

export default function Card({ id, thumbnailPath, filePath, title, description, fileType }: CardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const mainPath = `${process.env.NEXT_PUBLIC_ASSET_BASE_URL}/${filePath}`;
    const thumbPath = `${process.env.NEXT_PUBLIC_ASSET_BASE_URL}/${thumbnailPath}`;
    console.log('Card Rendered:', { id, thumbnailPath, filePath, title, description, fileType });
    return (
        <>
            {isModalOpen &&  (
                fileType === 'image' ?(
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
            <div key={id} className="break-inside-avoid mb-4">
                <div 
                onClick={() => setIsModalOpen(true)}
                className="bg-brownwood bg-size-[100%_100%] bg-center p-2 cursor-pointer transition-transform duration-100 rounded-lg hover:brightness-105 group">
                    <div className="relative overflow-hidden bg-white border-2 border-[rgba(92,64,51,0.3)] rounded">
                        <img 
                            src={thumbPath}
                            alt={title}
                            className="w-full h-auto object-cover [image-rendering:pixelated] hover:scale-110 transition-transform duration-200"
                        />
                    </div>
                    
                    <div className="bg-gradient-to-b from-[#e2985f] via-[#f3be6d] to-[#e2985f] p-3 mt-2 border-2 border-[rgba(92,64,51,0.2)]">
                        <h3 className="font-esamanru font-bold text-shadow text-sm mb-2 text-[#5c2500] tracking-wider">
                            {title}
                        </h3>
                        {description && (
                            <p className="font-esamanru font-light text-shadow text-xs text-[#8b6f47] leading-relaxed whitespace-pre-wrap break-words line-clamp-[10]">
                                {description}
                            </p>
                        )}
                        
                    </div>
                </div>
            </div>
        </>
    );
}
