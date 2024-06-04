import ErrorBannerLeft from "../../Assests/PageNotFoundImages/banner_left.webp";
import PageNotFoundImage from "../../Assests/PageNotFoundImages/404.svg";
import "./PageNotFound.css";

const PageNotFound = () => {
  return (
    <div className="error_banner_area">
      <image src={ErrorBannerLeft} />
      <div className="error_banner_left"></div>
      <div className="error_banner_right"></div>
      <div className="error_banner_center">
        <img src={PageNotFoundImage} alt="404" />
        <p>
          The page you are looking for has been moved or does not exist anymore.
        </p>
        <p>
          Go back to <a href="/login">Login Page</a>
        </p>
      </div>
    </div>
  );
};

export default PageNotFound;
