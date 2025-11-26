interface CardProps {
    id: number;
    src: string;
}

export default function Card({ id, src }: CardProps) {
    return (
        <div className="break-inside-avoid mb-4">
            <div className="bg-brownwood bg-size-[100%_100%] bg-center p-2 cursor-pointer transition-transform duration-100 rounded-lg hover:brightness-105 group">
                <div className="relative overflow-hidden bg-white border-2 border-[rgba(92,64,51,0.3)] rounded">
                    <img 
                        src={src} 
                        alt={id.toString()}
                        className="w-full h-auto object-cover [image-rendering:pixelated] hover:scale-105 transition-transform duration-200"
                    />
                </div>
                
                {/* <div className="bg-gradient-to-b from-[#e2985f] via-[#f3be6d] to-[#e2985f] p-3 mt-2 border-2 border-[rgba(92,64,51,0.2)]">
                    <h3 className="font-esamanru font-bold text-shadow text-sm mb-2 text-[#5c2500] tracking-wider">
                        {title}
                    </h3>
                    <p className="font-esamanru font-light text-shadow text-xs text-[#8b6f47] leading-relaxed">
                        {description}
                    </p>
                </div> */}
            </div>
        </div>
    );
}
