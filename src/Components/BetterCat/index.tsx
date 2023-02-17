import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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
        <Container>
            <CatImage src={cat.url} alt={`cat-${cat.id}`} />
            <ButtonsContainer>
                <ThumbsUpButton onClick={handleLike}>👍 Thumbs up</ThumbsUpButton>
                <ThumbsDownButton onClick={handleDislike}>👎 Thumbs down</ThumbsDownButton>
            </ButtonsContainer>
            <HistoryContainer>
                <HistoryList>
                    <HistoryTitle>Liked Cats:</HistoryTitle>
                    {likedCats.map((likedCat) => (
                        <HistoryItem key={likedCat.id}>
                            <CatImage src={likedCat.url} alt={`cat-${likedCat.id}`} />
                        </HistoryItem>
                    ))}
                </HistoryList>
                <HistoryList>
                    <HistoryTitle>Disliked Cats:</HistoryTitle>
                    {dislikedCats.map((dislikedCat) => (
                        <HistoryItem key={dislikedCat.id}>
                            <CatImage src={dislikedCat.url} alt={`cat-${dislikedCat.id}`} />
                        </HistoryItem>
                    ))}
                </HistoryList>
            </HistoryContainer>
        </Container>
    );
};

export default CatComponent;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 32px;
`;

const CatImage = styled.img`
  margin: 32px 0;
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 16px;
`;

const ThumbsUpButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 12px 16px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #388e3c;
  }
  `;

const ThumbsDownButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 12px 16px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #d32f2f;
  }
`;

const HistoryContainer = styled.div`
  display: flex;
  gap: 16px;
`;

const HistoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const HistoryTitle = styled.h3`
  margin: 16px 0;
`;

const HistoryItem = styled.li`
  margin: 16px 0;
`;