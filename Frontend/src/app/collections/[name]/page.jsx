"use client";
import { useParams } from "next/navigation";
import CategoriesFilter from "../../components/categories/CategoriesFilter";

export default function CategoryPage() {
  const { name } = useParams();
  const filterName = name.replace(/%20/g, " ").trim();

  return (
    <div>
      <CategoriesFilter name={filterName} />
    </div>
  );
}
