import React, { useState, useEffect } from 'react';

interface Cat {
    id: string;
    url: string;
}

const CatComponent: React.FC = () => {
    const [cat, setCat] = useState<Cat>({ id: '', url: '' });
    const [likedCats, setLikedCats] = useState<Cat[]>([]);
    const [dislikedCats, setDislikedCats] = useState<Cat[]>([]);

    useEffect(() => {
        fetch('https://api.thecatapi.com/v1/images/search')
            .then((response) => response.json())
            .then((data) => setCat({ id: data[0].id, url: data[0].url }));
    }, []);

    const handleLike = () => {
        setLikedCats([...likedCats, cat]);
        fetchNewCat();
    };

    const handleDislike = () => {
        setDislikedCats([...dislikedCats, cat]);
        fetchNewCat();
    };

    const fetchNewCat = () => {
        fetch('https://api.thecatapi.com/v1/images/search')
            .then((response) => response.json())
            .then((data) => setCat({ id: data[0].id, url: data[0].url }));
    };

    return (
        <div>
            <img src={cat.url} alt={`cat-${cat.id}`} />
            <button onClick={handleLike}>Thumbs up</button>
            <button onClick={handleDislike}>Thumbs down</button>
            <h3>Liked Cats:</h3>
            <ul>
                {likedCats.map((likedCat) => (
                    <li key={likedCat.id}>
                        <img src={likedCat.url} alt={`cat-${likedCat.id}`} />
                    </li>
                ))}
            </ul>
            <h3>Disliked Cats:</h3>
            <ul>
                {dislikedCats.map((dislikedCat) => (
                    <li key={dislikedCat.id}>
                        <img src={dislikedCat.url} alt={`cat-${dislikedCat.id}`} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CatComponent;