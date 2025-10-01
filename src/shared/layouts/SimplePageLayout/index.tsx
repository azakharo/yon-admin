import {FC, ReactElement} from 'react';

import styles from './styles.module.scss';

interface Props {
  header: ReactElement;
  mainContent: ReactElement;
}

export const SimplePageLayout: FC<Props> = ({header, mainContent}) => {
  return (
    <div className={styles.container}>
      <header>{header}</header>
      <main>{mainContent}</main>
    </div>
  );
};
