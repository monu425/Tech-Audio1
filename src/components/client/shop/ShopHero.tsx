

export const ShopHero = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <Title className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                Shop Products
              </Title>
              <p className="text-gray-600 text-sm">
                Discover amazing products tailored to your needs
              </p>
            </div>
            {(selectedCategory !== null ||
              selectedBrand !== null ||
              selectedPrice !== null) && (
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedBrand(null);
                  setSelectedPrice(null);
                }}
                className="inline-flex items-center px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-md hover:bg-red-100 transition-colors duration-200 text-sm font-medium"
              >
                Clear All Filters
              </button>
            )}
          </div>

          {/* Active Filters Display */}
          {(selectedCategory || selectedBrand || selectedPrice) && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-gray-700 mr-2">
                  Active filters:
                </span>
                {selectedCategory && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Category:{" "}
                    {
                      categories?.find(
                        (cat) => cat?.slug?.current === selectedCategory
                      )?.title
                    }
                  </span>
                )}
                {selectedBrand && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Brand:{" "}
                    {
                      brands?.find(
                        (brand) => brand?.slug?.current === selectedBrand
                      )?.title
                    }
                  </span>
                )}
                {selectedPrice && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    Price: ${selectedPrice.replace("-", " - $")}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
  );
};
