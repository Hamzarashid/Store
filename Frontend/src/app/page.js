import Carousel from '../app/components/carousel/Carousel';
import Album from './components/clothingalbum/Album';
import Cards from './components/card/Cards';
import Accordion from './components/faqs/Accordion';
import ServiceCard from './components/services/ServiceCard';
import Review from './components/review/Review';

export default function Home() {
  return (
    <>
      <Carousel />
      <Album />
      <Cards />
      <Accordion />
      <Review />
      <ServiceCard />
    </>
  );
}
