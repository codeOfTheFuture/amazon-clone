import Banner from "./components/Banner";
import Header from "./components/Header";

const Home = () => {
  return (
    <div className="bg-gray-100">
      <Header />

      <main className="max-w-screen-2xl mx-auto">
        <Banner />

        {/* Product Feed */}
      </main>
    </div>
  );
};

export default Home;
