import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import PostList from '../components/PostList';

const Home = () => {
  return (
    <div>
      <Navigation />
      <Banner />
      <PostList />
      <Footer />
    </div>
  );
};

export default Home;
