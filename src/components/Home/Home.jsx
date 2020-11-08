import React, { useState, useEffect } from "react";
import Axios from "axios";
import styled from "styled-components";

import SearchBar from "./SearchBar/SearchBar";
import HeroesList from "../Heroes/HeroesList";
import Loading from "../Loading/Loading";

import { API_URL, API_KEY } from "../../constants";

import banner from "../assets/img/marvel-banner.png";

const BannerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SEARCHBAR_PLACEHOLDER = "Search from Marvel Universe...";

const Home = () => {
  const [isLoading, setLoading] = useState(false);
  const [heroesList, setHeroesList] = useState([]);
  const [filteredHeroes, setFilteredHeroes] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const urlWithAllHeroes = `${API_URL}?&apikey=${API_KEY}`;
    const urlSearchByHeroName = `${API_URL}?nameStartsWith=${searchValue}&apikey=${API_KEY}`;

    setLoading(true);

    if (searchValue.length) {
      Axios.get(urlSearchByHeroName)
        .then((response) => response.data.data.results)
        .then((data) => {
          setFilteredHeroes(data);
          setLoading(false);
        });
    } else {
      setFilteredHeroes([]);
      Axios.get(urlWithAllHeroes)
        .then((response) => response.data.data.results)
        .then((data) => {
          setHeroesList(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [searchValue]);

  return (
    <>
      <BannerContainer>
        <img src={banner} alt="logo" />
      </BannerContainer>
      <SearchBarContainer>
        <SearchBar
          placeholder={SEARCHBAR_PLACEHOLDER}
          submitSearchValue={(value) => setSearchValue(value)}
        />
      </SearchBarContainer>

      {isLoading && (
        <>
          <Loading />
        </>
      )}

      {!isLoading && filteredHeroes.length ? (
        <HeroesList list={filteredHeroes} />
      ) : (
        !isLoading &&
        filteredHeroes.length === 0 && <HeroesList list={heroesList} />
      )}
    </>
  );
};

export default Home;
