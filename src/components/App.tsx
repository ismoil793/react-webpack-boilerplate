import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import styles from './AnotherStyles.module.scss';
// import './App.scss';
import imgPng from '@/assets/JavaScript-logo.png';
import imgJpg from '@/assets/1.jpg';
import SVGIcon from '@/assets/board.svg';

export const App = () => {
  return (
    // data-testismoil will be removed for prod with our custom babel plugin
    <div data-testismoil="test">
      <div>
        <img width={100} src={imgPng} alt="img png" />
        <img width={100} src={imgJpg} alt="img jpg" />
        <SVGIcon width={100} height={100} color="red" />
      </div>

      <div>
        <p>
          <strong>__ISMOIL_GLOBAL__:</strong> {__ISMOIL_GLOBAL__}
        </p>
      </div>

      <div className={styles.blue}>
        App
        <div>
          <div>
            <Link to="/">home</Link>
          </div>
          <div>
            <Link to="/about">about</Link>
          </div>
          <div>
            <Link to="/shop">shop</Link>
          </div>
        </div>
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
};
