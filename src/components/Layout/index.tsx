import { NavLink, Outlet } from 'react-router-dom';
import { Header, Wrapper } from './styles';

const Layout = () => {
  return (
    <Wrapper>
      <div className="contentWrapper">
        <Header>
          <ul>
            <li className="logo">
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'active' : 'not-active'
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'active' : 'not-active'
                }
                to="/feeds"
              >
                Feeds
              </NavLink>
            </li>
          </ul>
        </Header>

        <main>
          <Outlet />
          {/* Outlet renders the matched child route */}
        </main>
      </div>
    </Wrapper>
  );
};

export default Layout;
