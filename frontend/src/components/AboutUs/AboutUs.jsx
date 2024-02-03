import "./AboutUs.scss";

import portrait from "../../images/jim_boring.jpg";
import rockin from "../../images/jim-rockin.jpg";

function AboutUs() {
  {
    /* <img src={portrait} alt="Founder of All U Portait" width={500}/> */
  }
  return (
    <main className="about-us">
      <div className="about-main">
        <section className="about-section-1">
          <header>
            <h1>All - U</h1>
            <h2>Making Someone's Favorite Shirt since 1986!</h2>
          </header>

          <p>
            I'm Jim Holodak, the proud founder of ALL U, Inc. A family-owned and
            operated venture, we bring nearly four decades of expertise to the
            dynamic realms of screen printing and embroidery. My journey into
            the world of shirts began during my time at Siena College in upstate
            New York.
          </p>

          <p>
            What sets us apart is our commitment to serving the diverse needs of
            groups and events, initially focusing on college campuses across the
            northeast. This specialization inspired the birth of our unique
            name, ALL U (All Universities). Beyond its origin, ALL U
            encapsulates our philosophy – it's about All You! Whether it's all
            you want or all you need, we are dedicated to providing a
            comprehensive and personalized experience. Welcome to the ALL U
            family, where your satisfaction is our top priority.
          </p>
          {/* <p>
            My name is Jim Holodak, and we are ALL U, Inc. We are a family owned
            and operated company with nearly 40 years of experience in the
            screen printing and embroidery business. I got into the shirt
            business while still attending Siena College in upstate New York.
            Our initial niche was to service the groups and events on college
            campuses across the northeast -hence the name ALL U (All
            Universities). ALL U also means -All You! All you want, all you
            need...ALL U.
          </p> */}
        </section>
        <img src={rockin} alt="Founder Singing Photo" width={500} />
        <section className="about-section-2">
          <h2>Our Business</h2>
          <p>
            As our business grew over the years, we have been very fortunate to
            expand our customer relationships across the country. In addition to
            our wide variety of custom products, we also create several lines of
            licensed merchandise. Our partners include properties such as Nyan
            Cat, Curb Your Enthusiasm, The Three Stooges, Albert Einstein, I
            Love Lucy, Abbott and Costello. In addition to our many
            entertainment properties, we offer art and lifestyle lines of Mike
            Made This®, Stephen Huneck, Rubes, and several in-house lines. Our
            customers include many elementary schools, high schools and colleges
            in the northeast, as well as national retail accounts such as Hot
            Topic, Delia's, NBC, Universal Studios, Yankee Candle, Kohl's, The
            Smithsonian Institute, Cracker Barrel.
          </p>
          <p>
            My dedicated staff and I are proud to serve our community of
            customers, and we would love the chance to serve you. Whether you
            need an order of a dozen shirts or thousands, we would love to make
            your shirt one of your favorites.
          </p>
        </section>
      </div>
    </main>
  );
}
export default AboutUs;
