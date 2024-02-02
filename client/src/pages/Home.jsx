import { Button } from 'flowbite-react';
import TopArticles from '../components/TopArticles';
import MoreArtilces from '../components/MoreArtilces';

function Home() {
  return (
    <div className='min-h-screen'>
      <TopArticles />
      <MoreArtilces />
    </div>
  )
}

export default Home