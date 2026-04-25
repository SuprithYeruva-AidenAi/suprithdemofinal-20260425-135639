import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LandingPageNew from './pages/LandingPageNew';
import LoginWithNricFin from './pages/LoginWithNricFin';
import CreateAccountWithNric11 from './pages/CreateAccountWithNric11';
import SingpassLogin from './pages/SingpassLogin';
import SingpassDataForFormFilling from './pages/SingpassDataForFormFilling';
import Dashboard from './pages/Dashboard';
import OpenNotification from './pages/OpenNotification';
import DashboardNew from './pages/DashboardNew';
import Policies from './pages/Policies';
import PolicyDetails from './pages/PolicyDetails';
import Claims from './pages/Claims';
import Rewards from './pages/Rewards';
import FAQ from './pages/FAQ';
import FAQExpanded from './pages/FAQExpanded';

function App() {
  return (
    <div className="font-[Noto_Sans]">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPageNew />} />
          <Route path="/landing-old" element={<LandingPage />} />
          <Route path="/login" element={<LoginWithNricFin />} />
          <Route path="/login-with-nric-fin" element={<LoginWithNricFin />} />
          <Route path="/create-account" element={<CreateAccountWithNric11 />} />
          <Route path="/create-account-otp" element={<div className="min-h-screen flex items-center justify-center font-[Noto_Sans]"><p className="text-[20px] text-[#6e6e6e]">OTP Verification — coming soon</p></div>} />
          <Route path="/create-account-password" element={<div className="min-h-screen flex items-center justify-center font-[Noto_Sans]"><p className="text-[20px] text-[#6e6e6e]">Set Password — coming soon</p></div>} />
          <Route path="/singpass" element={<SingpassLogin />} />
          <Route path="/singpass-login" element={<SingpassLogin />} />
          <Route path="/singpass-consent" element={<SingpassDataForFormFilling />} />
          <Route path="/singpass-data-for-form-filling" element={<SingpassDataForFormFilling />} />
          <Route path="/dashboard" element={<DashboardNew />} />
          <Route path="/open-notification" element={<OpenNotification />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/policies/buy" element={<div className="min-h-screen flex items-center justify-center font-[Noto_Sans]"><p className="text-[20px] text-[#6e6e6e]">Buy Policy — coming soon</p></div>} />
          <Route path="/policies/:policyNo" element={<PolicyDetails />} />
          <Route path="/policy-details" element={<PolicyDetails />} />
          <Route path="/claims" element={<Claims />} />
          <Route path="/claims/new" element={<Claims />} />
          <Route path="/claims/:claimId" element={<Claims />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/faqexpanded" element={<FAQExpanded />} />
          <Route path="/settings" element={<div className="min-h-screen flex items-center justify-center font-[Noto_Sans]"><p className="text-[20px] text-[#6e6e6e]">Settings — coming soon</p></div>} />
          <Route path="/reset-password" element={<div className="min-h-screen flex items-center justify-center font-[Noto_Sans]"><p className="text-[20px] text-[#6e6e6e]">Reset Password — coming soon</p></div>} />
          <Route path="/error" element={<div className="min-h-screen flex items-center justify-center font-[Noto_Sans]"><p className="text-[20px] text-[#c62828]">An error occurred.</p></div>} />
          <Route path="/find-policy" element={<div className="min-h-screen flex items-center justify-center font-[Noto_Sans]"><p className="text-[20px] text-[#6e6e6e]">Find Policy — coming soon</p></div>} />
          <Route path="/payment/:receiptId" element={<div className="min-h-screen flex items-center justify-center font-[Noto_Sans]"><p className="text-[20px] text-[#6e6e6e]">Payment Receipt — coming soon</p></div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
