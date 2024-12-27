import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import { Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MenShirts from './pages/MenShirts';
import TravelBags from './pages/TravelBags';


export default function App() {
  return (
    <>
      <Header />
        <main className="flex-grow-1">

            <section className="vh-100">
          <div id="mainCarousel" className="carousel slide h-100" data-bs-ride="carousel">

            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#mainCarousel"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#mainCarousel"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
            </div>


            <div className="carousel-inner h-100">
              <div className="carousel-item active h-100">
                <Link to="/shirts">
                  <img
                    src="https://res.cloudinary.com/djain1xja/image/upload/v1733303100/andrej-lisakov-roksTutEPSo-unsplash_l0eqm7.jpg"
                    className="d-block w-100 h-100"
                    alt="Men's T-shirt Collection"
                    style={{ objectFit: "cover" }}
                  />
                </Link>
                <div className="carousel-caption d-none d-md-block">
                  <h5 className="display-4 fw-bold text-light">Men's Shirt Collection</h5>
                  <p className="fs-5 text-light">Explore trendy and comfortable designs for every occasion.</p>
                </div>
              </div>

              <div className="carousel-item h-100">
                <Link to="/travelbags">
                  <img
                    src="https://res.cloudinary.com/djain1xja/image/upload/v1732457734/travel-bag-4326732_1280_qe2xtb.jpg"
                    className="d-block w-100 h-100"
                    alt="Travel Bags"
                    style={{ objectFit: "cover" }}
                  />
                </Link>
                <div className="carousel-caption d-none d-md-block">
                  <h5 className="display-4 fw-bold text-light">Travel Bags</h5>
                  <p className="fs-5 text-light">
                    Discover durable and stylish travel companions for your adventures.
                  </p>
                </div>
              </div>

             
            </div>
          </div>
        </section>


            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#mainCarousel"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#mainCarousel"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
        </main> 
      <Footer />    
    </>
  );
}