import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import logo from "./Images/logo.png";
import Dashboard from "./screens/dashboard";
import Login from "./screens/login";
import ScanQr from "./screens/qrScan/ScanQr";
import BasicTable from "./screens/questions";

function App() {
  return (
    <div className="App">
      <img src={logo} className="img" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/scanQr" element={<ScanQr />} />
          <Route path="/questions" element={<BasicTable />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
      {/* <ScanQr /> */}
    </div>
  );
}

export default App;
