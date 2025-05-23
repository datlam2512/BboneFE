import { Helmet } from "react-helmet";
import HomeView from "../section/HomePage/views/Home";

function HomePage() {
  return (
    <div>
      <Helmet>
        <title>Bbone</title>
      </Helmet>
      <HomeView />
    </div>
  );
}

export default HomePage;