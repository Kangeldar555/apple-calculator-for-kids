import React from 'react'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './MainLayout.scss';

type Props = {
  className?: string;
  children: any;
}

const MainLayout = ({ className='', children }: Props) => {
  return (
    <div className={`mainLayoutContainer ${className}`}>
      <header>
        <Header expand='md'/>
      </header>
      <section>
        {children}
      </section>
      <footer>
        <Footer/>
      </footer>
    </div>
  );
};

export default MainLayout