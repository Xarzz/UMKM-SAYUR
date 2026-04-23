import Link from "next/link";

export default function CategoryGrid() {
  const categories = [
    {
      name: "Sayur Daun",
      count: "120+",
      img: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=1887&auto=format&fit=crop",
      color: "from-emerald-900/90 via-emerald-900/40",
    },
    {
      name: "Umbi-umbian",
      count: "45+",
      img: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?q=80&w=1770&auto=format&fit=crop",
      color: "from-orange-900/90 via-orange-900/40",
    },
    {
      name: "Bumbu Dapur",
      count: "80+",
      img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1770&auto=format&fit=crop",
      color: "from-red-900/90 via-red-900/40",
    },
    {
      name: "Buah Segar",
      count: "60+",
      img: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=1770&auto=format&fit=crop",
      color: "from-yellow-900/90 via-yellow-900/40",
    },
  ];

  return (
    <section id="kategori" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Kategori Populer</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Pilih dari berbagai macam kategori hasil bumi segar yang kami sediakan setiap harinya.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <Link
              key={i}
              href={`/?category=${cat.name}#produk`}
              className="group relative overflow-hidden rounded-3xl h-64 hover:shadow-xl transition-all duration-300"
            >
              <img
                src={cat.img}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} to-transparent`}></div>
              <div className="absolute bottom-0 left-0 w-full p-6 text-left">
                <h3 className="font-bold text-2xl text-white mb-1 drop-shadow-md">{cat.name}</h3>
                <p className="text-sm text-emerald-100 drop-shadow-md">{cat.count} Produk</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
