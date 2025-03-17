import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faHome, faShoppingBag, faUtensils, faCocktail, faStore, 
  faShoppingCart, faPaw, faUser, faList, faClock 
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li className="active">
            <FontAwesomeIcon icon={faHome} />
            <span>Home</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faShoppingBag} />
            <span>Grocery</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faStore} />
            <span>Retail</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faUtensils} />
            <span>Convenience</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faCocktail} />
            <span>Happy Hour</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faShoppingCart} />
            <span>DashMart</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faPaw} />
            <span>Pets</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faList} />
            <span>Browse All</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faClock} />
            <span>Orders</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faUser} />
            <span>Account</span>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
