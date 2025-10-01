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
      <div className={styles.header}>{header}</div>
      <div className={styles.sidebar}>{sidebar}</div>
      <div className={styles.mainContent}>{mainContent}</div>
    </div>
  );
};
