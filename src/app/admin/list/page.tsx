export default function ListPage() {
    const items = [
        { id: 1, title: 'Item 1', description: 'Description 1', image: 'https://as1.ftcdn.net/jpg/05/50/28/64/1000_F_550286408_ZAX7EMAnK9aEXNEFusUkc9ph6pheee9h.jpg' },
        { id: 2, title: 'Item 2', description: 'Description 2', image: 'https://as2.ftcdn.net/jpg/17/86/94/45/1000_F_1786944572_SAO7MBzegnwuwX2HlSjJQFdJQc8LGAGO.jpg' },
        { id: 3, title: 'Item 3', description: 'Description 3', image: 'https://as1.ftcdn.net/v2/jpg/15/22/81/88/1000_F_1522818836_xGuRM5mUKilq15glc4jRkYQTiV453iOz.jpg' },
        { id: 4, title: 'Item 4', description: 'Description 4', image: 'https://as1.ftcdn.net/v2/jpg/15/22/81/88/1000_F_1522818807_DnD1qmYqwCjqiKJe608iYQhMgr7h2bfU.jpg' },
        { id: 5, title: 'Item 5', description: 'Description 5', image: 'https://t3.ftcdn.net/jpg/15/22/81/86/240_F_1522818615_qba7JU6W93a6HkgsqdZQEl2Nez77ETxE.jpg' },
        { id: 6, title: 'Item 1', description: 'Description 1', image: 'https://as1.ftcdn.net/jpg/05/50/28/64/1000_F_550286408_ZAX7EMAnK9aEXNEFusUkc9ph6pheee9h.jpg' },
        { id: 7, title: 'Item 2', description: 'Description 2', image: 'https://as2.ftcdn.net/jpg/17/86/94/45/1000_F_1786944572_SAO7MBzegnwuwX2HlSjJQFdJQc8LGAGO.jpg' },
        { id: 8, title: 'Item 3', description: 'Description 3', image: 'https://as1.ftcdn.net/v2/jpg/15/22/81/88/1000_F_1522818836_xGuRM5mUKilq15glc4jRkYQTiV453iOz.jpg' },
        { id: 9, title: 'Item 4', description: 'Description 4', image: 'https://as1.ftcdn.net/v2/jpg/15/22/81/88/1000_F_1522818807_DnD1qmYqwCjqiKJe608iYQhMgr7h2bfU.jpg' },
        { id: 10, title: 'Item 5', description: 'Description 5', image: 'https://t3.ftcdn.net/jpg/15/22/81/86/240_F_1522818615_qba7JU6W93a6HkgsqdZQEl2Nez77ETxE.jpg' },
        { id: 11, title: 'Item 1', description: 'Description 1', image: 'https://as1.ftcdn.net/jpg/05/50/28/64/1000_F_550286408_ZAX7EMAnK9aEXNEFusUkc9ph6pheee9h.jpg' },
        { id: 12, title: 'Item 2', description: 'Description 2', image: 'https://as2.ftcdn.net/jpg/17/86/94/45/1000_F_1786944572_SAO7MBzegnwuwX2HlSjJQFdJQc8LGAGO.jpg' },
        { id: 13, title: 'Item 3', description: 'Description 3', image: 'https://as1.ftcdn.net/v2/jpg/15/22/81/88/1000_F_1522818836_xGuRM5mUKilq15glc4jRkYQTiV453iOz.jpg' },
        { id: 14, title: 'Item 4', description: 'Description 4', image: 'https://as1.ftcdn.net/v2/jpg/15/22/81/88/1000_F_1522818807_DnD1qmYqwCjqiKJe608iYQhMgr7h2bfU.jpg' },
        { id: 15, title: 'Item 5', description: 'Description 5', image: 'https://t3.ftcdn.net/jpg/15/22/81/86/240_F_1522818615_qba7JU6W93a6HkgsqdZQEl2Nez77ETxE.jpg' },
        { id: 16, title: 'Item 1', description: 'Description 1', image: 'https://as1.ftcdn.net/jpg/05/50/28/64/1000_F_550286408_ZAX7EMAnK9aEXNEFusUkc9ph6pheee9h.jpg' },
        { id: 17, title: 'Item 2', description: 'Description 2', image: 'https://as2.ftcdn.net/jpg/17/86/94/45/1000_F_1786944572_SAO7MBzegnwuwX2HlSjJQFdJQc8LGAGO.jpg' },
        { id: 18, title: 'Item 3', description: 'Description 3', image: 'https://as1.ftcdn.net/v2/jpg/15/22/81/88/1000_F_1522818836_xGuRM5mUKilq15glc4jRkYQTiV453iOz.jpg' },
        { id: 19, title: 'Item 4', description: 'Description 4', image: 'https://as1.ftcdn.net/v2/jpg/15/22/81/88/1000_F_1522818807_DnD1qmYqwCjqiKJe608iYQhMgr7h2bfU.jpg' },
        { id: 20, title: 'Item 5', description: 'Description 5', image: 'https://t3.ftcdn.net/jpg/15/22/81/86/240_F_1522818615_qba7JU6W93a6HkgsqdZQEl2Nez77ETxE.jpg' },
        { id: 21, title: 'Item 1', description: 'Description 1', image: 'https://as1.ftcdn.net/jpg/05/50/28/64/1000_F_550286408_ZAX7EMAnK9aEXNEFusUkc9ph6pheee9h.jpg' },
        { id: 22, title: 'Item 2', description: 'Description 2', image: 'https://as2.ftcdn.net/jpg/17/86/94/45/1000_F_1786944572_SAO7MBzegnwuwX2HlSjJQFdJQc8LGAGO.jpg' },
        { id: 23, title: 'Item 3', description: 'Description 3', image: 'https://as1.ftcdn.net/v2/jpg/15/22/81/88/1000_F_1522818836_xGuRM5mUKilq15glc4jRkYQTiV453iOz.jpg' },
        { id: 24, title: 'Item 4', description: 'Description 4', image: 'https://as1.ftcdn.net/v2/jpg/15/22/81/88/1000_F_1522818807_DnD1qmYqwCjqiKJe608iYQhMgr7h2bfU.jpg' },
        { id: 25, title: 'Item 5', description: 'Description 5', image: 'https://t3.ftcdn.net/jpg/15/22/81/86/240_F_1522818615_qba7JU6W93a6HkgsqdZQEl2Nez77ETxE.jpg' },
        { id: 26, title: 'Item 1', description: 'Description 1', image: 'https://as1.ftcdn.net/jpg/05/50/28/64/1000_F_550286408_ZAX7EMAnK9aEXNEFusUkc9ph6pheee9h.jpg' },
        { id: 27, title: 'Item 2', description: 'Description 2', image: 'https://as2.ftcdn.net/jpg/17/86/94/45/1000_F_1786944572_SAO7MBzegnwuwX2HlSjJQFdJQc8LGAGO.jpg' },
        { id: 28, title: 'Item 3', description: 'Description 3', image: 'https://as1.ftcdn.net/v2/jpg/15/22/81/88/1000_F_1522818836_xGuRM5mUKilq15glc4jRkYQTiV453iOz.jpg' },
        { id: 29, title: 'Item 4', description: 'Description 4', image: 'https://as1.ftcdn.net/v2/jpg/15/22/81/88/1000_F_1522818807_DnD1qmYqwCjqiKJe608iYQhMgr7h2bfU.jpg' },
        { id: 30, title: 'Item 5', description: 'Description 5', image: 'https://t3.ftcdn.net/jpg/15/22/81/86/240_F_1522818615_qba7JU6W93a6HkgsqdZQEl2Nez77ETxE.jpg' },
    ];
    
    return (
        <div className="container mx-auto p-6">
            <div className="columns-2 md:columns-3 lg:columns-5 gap-4 space-y-4">
                {items.map(item => (
                    <div key={item.id} className="break-inside-avoid mb-4">
                        <div className="bg-brownwood bg-size-[100%_100%] bg-center p-2 cursor-pointer transition-transform duration-100 rounded-lg hover:brightness-105 group">
                            <div className="relative overflow-hidden bg-white border-2 border-[rgba(92,64,51,0.3)] rounded">
                                <img 
                                    src={item.image} 
                                    alt={item.title}
                                    className="w-full h-auto object-cover [image-rendering:pixelated] hover:scale-105 transition-transform duration-200"
                                />
                            </div>
                            
                            <div className="bg-gradient-to-b from-[#e2985f] via-[#f3be6d] to-[#e2985f] p-3 mt-2 border-2 border-[rgba(92,64,51,0.2)]">
                                <h3 className="font-esamanru font-bold text-shadow text-sm mb-2 text-[#5c2500] tracking-wider">
                                    {item.title}
                                </h3>
                                <p className="font-esamanru font-light text-shadow text-xs text-[#8b6f47] leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
