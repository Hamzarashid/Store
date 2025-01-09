// Categories Data
export const categories = [
  { key: '1', label: 'Polo Shirts' },
  { key: '2', label: 'Cotton Pants' },
  { key: '3', label: 'Dri-fit Shirts ' },
  { key: '4', label: 'Crew Neck Shirts' },
  { key: '5', label: 'Trousers' },
  { key: '6', label: 'Track Suits' },
  { key: '7', label: 'Denim Jeans' },
];

// Carousel Images

export const carouselImages = [
  {
    src: 'https://era4apparels.com/cdn/shop/files/chino-banner-2.jpg?v=1712219764&width=1400',
    alt: 'Image 1',
  },
  {
    src: 'https://era4apparels.com/cdn/shop/files/dri-fit-1.jpg?v=1712219806&width=1400',
    alt: 'Image 2',
  },
  {
    src: 'https://era4apparels.com/cdn/shop/files/era4-new-bnr-new.jpg?v=1713178010&width=1400',
    alt: 'Image 3',
  },
  {
    src: 'https://era4apparels.com/cdn/shop/files/polo-1.jpg?v=1712219716&width=1400',
    alt: 'Image 4',
  }, 
   {
    src: 'https://era4apparels.com/cdn/shop/files/polo-banner.png?v=1719995892&width=1400',
    alt: 'Image 5',
  },
  {
    src: 'https://era4apparels.com/cdn/shop/files/az.png?v=1722354503&width=1400',
    alt: 'Image 5',
  },
    {
    src: 'https://era4apparels.com/cdn/shop/files/12.png?v=1722353689&width=1400',
    alt: 'Image 6',
  },
];
// Card Data
export const cardData = [
  {
    id: 1,
    image: 'https://picsum.photos/800/500?random=1',
    description: 'Product 1',
    price: '1000',
  },
  {
    id: 2,
    image: 'https://picsum.photos/800/500?random=2',
    description: 'Product 2',
    price: '2000',
  },
  {
    id: 3,
    image: 'https://picsum.photos/800/500?random=3',
    description: 'Product 3',
    price: '3000',
  },
  {
    id: 4,
    image: 'https://picsum.photos/800/500?random=4',
    description: 'Product 4',
    price: '4000',
  },
];

// Album Data
export const items = [
  {
    title: 'Polo Shirts',
    image: 'https://era4apparels.com/cdn/shop/files/chinos-bnr-men.jpg?v=1718285368&width=600',
  },
  {
    title: 'Dri-Fits',
    image: 'https://era4apparels.com/cdn/shop/files/C9077T01.jpg?v=1715290003&width=400',
  },
  {
    title: 'Track Suits',
    image: 'https://era4apparels.com/cdn/shop/files/PLM04591.jpg?v=1712563249&width=400',
  },
  {
    title: 'Chinos Pants',
    image: 'https://era4apparels.com/cdn/shop/files/chinos-bnr-men.jpg?v=1718285368&width=600',
  },
];

// Accordion Data
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

export const getItems = (panelStyle) => [
  {
    key: '1',
    label: 'This is panel header 1',
    children: <p>{text}</p>,
    style: panelStyle,
  },
  {
    key: '2',
    label: 'This is panel header 2',
    children: <p>{text}</p>,
    style: panelStyle,
  },
  {
    key: '3',
    label: 'This is panel header 3',
    children: <p>{text}</p>,
    style: panelStyle,
  },
];

// Product Detail Carousel

export const images = [
  'https://picsum.photos/200/200?random=1',
  'https://picsum.photos/200/200?random=2',
  'https://picsum.photos/200/200?random=3',
  'https://picsum.photos/200/200?random=4',
];

