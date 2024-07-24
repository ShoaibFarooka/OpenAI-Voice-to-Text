import { cx } from '../../../hooks/helpers'
import { useLocation } from 'react-router-dom';

const NavItem = ({ item }) => {

    // global
    const route = useLocation();

    return (
        <li key={item.id} className="nav-list">
            <a href={item.href} className={cx(
                "nav-link ",
                item.href === route.hash && "w--current"
            )}>
                {item.text}
            </a>
        </li>
    )
}

export default NavItem