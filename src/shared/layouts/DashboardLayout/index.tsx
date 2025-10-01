import styles from './styles.module.scss';

export const DashboardLayout = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>header</div>
      <div className={styles.sidebar}>sidebar</div>
      <div className={styles.mainContent}>main content</div>
    </div>
  );
};
