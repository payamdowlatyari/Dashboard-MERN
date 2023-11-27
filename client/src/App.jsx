import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import AppRoutes from './routes/AppRoutes';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';   

function App() {

  const { dark } = useSelector((state) => state.theme);

  const setDataTheme = () => {
    if (dark) return 'dark'
    else return 'light'
  }

  useEffect(() => {
    console.log(dark)
    typeof window !== "undefined" && localStorage.setItem("dark", dark);

  }, [dark]);

  return (
    <div className='container' data-theme={setDataTheme()}>
          <AppRoutes />
    </div>
  );
}

export default App;
