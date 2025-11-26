'use client';

import { redirect } from 'next/navigation';
import Card from './components/card/Card';
import playImages from './images';

export default function Home() {
    return (
        <>
            <div onClick={() => redirect("/admin")} className='absolute bottom-5 right-5 w-10 h-10 bg-black opacity-50 rounded-full flex items-center justify-center cursor-pointer hover:opacity-70 transition-opacity z-50'>
                <span className='text-white text-2xl'>⚙️</span>
            </div>
            <div className="h-screen bg-forest bg-cover bg-center bg-fixed overflow-y-auto">
                <div className="mx-auto p-6">
                    <div className="columns-2 md:columns-3 lg:columns-5 gap-4 space-y-4">
                        {playImages.map(item => (
                            <Card key={item.id} id={item.id} src={item.src} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
