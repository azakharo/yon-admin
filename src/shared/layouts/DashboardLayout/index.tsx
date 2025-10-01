import {FC, ReactElement} from 'react';

import styles from './styles.module.scss';

interface Props {
  header: ReactElement;
  sidebar: ReactElement;
  mainContent: ReactElement;
}

export const DashboardLayout: FC<Props> = ({header, sidebar, mainContent}) => {
  return (
    <div className={styles.container}>
      <header>{header}</header>
      <aside>{sidebar}</aside>
      <main>{mainContent}</main>
    </div>
  );
};
