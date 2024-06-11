import React, { useState, type ChangeEvent } from "react";
import { allCategories } from "~/utils/selects";

interface CategoryDropdownSelectorProps {
  selectedCategories: string[];
  setSelectedCategories?: (categories: string[]) => void;
  isInfo?: boolean;
}

const CategoryDropdownSelector = ({
  selectedCategories,
  setSelectedCategories,
  isInfo,
}: CategoryDropdownSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedCategories &&
        setSelectedCategories([...selectedCategories, value]);
    } else {
      setSelectedCategories &&
        setSelectedCategories(
          selectedCategories.filter((category) => category !== value),
        );
    }
    setIsDropdownOpen(!isDropdownOpen);
  };

  const filteredCategories = allCategories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="relative w-full">
      {isInfo ? null : (
        <div className="mb-4 w-full">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full rounded-lg border border-gray-300 bg-white p-2 text-left"
          >
            {isDropdownOpen ? "Закрити категорії" : "Виберіть категорії"}
          </button>
          {isDropdownOpen && (
            <div className="absolute z-10 mt-2 w-full rounded-lg border border-gray-300 bg-white shadow-lg">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Пошук категорій..."
                className="mb-2 w-full rounded-t-lg border-b border-gray-300 p-2"
              />
              <div className="max-h-60 overflow-y-auto">
                {filteredCategories.map((category) => (
                  <label
                    key={category.idCategory}
                    className="flex items-center p-2"
                  >
                    <input
                      type="checkbox"
                      value={category.idCategory}
                      checked={selectedCategories.includes(
                        category.idCategory.toString(),
                      )}
                      onChange={handleCategoryChange}
                      className="mr-2"
                    />
                    {category.name}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      <div>
        <h3 className="mb-2 font-semibold">Вибрані категорії:</h3>
        <div className="flex flex-wrap gap-2">
          {selectedCategories.map((categoryId) => {
            const category = allCategories.find(
              (cat) => cat.idCategory.toString() === categoryId,
            );
            return (
              <span
                key={categoryId}
                className="rounded-lg bg-blue-100 px-2 py-1 text-blue-700"
              >
                {category?.name}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryDropdownSelector;
