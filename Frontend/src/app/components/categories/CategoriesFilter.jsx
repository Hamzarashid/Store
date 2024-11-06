"use client";

import Cards from "../../components/card/Cards";
import StyledHeader from "./CategoriesFilterStyled";

export default function CategoriesFilter({ name }) {
  const filterName = name;
  return (
    <div>
      <StyledHeader>{name}</StyledHeader>
      <Cards filter={filterName} />
    </div>
  );
}
