'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Asset } from '@/types/asset';
import AdminCard from '@/app/components/card/Card';
import { ApiResponse } from '@/types/common';
import Masonry from 'react-masonry-css';
import Card from '@/app/components/card/Card';

export default function ListPage() {
    const [items, setItems] = useState<Asset[]>([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const loadMoreRef = useRef<HTMLDivElement>(null);
    const isInitialMount = useRef(true);

    const LIMIT = 50;

    const fetchAssets = useCallback(
        async (currentOffset: number) => {
            if (loading) return;

            setLoading(true);
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}assets?offset=${currentOffset}&limit=${LIMIT}`
                );
                const result: ApiResponse = await response.json();
                if (result.data.items.length === 0) {
                    setHasMore(false);
                } else {
                    setItems((prev) => [...prev, ...result.data.items]);
                    setOffset(currentOffset + LIMIT);
                }
            } catch (error) {
                console.error('Failed to fetch assets:', error);
            } finally {
                setLoading(false);
            }
        },
        [loading]
    );

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            fetchAssets(0);
        }
    }, [fetchAssets]);

    useEffect(() => {
        if (!loadMoreRef.current || !hasMore) return;

        observerRef.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loading && hasMore) {
                    fetchAssets(offset);
                }
            },
            { threshold: 0.1 }
        );

        observerRef.current.observe(loadMoreRef.current);

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [offset, loading, hasMore, fetchAssets]);

    return (
        <div className="container mx-auto p-6">
            {items.length === 0 && !loading && (
                <div className="w-full py-8 flex justify-center items-center">
                    <div className="font-esamanru font-bold text-[#8b6f47] text-lg">
                        노예들의 일상이 아직 하나도 없어요.
                    </div>
                </div>
            )}
            <Masonry
                breakpointCols={{
                    default: 5,
                    1024: 3,
                    768: 2,
                }}
                className="flex -ml-6 w-auto"
                columnClassName="pl-6 bg-clip-padding"
            >
                {items.map((item) => (
                    <Card
                        key={item.id}
                        id={item.id}
                        thumbnailPath={item.thumbnailPath}
                        filePath={item.filePath}
                        title={item.title}
                        description={item.description}
                        fileType={item.fileType}
                    />
                ))}
                {/* 로딩 스켈레톤 */}
                {loading &&
                    [...Array(LIMIT)].map((_, i) => (
                        <div
                            key={`skeleton-${i}`}
                            className="break-inside-avoid mb-4 animate-[fadeIn_0.5s_ease-in-out]"
                        >
                            <div className="bg-brownwood bg-size-[100%_100%] bg-center p-2 rounded-lg">
                                <div className="relative overflow-hidden border-2 border-[rgba(92,64,51,0.3)] rounded h-48 bg-gray-400 animate-pulse"></div>
                                <div className="bg-gradient-to-b from-[#e2985f] via-[#f3be6d] to-[#e2985f] p-3 mt-2 border-2 border-[rgba(92,64,51,0.2)]">
                                    <div className="h-4 bg-gray-400 rounded animate-pulse mb-2"></div>
                                    <div className="h-3 bg-gray-400 rounded animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    ))}
            </Masonry>

            {/* 무한 스크롤 트리거 */}
            <div ref={loadMoreRef} className="w-full py-8 flex justify-center">
                {loading && <div className="font-neodgm font-bold text-[#8b6f47] text-lg">착취 로딩 중...</div>}
                {!hasMore && items.length > 0 && (
                    <div className="font-esamanru font-bold text-[#e3af66] text-lg">
                        착취 내음 가득한 노예들의 일상을 더 추가해 주세요.
                    </div>
                )}
            </div>
        </div>
    );
}
