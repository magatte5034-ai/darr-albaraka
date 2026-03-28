import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import ProductCard from '../components/Product/ProductCard'
import { PRODUCTS, CATEGORIES } from '../data/mockData'

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'rating'

export default function CatalogPage() {
  const { lang, tr } = useLang()
  const [params, setParams] = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)
  const [sort, setSort] = useState<SortKey>('featured')

  const selectedCat = params.get('category') || ''
  const query = params.get('q') || ''

  const setCategory = (id: string) => {
    const p = new URLSearchParams(params)
    if (id) p.set('category', id); else p.delete('category')
    setParams(p)
  }

  const clearFilters = () => {
    setParams({})
    setSort('featured')
  }

  const filtered = useMemo(() => {
    let list = [...PRODUCTS]
    if (selectedCat) list = list.filter(p => p.categoryId === selectedCat)
    if (query) {
      const q = query.toLowerCase()
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.titleEn.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q)
      )
    }
    switch (sort) {
      case 'price-asc': return list.sort((a, b) => a.price - b.price)
      case 'price-desc': return list.sort((a, b) => b.price - a.price)
      case 'rating': return list.sort((a, b) => b.rating - a.rating)
      default: return list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }
  }, [selectedCat, query, sort])

  const sortOptions: { value: SortKey; label: string }[] = [
    { value: 'featured', label: tr('popular') },
    { value: 'price-asc', label: tr('priceAsc') },
    { value: 'price-desc', label: tr('priceDesc') },
    { value: 'rating', label: tr('newest') },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page header */}
      <div className="bg-gradient-to-r from-green-900 to-green-700 text-white py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold font-heading">{tr('catalogTitle')}</h1>
          {query && (
            <p className="text-green-200 mt-1 text-sm">
              {lang === 'fr' ? `Résultats pour` : 'Results for'} "<strong>{query}</strong>"
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(v => !v)}
              className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm font-medium hover:bg-gray-50 transition shadow-sm"
            >
              <SlidersHorizontal size={16} className="text-green-700" />
              {tr('filters')}
              {selectedCat && <span className="bg-green-600 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">1</span>}
            </button>
            {(selectedCat || query) && (
              <button onClick={clearFilters} className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 transition">
                <X size={12} /> {tr('clearFilters')}
              </button>
            )}
            <span className="text-sm text-gray-500">{filtered.length} {tr('results')}</span>
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sort}
              onChange={e => setSort(e.target.value as SortKey)}
              className="appearance-none bg-white border border-gray-200 rounded-xl pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm cursor-pointer"
            >
              {sortOptions.map(o => <option key={o.value} value={o.value}>{tr('sortBy')}: {o.label}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar filters */}
          {showFilters && (
            <aside className="w-56 flex-shrink-0">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sticky top-20">
                <h3 className="font-semibold text-gray-800 mb-3 text-sm">{tr('allCategories')}</h3>
                <ul className="space-y-1">
                  <li>
                    <button
                      onClick={() => setCategory('')}
                      className={`w-full text-left text-sm px-3 py-2 rounded-lg transition ${!selectedCat ? 'bg-green-100 text-green-800 font-semibold' : 'hover:bg-gray-50 text-gray-600'}`}
                    >
                      {tr('allCategories')}
                    </button>
                  </li>
                  {CATEGORIES.map(cat => (
                    <li key={cat.id}>
                      <button
                        onClick={() => setCategory(cat.id)}
                        className={`w-full text-left text-sm px-3 py-2 rounded-lg flex items-center justify-between transition ${selectedCat === cat.id ? 'bg-green-100 text-green-800 font-semibold' : 'hover:bg-gray-50 text-gray-600'}`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{cat.icon}</span>
                          {lang === 'en' ? cat.nameEn : cat.name}
                        </span>
                        <span className="text-xs text-gray-400">{cat.count}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          )}

          {/* Products grid */}
          <div className="flex-1">
            {/* Mobile category pills */}
            <div className="flex gap-2 overflow-x-auto pb-3 mb-4 md:hidden">
              <button
                onClick={() => setCategory('')}
                className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full border transition ${!selectedCat ? 'bg-green-700 text-white border-green-700' : 'bg-white border-gray-200 text-gray-600'}`}
              >
                {tr('allCategories')}
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full border transition ${selectedCat === cat.id ? 'bg-green-700 text-white border-green-700' : 'bg-white border-gray-200 text-gray-600'}`}
                >
                  {cat.icon} {lang === 'en' ? cat.nameEn : cat.name}
                </button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-gray-400 gap-4">
                <span className="text-5xl">🔍</span>
                <p className="font-medium">{tr('noProducts')}</p>
                <button onClick={clearFilters} className="text-sm text-green-700 hover:underline">{tr('clearFilters')}</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filtered.map(p => <ProductCard key={p.id} product={p} lang={lang} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
