import styles from './styles.module.scss';

import Image from 'next/image';
import Logo from '../../../public/images/logo.svg';
import { SigninButton } from '../SigninButton';
import { ActiveLink } from '../ActiveLink';

export function Header() {

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image src={Logo} alt="ig.news" />
        <nav>
          <ActiveLink
            href="/"
            activeClassName={styles.active}
          >
            <a>Home</a>
          </ActiveLink>
          <ActiveLink
            href="/posts"
            activeClassName={styles.active}
          >
            <a>Posts</a>
          </ActiveLink>
        </nav>
        <SigninButton />
      </div>
    </header>
  );
}