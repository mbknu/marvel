import React from "react";

import styled from "styled-components";

import Hero from "./Hero";
// import HeroDetails from "./HeroDetails";

const Wrapper = styled.div`
  /* display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid green; */
`;
const HeroesContainer = styled.div`
  margin-top: 10px;

  display: flex;
`;

const Button = styled.button`
  color: white;
  padding: 10px 15px;
  background-color: #ee171f;
  cursor: pointer;
  margin-left: 50%;
  margin-top: 20px;
  border: none;
  font-weight: bold;
`;

const HeroesList = ({ list, handleSelectHeroById }) => {
  console.log("list dans Heroeslist", list);
  return (
    <Wrapper>
      <HeroesContainer>
        {list.map((hero) => (
          <Hero
            key={hero.id}
            hero={hero}
            onClick={() => handleSelectHeroById(hero.id)}
          />
        ))}
      </HeroesContainer>
      <Button>NEXT</Button>
    </Wrapper>
  );
};

export default HeroesList;
