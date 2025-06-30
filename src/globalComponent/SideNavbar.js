import { Link, useNavigate } from 'react-router-dom';
import { removeUserFromLocalStorage } from '../utils/localStorage';
import { ADMIN_NAV_ITEMS, PATIENT_NAV_ITEMS } from '../utils/constants';
import { users } from '../mockAPI/users';
import { patients } from '../mockAPI/patients';
import { incidents } from '../mockAPI/incidents';

const SideNavbar = ({ role, isOpen, setIsOpen }) => {
  const naviagte = useNavigate();

  const handleLogout = () => {
    removeUserFromLocalStorage();
    setIsOpen(false);
    naviagte("/login");
  };

  const handleReset = () => {
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('patients', JSON.stringify(patients));
    localStorage.setItem('incidents', JSON.stringify(incidents));
    setIsOpen(false);
    window.location.reload();
  };

  return (
    <div
      className={`fixed flex flex-col h-screen w-screen bg-gradient-to-tr to-[#f8fdff] via-[#c0ecff] from-[#f8fdff] font-mono transform transition-transform duration-500 z-1000 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex flex-row-reverse">
        <p
          className="font-bold text-4xl text-right p-2 pr-4 cursor-pointer w-fit"
          onClick={() => setIsOpen(false)}
        >
          x
        </p>
      </div>

      <div className="flex flex-col justify-between h-full py-2 pb-8">
        <div>
          {(role === "Admin" ? ADMIN_NAV_ITEMS : PATIENT_NAV_ITEMS).map((e, i) => (
            <Link to={e.to} key={i}>
              <div
                className="text-2xl text-center p-4 shadow-2xl cursor-pointer hover:border"
                onClick={() => setIsOpen(false)}
              >
                {e.name}
              </div>
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-2 items-start px-4">
          <div
            className="flex items-center h-10 text-2xl font-bold w-fit cursor-pointer hover:text-red-400"
            onClick={handleLogout}
          >
            ⏻logout
          </div>
          <div
            className="flex items-center h-10 text-2xl font-bold w-fit cursor-pointer hover:text-blue-400"
            onClick={handleReset}
          >
            🔄reset
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;
