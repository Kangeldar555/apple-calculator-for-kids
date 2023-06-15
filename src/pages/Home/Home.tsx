import React from 'react';
import Calculator from '../../components/Calculator/Calculator';
import './Home.scss';
import MainLayout from '../../layouts/MainLayout/MainLayout';

const Home = () => {
  return (
    <MainLayout className='homeLayout'>
      <div className='homeContainer'>
        <Calculator/>
      </div>
    </MainLayout>
  );
};

export default Home;