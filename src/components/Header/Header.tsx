import "./index.css";

export function Header(): React.ReactElement {
  return (
    <header className="site-header">
      <nav className="site-nav">
        <div className="logo">
          <a href="#">
            <span>ToDo</span>
          </a>
        </div>
        <div >
          <ul className="mainmenu">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
                <a href="#">About</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
