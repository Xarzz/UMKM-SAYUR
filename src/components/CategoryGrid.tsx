import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useRef } from "react";

interface Category {
  id: number;
  name: string;
  count: number;
}

export default function CategoryGrid({ categories }: { categories: Category[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const getCategoryImage = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("daun") || n.includes("sayur")) return "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=1887&auto=format&fit=crop";
    if (n.includes("umbi") || n.includes("wortel")) return "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?q=80&w=1770&auto=format&fit=crop";
    if (n.includes("bumbu") || n.includes("rempah")) return "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1770&auto=format&fit=crop";
    if (n.includes("buah")) return "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=1770&auto=format&fit=crop";
    if (n.includes("paket")) return "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop";
    return "https://images.unsplash.com/photo-1518843875459-f738682238a6?q=80&w=1742&auto=format&fit=crop";
  };

  const getCategoryColor = (index: number) => {
    const colors = [
      "from-emerald-900/90 via-emerald-900/40",
      "from-orange-900/90 via-orange-900/40",
      "from-red-900/90 via-red-900/40",
      "from-yellow-900/90 via-yellow-900/40",
      "from-blue-900/90 via-blue-900/40",
      "from-purple-900/90 via-purple-900/40",
    ];
    return colors[index % colors.length];
  };

  return (
    <section id="kategori" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="text-left">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Kategori Populer</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
              Pilih dari berbagai macam kategori hasil bumi segar yang kami sediakan setiap harinya.
            </p>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => scroll('left')}
              className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-8 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/?category=${cat.id}#produk`}
              className="group relative flex-shrink-0 w-[280px] sm:w-[320px] overflow-hidden rounded-3xl h-64 hover:shadow-xl transition-all duration-300 snap-start"
            >
              <img
                src={getCategoryImage(cat.name)}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${getCategoryColor(i)} to-transparent`}></div>
              <div className="absolute bottom-0 left-0 w-full p-6 text-left">
                <h3 className="font-bold text-2xl text-white mb-1 drop-shadow-md">{cat.name}</h3>
                <p className="text-sm text-emerald-100 drop-shadow-md">{cat.count} Produk</p>
              </div>
            </Link>
          ))}
          
          {categories.length === 0 && (
            <div className="w-full text-center py-12 text-gray-500 dark:text-gray-400">
              Belum ada kategori yang ditambahkan.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
