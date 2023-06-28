import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Footer() {
  return (
    <div>
      <section>
        푸터입니다
        <div>
          <ul>
            <li class="bold">내일배움캠프</li>
            <li>React 6</li>
            <li>&copy; 2023. MaeilyLook All rights reserved.</li>
          </ul>
          <ul class="sns">
            <li>
              <a href="https://github.com/nbc-react-1/nbc-maeily" target="_blank">
                <FontAwesomeIcon icon="fa-brands fa-github" />
              </a>
            </li>
            <li>
              <a href="https://www.notion.so/fcdd098d699d4583a94caae6a3eff5d6" target="_blank">
                <img src="../static/img/notion.svg" alt="" />
              </a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Footer;
