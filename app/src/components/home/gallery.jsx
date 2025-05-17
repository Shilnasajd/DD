import { useState } from 'react';
import { Helmet } from "react-helmet";
import Footer from '../footer';
import Header from '../header';
import { useNavigate } from 'react-router-dom';

const WeddingGallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();

  // Sample gallery data - replace with your actual images
  const galleryData = [
    {
      id: 1,
      category: 'traditional',
      title: 'Traditional Indian Wedding',
      image: 'imgs/weddings/1.jpg',
      year: '2023'
    },
    {
      id: 2,
      category: 'destination',
      title: 'Beach Wedding in Goa',
      image: 'imgs/weddings/1.jpg',
      year: '2023'
    },
    {
      id: 3,
      category: 'traditional',
      title: 'Grand Palace Wedding',
      image: 'imgs/weddings/1.jpg',
      year: '2022'
    },
    {
      id: 4,
      category: 'modern',
      title: 'Minimalist Wedding',
      image: 'imgs/weddings/1.jpg',
      year: '2022'
    },
    {
      id: 5,
      category: 'destination',
      title: 'Mountain Resort Wedding',
      image: 'imgs/weddings/1.jpg',
      year: '2021'
    },
    {
      id: 6,
      category: 'modern',
      title: 'Urban Rooftop Wedding',
      image: 'imgs/weddings/1.jpg',
      year: '2021'
    },
  ];

  const filteredImages = activeCategory === 'all' 
    ? galleryData 
    : galleryData.filter(item => item.category === activeCategory);

  const openLightbox = (index) => {
    setCurrentImage(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>DD Cameras - Camera Rentals</title>
        <meta name="description" content="Explore our exquisite wedding photography portfolio showcasing beautiful moments from traditional to destination weddings" />
      </Helmet>
      <Header />

      <div className="min-h-screen bg-amber-20">
        {/* Hero Section */}
        <section className="relative h-96 bg-gray-900 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Wedding Stories</h1>
            <p className="text-xl text-amber-100 max-w-2xl mx-auto">
              Capturing timeless moments of love, emotion, and celebration
            </p>
          </div>
        </section>

        {/* Gallery Content */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-5 py-2 rounded-full font-medium transition-all ${activeCategory === 'all' ? 'bg-gradient-to-r from-amber-500 to-amber-600' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              All Weddings
            </button>
            <button
              onClick={() => setActiveCategory('traditional')}
              className={`px-5 py-2 rounded-full font-medium transition-all ${activeCategory === 'traditional' ? 'bg-gradient-to-r from-amber-500 to-amber-600' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              Traditional
            </button>
            <button
              onClick={() => setActiveCategory('modern')}
              className={`px-5 py-2 rounded-full font-medium transition-all ${activeCategory === 'modern' ? 'bg-gradient-to-r from-amber-500 to-amber-600' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              Modern
            </button>
            <button
              onClick={() => setActiveCategory('destination')}
              className={`px-5 py-2 rounded-full font-medium transition-all ${activeCategory === 'destination' ? 'bg-gradient-to-r from-amber-500 to-amber-600' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              Destination
            </button>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((item, index) => (
              <div 
                key={item.id} 
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                onClick={() => openLightbox(index)}
              >
                <div className="aspect-w-4 aspect-h-3">
                  {/* Replace with Next.js Image component in production */}
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div>
                    <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                    <p className="text-amber-200">{item.year}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center bg-amber-50 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Capture Your Special Day?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Let's create beautiful memories together. Contact us to discuss your wedding photography needs.
            </p>
            <button 
            onClick={() => navigate('/contact')}
            className="bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-2 px-6 rounded-full ml-6 shadow-lg hover:shadow-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300">
              Book Your Wedding Shoot
            </button>
          </div>
        </section>

        {/* Lightbox Modal */}
        {lightboxOpen && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <button 
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 text-white text-3xl"
            >
              &times;
            </button>
            <div className="max-w-4xl w-full">
              <img 
                src={filteredImages[currentImage].image} 
                alt={filteredImages[currentImage].title}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              <div className="text-white text-center mt-4">
                <h3 className="text-xl font-semibold">{filteredImages[currentImage].title}</h3>
                <p className="text-amber-300">{filteredImages[currentImage].year}</p>
              </div>
            </div>
            <button 
              onClick={() => setCurrentImage((prev) => (prev > 0 ? prev - 1 : filteredImages.length - 1))}
              className="absolute left-6 text-white text-4xl"
            >
              &#8249;
            </button>
            <button 
              onClick={() => setCurrentImage((prev) => (prev < filteredImages.length - 1 ? prev + 1 : 0))}
              className="absolute right-6 text-white text-4xl"
            >
              &#8250;
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default WeddingGallery;