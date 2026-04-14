import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import {
  faBookBookmark,
  faEllipsisH,
  faEnvelope,
  faHashtag,
  faUserFriends,
  faBell,
  faUser,
  faHome,
  faFeatherAlt,
} from "@fortawesome/free-solid-svg-icons";

const NavItem = ({ icon, text }) => {
  return (
    <div className="flex items-center p-3 rounded-full cursor-pointer hover:bg-gray-800 transition duration-200 hover:scale-101">
      <FontAwesomeIcon icon={icon} className="text-2xl mr-4" />
      <span className="text-xl hidden xl:inline">{text}</span>
    </div>
  );
};

function Slidebar() {
  return (
    <div className="w-20 xl:w-64 sticky top-0 px-2 h-screen border-r border-twitter-dark-gray ">
      <FontAwesomeIcon
        icon={faTwitter}
        className="text-blue-400 text-3xl m-4"
      />
      <nav>
        <NavItem icon={faHome} text="Home" />
        <NavItem icon={faHashtag} text="Explore" />
        <NavItem icon={faBell} text="Notifications" />
        <NavItem icon={faEnvelope} text="Messages" />
        <NavItem icon={faBookBookmark} text="Bookmarks" />
        <NavItem icon={faUserFriends} text="Communities" />
        <NavItem icon={faTwitter} text="Premium" />
        <NavItem icon={faUser} text="Profile" />
        <NavItem icon={faEllipsisH} text="More" />
      </nav>

      <button className="bg-twitter-blue text-white rounded-full font-bold mt-4 w-12 h-12 xl:w-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition duration-200">
        <div className="xl:hidden flex items-center justify-center">
          <FontAwesomeIcon icon={faFeatherAlt} className="text-white text-xl" />
        </div>
        <span className="hidden xl:block">Postar</span>
      </button>
    </div>
  );
}

export default Slidebar;
