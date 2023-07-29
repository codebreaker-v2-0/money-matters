import SideBar from "../SideBar/SideBar";

import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.home}>
      <SideBar />
    </div>
  );
};

export default Home;
