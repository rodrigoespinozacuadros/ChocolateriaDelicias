import { Product, Section } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Trufas de Avellana Dorada',
    description: 'Crujiente avellana del Piamonte envuelta en ganache de chocolate con leche al 45%, terminada con polvo de oro comestible.',
    price: 320,
    image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?q=80&w=800&auto=format&fit=crop',
    category: 'truffle',
    featured: true,
    ingredients: ['Cacao 45%', 'Avellanas', 'Crema', 'Oro comestible'],
    weight: '12 pzas'
  },
  {
    id: '2',
    name: 'Barra Origen Ecuador 80%',
    description: 'Notas florales y frutales intensas. Un chocolate oscuro puro para los verdaderos conocedores del cacao fino de aroma.',
    price: 180,
    image: 'https://images.unsplash.com/photo-1582176604856-e822b3e8bfb8?q=80&w=800&auto=format&fit=crop',
    category: 'bar',
    featured: true,
    ingredients: ['Pasta de cacao', 'Manteca de cacao', 'Azúcar de caña'],
    weight: '80g'
  },
  {
    id: '3',
    name: 'Colección Degustación',
    description: 'Una caja de regalo elegante con una selección de nuestras 24 mejores trufas y bombones. El regalo perfecto.',
    price: 850,
    image: 'https://images.unsplash.com/photo-1621251326287-c793ad7a885b?q=80&w=800&auto=format&fit=crop',
    category: 'gift',
    featured: true,
    ingredients: ['Varios'],
    weight: '450g'
  },
  {
    id: '4',
    name: 'Caramelo Salado',
    description: 'Bombón relleno de caramelo suave con un toque de sal marina de colima, cubierto de chocolate oscuro.',
    price: 280,
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a8230f7?q=80&w=800&auto=format&fit=crop',
    category: 'truffle',
    ingredients: ['Cacao 70%', 'Caramelo', 'Sal de mar', 'Mantequilla'],
    weight: '12 pzas'
  },
  {
    id: '5',
    name: 'Chocolate Caliente Maya',
    description: 'Mezcla en polvo de cacao con especias antiguas: canela, chile y pimienta gorda. Una bebida reconfortante.',
    price: 220,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=800&auto=format&fit=crop',
    category: 'hot-chocolate',
    ingredients: ['Cacao en polvo', 'Canela', 'Chile en polvo', 'Azúcar mascabado'],
    weight: '250g'
  },
  {
    id: '6',
    name: 'Barra Chocolate Blanco & Matcha',
    description: 'La dulzura cremosa del chocolate blanco equilibrada con el amargor vegetal del té matcha ceremonial.',
    price: 195,
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=800&auto=format&fit=crop',
    category: 'bar',
    ingredients: ['Manteca de cacao', 'Leche en polvo', 'Té Matcha', 'Azúcar'],
    weight: '80g'
  },
];