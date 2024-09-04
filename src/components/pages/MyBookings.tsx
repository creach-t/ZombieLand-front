import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

/* eslint-disable react/react-in-jsx-scope */
function MyBookings() {
  const { user } = useContext(UserContext);
  return (
    <main className="bg-black h-full w-full mt-[104px] flex flex-col items-center pt-5 max-w-screen-2xl mx-auto">
      <h1 className="text-6xl text-center md:text-left mb-12">
        MON <em className="text-redZombie">COMPTE</em>
      </h1>
      <Link
        to={`/mon-compte/${user.userId}`}
        className="text-3xl text-white border-white border-2 rounded-xl px-8 py-2 text-center mb-10"
      >
        Mes <em className="text-redZombie ">Informations</em>
      </Link>
      <div className="w-3/4 mx-auto">
        <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
          <table className="w-full text-left table-auto min-w-max">
            <thead>
              <tr>
                <th className="p-3 border-b border-slate-200 bg-slate-50">
                  <p className="text-sm font-semibold leading-none text-slate-800">
                    #
                  </p>
                </th>
                <th className="p-3 border-b border-slate-200 bg-slate-50">
                  <p className="text-sm font-semibold leading-none text-slate-800">
                    Nombre de billet(s)
                  </p>
                </th>
                <th className="p-3 border-b border-slate-200 bg-slate-50">
                  <p className="text-sm font-semibold leading-none text-slate-800">
                    Prix (€)
                  </p>
                </th>
                <th className="p-3 border-b border-slate-200 bg-slate-50">
                  <p className="text-sm font-semibold leading-none text-slate-800">
                    Date
                  </p>
                </th>
                <th className="p-3 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                  <p className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500"></p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-slate-50 border-b border-slate-200">
                <td className="p-3">
                  <p className="block font-semibold text-sm text-slate-600">
                    1
                  </p>
                </td>
                <td className="p-3 ">
                  <p className="text-sm text-slate-500">1</p>
                </td>
                <td className="p-3 ">
                  <p className="text-sm text-slate-500">€66.66</p>
                </td>
                <td className="p-3 ">
                  <p className="text-sm text-slate-500">2024-08-01</p>
                </td>
                <td className="p-3 border-b border-slate-200">
                  <button
                    className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/20 bg-white disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                  >
                    <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        className="w-4 h-4"
                      >
                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
                      </svg>
                    </span>
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 border-b border-slate-200">
                <td className="p-3 ">
                  <p className="block font-semibold text-sm text-slate-600">
                    2
                  </p>
                </td>
                <td className="p-3 ">
                  <p className="text-sm text-slate-500">1</p>
                </td>
                <td className="p-3 ">
                  <p className="text-sm text-slate-500">€66.66</p>
                </td>
                <td className="p-3 ">
                  <p className="text-sm text-slate-500">2024-08-05</p>
                </td>
                <td className="p-3 border-b border-slate-200">
                  <button
                    className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/20 bg-white disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                  >
                    <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        className="w-4 h-4"
                      >
                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
                      </svg>
                    </span>
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 border-b border-slate-200">
                <td className="p-3 ">
                  <p className="block font-semibold text-sm text-slate-600">
                    3
                  </p>
                </td>
                <td className="p-3 ">
                  <p className="text-sm text-slate-500">1</p>
                </td>
                <td className="p-3 ">
                  <p className="text-sm text-slate-500">€66.66</p>
                </td>
                <td className="p-3 ">
                  <p className="text-sm text-slate-500">2024-08-07</p>
                </td>
                <td className="p-3 border-b border-slate-200">
                  <button
                    className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/20 bg-white disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                  >
                    <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        className="w-4 h-4"
                      >
                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
                      </svg>
                    </span>
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 border-b border-slate-200">
                <td className="p-3 ">
                  <p className="block font-semibold text-sm text-slate-600">
                    4
                  </p>
                </td>
                <td className="p-3 ">
                  <p className="text-sm text-slate-500">1</p>
                </td>
                <td className="p-3 ">
                  <p className="text-sm text-slate-500">€66.66</p>
                </td>
                <td className="p-3 ">
                  <p className="text-sm text-slate-500">2024-08-10</p>
                </td>
                <td className="p-3 border-b border-slate-200">
                  <button
                    className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/20 bg-white disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                  >
                    <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        className="w-4 h-4"
                      >
                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
                      </svg>
                    </span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex justify-between items-center px-4 py-3">
            <div className="text-sm text-slate-500">
              Showing <b>1-5</b> of 45
            </div>
            <div className="flex space-x-1">
              <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                Prev
              </button>
              <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-white bg-slate-800 border border-slate-800 rounded hover:bg-slate-600 hover:border-slate-600 transition duration-200 ease">
                1
              </button>
              <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                2
              </button>
              <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                3
              </button>
              <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MyBookings;
