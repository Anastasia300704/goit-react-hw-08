// components/Navigation/Navigation.jsx
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      {/* Дополнительные ссылки можно добавить здесь */}
    </nav>
  );
};

export default Navigation;
