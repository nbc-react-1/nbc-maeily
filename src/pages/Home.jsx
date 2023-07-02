import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Banner from '../components/home/Banner';
import PostList from '../components/home/PostList';

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
