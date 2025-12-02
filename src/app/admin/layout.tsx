'use client';

import Link from 'next/link';
import { useState } from 'react';
import Border from '../components/wood-border/border';
import { redirect } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <>
            <div onClick={() => redirect("/")} className='absolute bottom-5 right-5 w-10 h-10 bg-black opacity-50 rounded-full flex items-center justify-center cursor-pointer hover:opacity-70 transition-opacity z-50'>
                <span className='text-white text-2xl'>⚙️</span>
            </div>
            <div className="flex h-screen bg-forest bg-cover bg-center">
                {!isMenuOpen && (
                    <button
                        className="fixed top-3 left-3 z-50 lg:hidden text-white p-2 rounded text-4xl"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        🍄
                    </button>
                )}

                <aside
                    className={`
                        text-white
                        sm:w-40 md:w-48 lg:w-64
                        sm:fixed md:fixed lg:static h-full z-40
                        transition-transform duration-300
                        bg-brownwood bg-size-[100%_100%] bg-center
                        relative
                        after:absolute after:top-0 after:right-0 after:w-2 after:h-full
                        after:bg-gradient-to-r after:from-[#8a3a06] after:to-[#cc6f04]
                        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                    `}
                >
                    <div className="flex items-center justify-evenly mt-5 mb-10">
                        <h1 className="font-bold text-center p-2 font-neodgm text-[#351b05] text-shadow-sm sm:text-base md:text-xl lg:text-3xl lg:tracking-widest">농장주페이지</h1>
                        <button className="z-50 lg:hidden p-2 rounded sm:text-2xl md:text-3xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            🍄
                        </button>
                    </div>
                    <nav className='flex flex-col items-center gap-2 w-full text-[#382128] text-center font-neodgm font-medium text-shadow-sm sm:text-xs md:text-sm lg:text-base'>
                        <Link href="/admin/list" className="relative w-5/6 p-2 bg-box-background group">
                            <div className="opacity-0 group-hover:opacity-100">
                                <Border/>
                            </div>
                            <span>노예들의 일상 모아보기</span>
                        </Link>
                        <Link href="/admin/create" className="relative w-5/6 p-2 bg-box-background group">
                            <div className="opacity-0 group-hover:opacity-100">
                                <Border/>
                            </div>
                            <span>노예 일상 등록하기</span>
                        </Link>
                    </nav>
                </aside>
                {isMenuOpen && (
                    <div onClick={() => setIsMenuOpen(false)} className="fixed inset-0 bg-black/70 z-30 lg:hidden"></div>
                )}
                <main className="flex-1 overflow-auto lg:ml-0">{children}</main>
            </div>
        </>
    );
}
