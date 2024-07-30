import { useSelector } from 'react-redux';
import Dropdown from './Dropdown';
import TasksContainer from './TasksContainer';


const MainContainer = () => {
    const showDropDown = useSelector((state) => state.dropDown.showDropDown); 
    const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
    
    

    return (
        <div className={`w-screen h-[calc(100vh-3rem)]  overflow-y-auto py-3 px-10 flex justify-center gap-5 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
            {(showDropDown && <Dropdown/>)}
            <TasksContainer/>
        </div>
    )
}


export default MainContainer;