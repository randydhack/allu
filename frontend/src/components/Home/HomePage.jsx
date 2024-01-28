// CSS
import "./Home.scss";
import "../utils/DefaultStyles.scss";

function Home() {
  return (
    <div className="container home">
      {/* Left Section */}
      <div className="home__left__container">
        <div className="home__left__heading">
          <h1>CUSTOM SHIRT DESIGNS</h1>
          <h3>Choose from our designs or create one of your own!</h3>
        </div>

        <div className="home__left__contents">
          <div className="home__left__infos">
            <div>
              <p>Create your own t-shirts, sweaters, hoodies, and more!</p>
              <button className="home__left__buttons">
                Create your own designs
              </button>
            </div>
            <div>
              <p>Register to track your orders and save custom designs</p>
              <button className="home__left__buttons">Get Started</button>
            </div>
          </div>

          <span className="divider">
            <span className="border-t-[1px] border-solid border-white flex-auto min-w-[1px] pt-[8px] mt-[8px]"></span>
            <span className="px-[10px]">or</span>
            <span className="border-t-[1px] border-solid border-white flex-auto min-w-[1px] pt-[8px] mt-[8px]"></span>
          </span>

          <div className="home__left__choose__design">
            Choose our own designs
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div>PHOTO</div>
    </div>
  );
}

export default Home;
