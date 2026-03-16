import { useState } from 'react';
import { Heart } from 'lucide-react';
import ProductCard from '@/components/user/products/ProductCard';
import ProductFilters from '@/components/user/products/FilterCard';
import { allProducts, categories  } from '@/utils/SampleData';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/user/AuthContext';
import EmptyProduct from '@/components/user/products/EmptyProduct';
import type { SortOption } from '@/types/user';
import SearchBar from '@/components/user/products/SearchBar';
import PageHeader from '@/components/user/products/PageHeader';

export default function Products() {
      const { user } = useAuth();
      const mode = localStorage.getItem('mode');
      const savedFavorites = localStorage.getItem('favorites');
      const favoriteProd = savedFavorites ? JSON.parse(savedFavorites) : [];

      const [searchQuery, setSearchQuery] = useState('');
      const [selectedCategory, setSelectedCategory] = useState('All');
      const [sortBy, setSortBy] = useState<SortOption>(mode === 'order now' ? 'recommended' : 'new');
      const [priceRange, setPriceRange] = useState<[number, number]>([0, 20]);
      const [showFilters, setShowFilters] = useState(false);
      const [favorites, setFavorites] = useState<number[]>(favoriteProd);

      const toggleFavorite = (productId: number) => {
            setFavorites(prev => {
                  let updatedItems;

                  if (prev.includes(productId)){
                        updatedItems = prev.filter(id => id !== productId);
                  }else{
                        updatedItems = [...prev, productId];
                  }

                  localStorage.setItem('favorites', JSON.stringify(updatedItems));

                  return updatedItems;
            });
      };

      // Filter and sort products
      const filteredProducts = allProducts
            .filter(product => {
                  const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    product.description.toLowerCase().includes(searchQuery.toLowerCase());
                  const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
                  const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
                  return matchesSearch && matchesCategory && matchesPrice;
            })
            .sort((a, b) => {
                  switch (sortBy) {
                        case 'price-low':
                              return a.price - b.price;
                        case 'price-high':
                              return b.price - a.price;
                        case 'new':
                              return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
                        case 'rating':
                              return b.rating - a.rating;
                  default: // recommended
                  return b.rating * b.reviews - a.rating * a.reviews;
                  }
            });

      const favoriteProducts = allProducts.filter(p => favorites.includes(p.id));

      const clearFilters = () => {
            setSearchQuery('');
            setSelectedCategory('All');
            setSortBy('recommended');
            setPriceRange([0, 20]);
      };

      return (
            <section className="py-20">
            <div className="max-w-[80%] mx-auto px-4 md:px-8">
                        {/* Page Header */}
                        <PageHeader user={user ? true : false}/>

                        {/* Search and Filter Bar */}
                        <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.30 }}
                              className="bg-white rounded-xl shadow-md p-4 mb-8 relative"
                        >
                              {/* Search Bar */}
                              <SearchBar
                                    searchQuery={searchQuery}
                                    setSearchQuery={setSearchQuery}
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    showFilters={showFilters}
                                    setShowFilters={setShowFilters}
                              />

                              {/* Expandable Filters */}
                              {showFilters && (
                                    <ProductFilters
                                          categories={categories}
                                          selectedCategory={selectedCategory}
                                          setSelectedCategory={setSelectedCategory}
                                          priceRange={priceRange}
                                          setPriceRange={setPriceRange}
                                          clearFilters={clearFilters}
                                    />
                              )}
                        </motion.div>

                        {/* Favorite Products Section */}
                        {favoriteProducts.length > 0 && (
                              <div className="mb-12">
                                    <motion.div
                                          initial={{ opacity: 0, y: 30 }}
                                          whileInView={{ opacity: 1, y: 0 }}
                                          viewport={{ once: true, amount: 0.3 }}
                                          transition={{ duration: 0.25 }}
                                    >
                                          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                                <Heart className="fill-red-500 text-red-500" size={24} />
                                                Your Favorites
                                          </h2>
                                    </motion.div>

                                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                          {favoriteProducts.map((product, index) => (
                                                <motion.div
                                                      key={product.id}
                                                      initial={{ opacity: 0, y: 20 }}
                                                      animate={{ opacity: 1, y: 0 }}
                                                      transition={{ duration: 0.3, delay: index * 0.03 }}
                                                >
                                                      <ProductCard
                                                            key={product.id}
                                                            product={product}
                                                            isFavorite={favorites.includes(product.id)}
                                                            onToggleFavorite={toggleFavorite}
                                                      />
                                                </motion.div>
                                          ))}
                                    </div>
                              </div>
                        )}

                        {/* Results Count */}
                        <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.30 }}
                              className="mb-6"
                        >
                              <p className="text-gray-600">
                                    Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> products
                                    {selectedCategory !== 'All' && (
                                          <span> in <span className="font-semibold text-amber-600">{selectedCategory}</span></span>
                                    )}
                              </p>
                        </motion.div>

                        {/* All Products Grid */}
                        {filteredProducts.length > 0 ? (
                              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {filteredProducts.map((product, index) => (
                                          <motion.div
                                                key={product.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3, delay: index * 0.03 }}
                                          >
                                                <ProductCard
                                                      key={product.id}
                                                      product={product}
                                                      isFavorite={favorites.includes(product.id)}
                                                      onToggleFavorite={toggleFavorite}
                                                />
                                          </motion.div>
                                    ))}
                              </div>
                              ) : (
                                    <EmptyProduct
                                          setSearchQuery={setSearchQuery}
                                          setSelectedCategory={setSelectedCategory}
                                          setPriceRange={setPriceRange}
                                    /> 
                              )
                        }
                  </div>
            </section>
      );
}
