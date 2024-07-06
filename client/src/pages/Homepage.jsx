import React, { useEffect, useState } from 'react';
import PageAnimation from '../common/PageAnimation';
import InPageNavigaion, {
  activeTabRef,
} from '../components/Inpage-navigation';
import axios from 'axios';

const Home = () => {

    let [pageState, setPageState] = useState('home')
  return (
    <PageAnimation>
      <section className='h-cover flex justify-center gap-10'>
        {/* latest blog */}
        <div className='w-full'>
          <InPageNavigaion
            routes={[pageState, 'trending blog']}
            defaultHidden={['trending blog']}
          >
          </InPageNavigaion>
        </div>
        {/* filter and trending */}
      </section>
    </PageAnimation>
  );
};

export default Home;
