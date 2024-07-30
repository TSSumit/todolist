import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaBars, FaSearch, FaThList, FaThLarge, FaSun, FaMoon } from 'react-icons/fa';
import { RxCross1 } from 'react-icons/rx';
import { toggleDarkMode } from '../utils/darkModeSlice';
import { toggleDropDown } from '../utils/showDropDownSlice';
import { toggleListView } from '../utils/listViewSlice';

const Navbar = () => {
  // State for managing search input visibility
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef(null);

  // Redux state selectors
  const showDropDown = useSelector((state) => state.dropDown.showDropDown); 
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const isListView = useSelector((state) => state.listView.isListView);
  const dispatch = useDispatch();

  const toggleView = () => {
    dispatch(toggleListView());
  };

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  const handleToggleDropDown = () => {
    dispatch(toggleDropDown());
  };

  const handleSearchClick = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setIsSearchVisible(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    // Perform search with searchQuery
    if(searchQuery!=="")console.log('Searching for:', searchQuery);
    handleSearchClick();
    // handleSearchChange();

    // You might dispatch a search action or filter tasks here
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className={`w-full h-12  py-3 px-10 flex justify-between ${isDarkMode ? 'bg-gray-950 text-white' : 'bg-gray-200 text-gray-800'}`}>
      <div className="flex items-center gap-4">
        { showDropDown ? (
          <RxCross1 className="text-xl cursor-pointer" onClick={handleToggleDropDown} />
        ) : (
          <FaBars className="text-xl cursor-pointer" onClick={handleToggleDropDown} />
        )}
        <span className={`text-lg font-bold ${isDarkMode? 'text-green-400' : 'text-green-700'}`}>DoIt</span>
      </div>
      <div className="flex items-center gap-4 relative">
          { isSearchVisible ?( 
            <div className={` flex h-7`}  ref={searchRef}>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search..."
                className={`border p-2 rounded-md min-w-[25vw] ${isDarkMode ? 'bg-gray-950 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'}`}
              />
              <FaSearch className="text-xl cursor-pointer  text-center ml-3 my-auto" onClick={handleSearchSubmit} />
            </div>
          ):(
            <FaSearch className="text-xl cursor-pointer" onClick={handleSearchClick} />
          )
          }          
        {isListView ? (
          <FaThLarge className="text-xl cursor-pointer" onClick={toggleView} />
        ) : (
          <FaThList className="text-xl cursor-pointer" onClick={toggleView} />
        )}
        {isDarkMode ? (
          <FaSun className="text-xl cursor-pointer" onClick={handleToggleDarkMode} />
        ) : (
          <FaMoon className="text-xl cursor-pointer" onClick={handleToggleDarkMode} />
        )}
      </div>
    </header>
  );
};

export default Navbar;
