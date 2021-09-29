import "./footer.css";
const Footer = () => {
  return (
    <footer className="container">
      <div className="footer_main">
        <div className="col_1">
          {" "}
          <p>
            Made with <span>React</span> at{" "}
            <a href="https://www.lereacteur.io/">Le Reacteur</a> By{" "}
            <a href="https://github.com/polatonur">Onur</a>
          </p>
        </div>
        <div className="col_1">
          <h2>
            Powered by{" "}
            <a href="https://api.rawg.io/docs/" className="api">
              RAWG API
            </a>
          </h2>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
