import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('Travel');
  const [activeFilter, setActiveFilter] = useState('All');

  // Banner carousel
  const slides = [
    "https://s3-alpha-sig.figma.com/img/b174/518e/b937b0d57f4c2d0945d9af6744ea37cb?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=IgUA6SYvFf2bjGgsXM9J5LdtV64i7P4flXUmwMMHKPU2p-1U2k5xNVoMDLJGb36~0R9fhLA3-R4J8Oa6ZcLqag1QpNk-HKKxxuU-CGLDPXJ2bCTGjAYI75AgmPGXwCbFnru0pQrP17-RGZWVmZztqjrrj0iyzMaGAQi~e3rOYgP~wEvKIk~GREpl6aAlwcSxDSPWAwZ2HudtFnl80kbsFHUXAwYD7eLzdB1NQekU82kBZTpg1MxSE~pEY11CYUeEZ84SO-hyRPP68HVlYDyWBWmAFvksSIFj7q4WsTeptzmtxQeWEv2o2YTErSwcjm4BaJC1BmcmX7hfIVbtkZtFbw__",
    "https://s3-alpha-sig.figma.com/img/b174/518e/b937b0d57f4c2d0945d9af6744ea37cb?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=IgUA6SYvFf2bjGgsXM9J5LdtV64i7P4flXUmwMMHKPU2p-1U2k5xNVoMDLJGb36~0R9fhLA3-R4J8Oa6ZcLqag1QpNk-HKKxxuU-CGLDPXJ2bCTGjAYI75AgmPGXwCbFnru0pQrP17-RGZWVmZztqjrrj0iyzMaGAQi~e3rOYgP~wEvKIk~GREpl6aAlwcSxDSPWAwZ2HudtFnl80kbsFHUXAwYD7eLzdB1NQekU82kBZTpg1MxSE~pEY11CYUeEZ84SO-hyRPP68HVlYDyWBWmAFvksSIFj7q4WsTeptzmtxQeWEv2o2YTErSwcjm4BaJC1BmcmX7hfIVbtkZtFbw__",
    "https://s3-alpha-sig.figma.com/img/b174/518e/b937b0d57f4c2d0945d9af6744ea37cb?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=IgUA6SYvFf2bjGgsXM9J5LdtV64i7P4flXUmwMMHKPU2p-1U2k5xNVoMDLJGb36~0R9fhLA3-R4J8Oa6ZcLqag1QpNk-HKKxxuU-CGLDPXJ2bCTGjAYI75AgmPGXwCbFnru0pQrP17-RGZWVmZztqjrrj0iyzMaGAQi~e3rOYgP~wEvKIk~GREpl6aAlwcSxDSPWAwZ2HudtFnl80kbsFHUXAwYD7eLzdB1NQekU82kBZTpg1MxSE~pEY11CYUeEZ84SO-hyRPP68HVlYDyWBWmAFvksSIFj7q4WsTeptzmtxQeWEv2o2YTErSwcjm4BaJC1BmcmX7hfIVbtkZtFbw__"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const tabs = [
    { id: 'Travel', icon: 'material-symbols:flight', label: 'Travel' },
    { id: 'Motor', icon: 'material-symbols:directions-car', label: 'Motor' },
    { id: 'Helper', icon: 'material-symbols:person', label: 'Helper' },
    { id: 'Home', icon: 'material-symbols:home', label: 'Home' },
    { id: 'Hospital', icon: 'material-symbols:local-hospital', label: 'Hospital Prot' }
  ];

  const notifications = [
    {
      title: 'Policy Cancellation Successful',
      message: 'UniHome - PNF320104124A23 policy has been cancelled. S$XX.XX will be refunded to your ****9111 ending 4123 within 14 working days.',
      date: '14 Feb 2026',
      category: 'Policy',
      unread: true
    },
    {
      title: 'Scheduled Maintenance',
      message: 'Corporate insurance will be unavailable due to scheduled maintenance on 14 March, 9pm to 6pm.',
      date: '03 Feb 2026',
      category: 'System',
      unread: false
    },
    {
      title: 'Password Expiring',
      message: 'Your password will expire in 7 days. Update now to avoid any issues.',
      date: '03 Jan 2026',
      category: 'System',
      unread: false
    },
    {
      title: 'Update of Privacy Policy',
      message: 'Our Privacy Policy has been updated.',
      date: '03 Jan 2026',
      category: 'System',
      unread: false
    }
  ];

  const filteredNotifications = activeFilter === 'Unread (1)' 
    ? notifications.filter(n => n.unread)
    : notifications;

  return (
    <div className="font-[Noto_Sans] h-screen w-full flex flex-col md:flex-row overflow-hidden bg-[#ffffff]">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-[12px_16px] bg-[#ffffff] border-b border-[#000000]/[0.09]">
        <div className="flex items-center gap-[12px]">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-[4px]">
            <Icon icon="material-symbols:menu" width={24} height={24} style={{color: '#212121'}} />
          </button>
          <img src="https://s3-alpha-sig.figma.com/img/26ec/3ab4/0588c7482da725dcdeb68b2897f9bde2?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ShoM0pDLFtIglvPWeRLcrNHkP-8DajZ~UfTydATZnIyvxRx0Q8vNaKu-xBitsol0veqqwq1r4p1azXwhatXwj7sKArxvuNthVWmFirx22koohe8997mFNM6GF2P9FJZQ6hnguVRCcCTWizRFgiWWnqabTviIJl1EuaMxA65dwinn4u47OVQuKOW4HPfBJ49i-x-lqHrsAbGLy9XfBAQqpYzMCSsmnWFH-jgrpSRysU3HqoilRLqyQb6LtiIX7mix4qKeTiJI50ywXWQYf5zHXGyqc7Ry5JQaJUdS88v~1e1Kd-i6t7RipipnfhyJG71UbhW-m-9vh~8Pv9t2nKWPxg__" className="w-[59px] h-[30px]" alt="Logo" />
        </div>
        <button onClick={() => setNotificationOpen(!notificationOpen)} className="p-[4px] relative">
          <Icon icon="material-symbols:notifications" width={24} height={24} style={{color: '#212121'}} />
          <div className="absolute -top-[2px] -right-[2px] w-[8px] h-[8px] bg-[#dc3545] rounded-full" />
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className={`hidden md:flex md:flex-col w-[240px] h-full shrink-0 bg-[#ffffff] border-r border-[#000000]/[0.09] shadow-[0px_1px_4px_rgba(0,0,0,0.05)]`}>
        <div className="flex flex-col gap-[24px] p-[24px_16px]">
          <div className="flex flex-col gap-[10px]">
            <img src="https://s3-alpha-sig.figma.com/img/26ec/3ab4/0588c7482da725dcdeb68b2897f9bde2?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ShoM0pDLFtIglvPWeRLcrNHkP-8DajZ~UfTydATZnIyvxRx0Q8vNaKu-xBitsol0veqqwq1r4p1azXwhatXwj7sKArxvuNthVWmFirx22koohe8997mFNM6GF2P9FJZQ6hnguVRCcCTWizRFgiWWnqabTviIJl1EuaMxA65dwinn4u47OVQuKOW4HPfBJ49i-x-lqHrsAbGLy9XfBAQqpYzMCSsmnWFH-jgrpSRysU3HqoilRLqyQb6LtiIX7mix4qKeTiJI50ywXWQYf5zHXGyqc7Ry5JQaJUdS88v~1e1Kd-i6t7RipipnfhyJG71UbhW-m-9vh~8Pv9t2nKWPxg__" className="w-[100px] h-[51px]" alt="Logo" />
          </div>
          <div className="flex flex-col gap-[12px]">
            <div className="flex items-center gap-[12px] p-[10px_12px] bg-[#ffffff] bg-gradient-to-r from-[#005eb8]/[0.10] to-[#5c55eb]/[0.10] rounded-[8px]">
              <Icon icon="material-symbols:home" width={24} height={24} style={{color: '#005eb8'}} />
              <span className="text-[16px] font-medium leading-[24px] text-[#005eb8] font-[Noto_Sans]">Dashboard</span>
            </div>
          </div>
        </div>
        <div className="flex-1" />
        <div className="flex items-center justify-end gap-[12px] p-[16px]">
          <Icon icon="octicon:sidebar-collapse-24" width={24} height={24} style={{color: '#212121'}} />
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-[#000000]/[0.50]">
          <div className="w-[260px] h-full bg-[#ffffff] flex flex-col">
            <div className="flex items-center justify-between p-[12px_16px] border-b border-[#000000]/[0.09]">
              <div className="flex items-center gap-[12px]">
                <button onClick={() => setSidebarOpen(false)} className="p-[4px]">
                  <Icon icon="material-symbols:close" width={24} height={24} style={{color: '#212121'}} />
                </button>
                <img src="https://s3-alpha-sig.figma.com/img/26ec/3ab4/0588c7482da725dcdeb68b2897f9bde2?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ShoM0pDLFtIglvPWeRLcrNHkP-8DajZ~UfTydATZnIyvxRx0Q8vNaKu-xBitsol0veqqwq1r4p1azXwhatXwj7sKArxvuNthVWmFirx22koohe8997mFNM6GF2P9FJZQ6hnguVRCcCTWizRFgiWWnqabTviIJl1EuaMxA65dwinn4u47OVQuKOW4HPfBJ49i-x-lqHrsAbGLy9XfBAQqpYzMCSsmnWFH-jgrpSRysU3HqoilRLqyQb6LtiIX7mix4qKeTiJI50ywXWQYf5zHXGyqc7Ry5JQaJUdS88v~1e1Kd-i6t7RipipnfhyJG71UbhW-m-9vh~8Pv9t2nKWPxg__" className="w-[59px] h-[30px]" alt="Logo" />
              </div>
              <Icon icon="material-symbols:notifications" width={24} height={24} style={{color: '#212121'}} />
            </div>
            <div className="flex-1 flex flex-col p-[16px_12px_24px_12px] gap-[24px]">
              <div className="flex flex-col gap-[16px]">
                <div className="flex items-center gap-[16px] p-[10px_16px] bg-gradient-to-b from-[#005eb8]/[0.10] to-[#5c55eb]/[0.10] rounded-[8px]">
                  <Icon icon="material-symbols:home" width={28} height={28} style={{color: '#005eb8'}} />
                  <span className="text-[16px] font-medium leading-[24px] text-[#005eb8] font-[Noto_Sans]">Dashboard</span>
                </div>
                <div className="flex items-center gap-[16px] p-[10px_16px] bg-[#ffffff] rounded-[8px]">
                  <Icon icon="material-symbols:policy" width={28} height={28} style={{color: '#212121'}} />
                  <span className="text-[16px] leading-[24px] text-[#212121] font-[Noto_Sans]">Policies</span>
                </div>
                <div className="flex items-center gap-[16px] p-[10px_16px] bg-[#ffffff] rounded-[8px]">
                  <Icon icon="material-symbols:description" width={28} height={28} style={{color: '#212121'}} />
                  <span className="text-[16px] leading-[24px] text-[#212121] font-[Noto_Sans]">Claims</span>
                </div>
                <div className="flex items-center gap-[16px] p-[10px_16px] bg-[#ffffff] rounded-[8px]">
                  <Icon icon="material-symbols:card-giftcard" width={28} height={28} style={{color: '#212121'}} />
                  <span className="text-[16px] leading-[24px] text-[#212121] font-[Noto_Sans]">Rewards</span>
                </div>
              </div>
              <div className="flex flex-col gap-[24px] p-[0px_16px]">
                <span className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">Manage Account</span>
                <span className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">Help & Support</span>
                <span className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">Privacy Policy</span>
              </div>
            </div>
            <div className="flex items-center gap-[12px] p-[8px_16px]">
              <div className="flex items-center gap-[12px] flex-1">
                <div className="flex items-center justify-center w-[32px] h-[32px] bg-[#b3d1ff] rounded-[16px] p-[4px]">
                  <span className="text-[14px] font-medium leading-[21px] text-[#212121] font-[Noto_Sans]">CW</span>
                </div>
                <span className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">Chris Wong</span>
              </div>
              <Icon icon="material-symbols:logout" width={24} height={24} style={{color: '#212121'}} />
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Desktop Header */}
        <header className="hidden md:flex items-center justify-between p-[12px_24px] bg-[#ffffff] border-b border-[#000000]/[0.09]">
          <div className="flex-1" />
          <div className="flex items-center gap-[20px]">
            <Icon icon="carbon:help" width={24} height={24} style={{color: '#212121'}} />
            <button onClick={() => setNotificationOpen(!notificationOpen)} className="relative">
              <Icon icon="material-symbols:notifications" width={24} height={24} style={{color: '#212121'}} />
            </button>
            <div className="w-[1px] h-[32px] bg-[#000000]/[0.09] rounded-full" />
            <Icon icon="material-symbols:person" width={56} height={32} style={{color: '#b3d1ff'}} />
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto bg-[#ffffff] bg-gradient-to-b from-[#005eb8]/[0.07] to-[#5c55eb]/[0.07]">
          <div className="p-[24px_16px] md:p-[48px_32px_100px_32px] flex flex-col items-center gap-[28px]">
            <div className="w-full max-w-[980px] flex flex-col gap-[32px]">
              {/* Greeting Section */}
              <div className="flex flex-col gap-[24px]">
                <div className="flex flex-col gap-[12px] md:items-center">
                  <h1 className="text-[28px] md:text-[32px] font-bold leading-[33.6px] md:leading-[38.4px] text-[#212121] font-[Noto_Sans]">Good evening, Chris 👋</h1>
                  <p className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#6e6e6e] font-[Noto_Sans]">Here's an overview of your insurance policies and recent activities</p>
                </div>
                
                {/* Banner Slider */}
                <div className="relative w-full h-[200px] md:h-[270px] rounded-[8px] overflow-hidden shadow-[0px_1px_4px_rgba(0,0,0,0.05)]">
                  <img src={slides[currentSlide]} className="w-full h-full object-cover transition-opacity duration-500" alt="Banner" />
                  <button onClick={prevSlide} className="absolute left-[8px] top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-[8px] shadow-md">
                    <Icon icon="material-symbols:chevron-left" width={20} height={20} style={{color: '#212121'}} />
                  </button>
                  <button onClick={nextSlide} className="absolute right-[8px] top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-[8px] shadow-md">
                    <Icon icon="material-symbols:chevron-right" width={20} height={20} style={{color: '#212121'}} />
                  </button>
                  <div className="absolute bottom-[12px] left-1/2 -translate-x-1/2 flex gap-[8px]">
                    {slides.map((_, i) => (
                      <div key={i} onClick={() => setCurrentSlide(i)} className={`w-[8px] h-[8px] rounded-full cursor-pointer transition-colors ${i === currentSlide ? 'bg-white' : 'bg-white/50'}`} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-col gap-[16px] md:gap-[20px]">
                <h2 className="text-[16px] md:text-[20px] font-bold leading-[24px] text-[#212121] font-[Noto_Sans]">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-[12px] md:gap-[20px]">
                  <div className="flex flex-col md:flex-row items-center gap-[8px] md:gap-[12px] p-[12px] md:p-[16px] bg-[#ffffff] rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] cursor-pointer hover:opacity-90 transition-opacity">
                    <Icon icon="material-symbols:keyboard-arrow-up" width={32} height={32} style={{color: '#212121'}} />
                    <div className="flex flex-col gap-[4px] text-center md:text-left">
                      <span className="text-[14px] md:text-[16px] font-medium leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">Submit Claim</span>
                      <span className="hidden md:block text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Prepare documents for claims</span>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center gap-[12px] p-[16px] bg-[#ffffff] rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] cursor-pointer hover:opacity-90 transition-opacity">
                    <div className="w-[24px] h-[24px] bg-[#ffffff] bg-gradient-to-r from-[#005eb8]/[0.10] to-[#5c55eb]/[0.10] rounded-[75px] flex items-center justify-center" />
                    <div className="flex flex-col gap-[4px]">
                      <span className="text-[16px] font-medium leading-[24px] text-[#212121] font-[Noto_Sans]">Buy New Policy</span>
                      <span className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Explore a wide range of policies</span>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center gap-[12px] p-[16px] bg-[#ffffff] rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] cursor-pointer hover:opacity-90 transition-opacity">
                    <div className="w-[24px] h-[24px] bg-[#ffffff] bg-gradient-to-r from-[#005eb8]/[0.10] to-[#5c55eb]/[0.10] rounded-[75px] flex items-center justify-center" />
                    <div className="flex flex-col gap-[4px]">
                      <span className="text-[16px] font-medium leading-[24px] text-[#212121] font-[Noto_Sans]">Help & Support</span>
                      <span className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Learn more about our FAQs</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Your Coverage */}
              <div className="flex flex-col gap-[12px] md:gap-[20px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[4px] md:gap-[8px]">
                    <h2 className="text-[16px] md:text-[20px] font-bold leading-[24px] text-[#212121] font-[Noto_Sans]">Your Coverage</h2>
                    <span className="text-[16px] md:text-[20px] leading-[24px] text-[#6e6e6e] font-[Noto_Sans]">(5)</span>
                  </div>
                  <div className="flex items-center gap-[8px] cursor-pointer">
                    <span className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#0d6efd] font-[Noto_Sans]">View All</span>
                    <Icon icon="material-symbols:arrow-forward" width={16} height={16} style={{color: '#0d6efd'}} />
                  </div>
                </div>

                {/* Policy Tabs */}
                <div className="flex overflow-x-auto scrollbar-hide border-b border-[#000000]/[0.09] gap-[4px] md:gap-0">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex flex-col items-center gap-[8px] p-[8px_12px] min-w-[65px] md:min-w-[80px] ${
                        activeTab === tab.id ? 'border-b-2 border-[#005eb8]' : ''
                      }`}
                    >
                      <Icon icon={tab.icon} width={24} height={24} style={{color: activeTab === tab.id ? '#005eb8' : '#212121'}} />
                      <span className={`text-[12px] md:text-[14px] leading-[16px] md:leading-[21px] text-center font-[Noto_Sans] ${
                        activeTab === tab.id ? 'text-[#005eb8]' : 'text-[#212121]'
                      }`}>{tab.label}</span>
                    </button>
                  ))}
                </div>

                {/* Policy Content */}
                <div className="flex flex-col gap-[12px]">
                  {activeTab === 'Travel' && (
                    <div className="bg-[#ffffff] rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] overflow-hidden">
                      <div className="flex items-center justify-between p-[12px_16px] border-b border-[#000000]/[0.09]">
                        <div className="flex items-center gap-[8px]">
                          <Icon icon="material-symbols:flight" width={24} height={24} style={{color: '#212121'}} />
                          <span className="text-[16px] font-medium leading-[24px] text-[#212121] font-[Noto_Sans]">Travel</span>
                        </div>
                        <span className="bg-gradient-to-r from-[#005eb8] to-[#8c5cf5] text-white text-[10px] font-bold px-[10px] py-[3px] rounded-full uppercase tracking-wide">COVERED</span>
                      </div>
                      <div className="p-[12px] flex flex-col gap-[16px]">
                        <div className="flex items-center justify-between p-[8px_12px] bg-[#ffffff] bg-gradient-to-b from-[#005eb8]/[0.07] to-[#5c55eb]/[0.07] rounded-[8px] border border-[#e0e0e0]">
                          <div className="flex-1">
                            <span className="text-[14px] font-medium leading-[21px] bg-gradient-to-r from-[#005eb8] to-[#5c55eb] bg-clip-text text-transparent font-[Noto_Sans]">New trip? Get covered in 2 mins.</span>
                          </div>
                          <button className="px-[16px] py-[8px] bg-[#005eb8] text-white text-[14px] font-medium leading-[21px] rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] font-[Noto_Sans]">Buy Now</button>
                        </div>
                        <div className="flex items-center justify-between p-[12px] bg-[#f9f9f9] rounded-[12px]">
                          <div className="flex flex-col gap-[4px] flex-1">
                            <div className="flex items-center gap-[8px]">
                              <span className="text-[16px] font-medium leading-[24px] text-[#212121] font-[Noto_Sans]">InsureTravel (Annual Trip)</span>
                              <span className="bg-[#e8f5e9] text-[#2e7d32] text-[11px] font-medium px-[8px] py-[2px] rounded-full">In Force</span>
                            </div>
                            <span className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Policy No: PNF320104124A23</span>
                          </div>
                          <Icon icon="material-symbols:chevron-right" width={16} height={16} style={{color: '#212121'}} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Rewards */}
              <div className="flex flex-col gap-[16px] md:gap-[20px]">
                <div className="flex items-center justify-between">
                  <h2 className="text-[16px] md:text-[20px] font-bold leading-[24px] text-[#212121] font-[Noto_Sans]">Rewards</h2>
                  <div className="flex items-center gap-[8px] cursor-pointer">
                    <span className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#0d6efd] font-[Noto_Sans]">View All</span>
                    <Icon icon="material-symbols:arrow-forward" width={16} height={16} style={{color: '#0d6efd'}} />
                  </div>
                </div>
                
                <div className="flex overflow-x-auto scrollbar-hide gap-[20px]">
                  <div className="relative shrink-0 w-[240px] md:w-[313px] bg-[#ffffff] rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] overflow-hidden">
                    <img src="https://s3-alpha-sig.figma.com/img/3ccc/e6dc/76312628f87fe4b2face85c5785f97c9?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=GhaZPejTzke73Bac0TcIa9Ka8QfE1svJkJKAmX9vBmxuxClyX5GI605d2rWLR02X70oJAWg~aalQBukfGG7TAupVf84tGtC8uA3mFFdtu~CpDDoZ5Mds6AJuHjxSvF-aAU2s7q9cTSrC7J-hZ9Lud0ik~M9Kpl7AGE1nll7LSB0tXKhuyDrgHoQ0POfuhs766Iv7Bf6dFmdIQXNB0fDua5xyOuI7jUYQu3LyrFBt8--0QBFEi9TMQpLiszMlxmo2MYx7TnEVa7aAalfEuO81Uc9UoOQDZuS3jxs1umlWslzCFI32G7Z5NDCj5UhTMnQSRhIxjPOtQ9S6PftVMJW03g__" className="w-full h-[135px] md:h-[176px] object-cover" alt="KITH" />
                    <div className="p-[12px] md:p-[16px] flex flex-col gap-[16px] md:gap-[24px]">
                      <div className="flex flex-col gap-[8px] md:gap-[12px]">
                        <h3 className="text-[16px] font-medium leading-[24px] text-[#212121] font-[Noto_Sans]">10% off KITH by Casa Products</h3>
                        <p className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Enter promo code UOIKITH10 at checkout on www.kith.sg to enjoy the offer.</p>
                      </div>
                      <button className="w-auto self-start px-[20px] md:px-[16px] py-[10px] md:py-[12px] bg-[#005eb8] text-white text-[14px] md:text-[16px] font-medium leading-[21px] md:leading-[24px] rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] font-[Noto_Sans]">Shop Now</button>
                    </div>
                    <img src="https://s3-alpha-sig.figma.com/img/86bf/5a50/b8f3a3749921a7a5868d0591a840460d?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=roDYZCuP6L95dqOCJWUcchZ3j2HP8gd~x9MbTBJCHBULbSAd3GRACaGNZVY5f2SBbAQ5~gPFsFBMqRfz~Wmpxl7Zza0ZpLgIX5D-zdEe1BVX7EPzQXCMs26Afyrz1A-k0-TDwjDGZZsfftsUINAIE~iOkoXjGMtgScU6xOOTHNW~JL6Ip4AgOGfElYKGOeHY--5sMXi6qw~KPrMS8JG~FYUqwiIZlSpEeul~A~FGVIiHHqBOi~ZO-i0OUtklAkZsjLb3iBV~NtHCeWGa6G4zy2x6cPzDyTRqHozLZSh05vQYxseV-o361MFESUfScUeQMPNGr5tIyjDkLY-BvqOaSA__" className="absolute top-[8px] left-[8px] w-[36px] md:w-[52px] h-[36px] md:h-[52px] rounded-full object-cover" alt="KITH Logo" />
                  </div>
                  <div className="hidden md:block shrink-0">
                    <Icon icon="material-symbols:chevron-right" width={40} height={40} style={{color: '#212121'}} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      
        {/* Footer */}
              <footer className="w-full h-[53px] bg-[#005eb8] flex items-center justify-between px-[24px] shrink-0">
          <span className="text-[14px] leading-[21px] text-white font-[Noto_Sans]">Copyright © 2026 United Overseas Insurance Limited Co. Reg. No. 197100152R.</span>
          <span className="hidden md:block text-[14px] leading-[21px] text-white font-[Noto_Sans]">All Rights Reserved.</span>
        </footer>
      </div>

      {/* Notification Panel */}
      {notificationOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-end p-[16px] md:p-[50px_24px_0_0] bg-black/20 md:bg-transparent">
          <div className="w-full max-w-[400px] h-[600px] bg-[#ffffff] rounded-[24px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex flex-col gap-[16px] p-[24px] border-b border-[#000000]/[0.09]">
              <div className="flex items-center justify-between">
                <h2 className="text-[20px] font-bold leading-[24px] text-[#212121] font-[Noto_Sans]">Notifications</h2>
                <button onClick={() => setNotificationOpen(false)} className="p-[4px]">
                  <Icon icon="material-symbols:close" width={24} height={24} style={{color: '#212121'}} />
                </button>
              </div>
              <div className="flex items-center justify-between gap-[12px] flex-wrap">
                <div className="flex items-center gap-[8px]">
                  <button 
                    onClick={() => setActiveFilter('All')}
                    className={`px-[20px] py-[4px] rounded-[24px] border border-[#000000]/[0.09] text-[14px] font-medium leading-[21px] font-[Noto_Sans] ${
                      activeFilter === 'All' ? 'bg-[#ffffff] text-[#6e6e6e]' : 'bg-[#f9f9f9] text-[#6e6e6e]'
                    }`}
                  >
                    All
                  </button>
                  <button 
                    onClick={() => setActiveFilter('Unread (1)')}
                    className={`px-[20px] py-[4px] rounded-[24px] border border-[#000000]/[0.09] text-[14px] font-medium leading-[21px] font-[Noto_Sans] ${
                      activeFilter === 'Unread (1)' ? 'bg-[#f9f9f9] text-[#005eb8]' : 'bg-[#ffffff] text-[#6e6e6e]'
                    }`}
                  >
                    Unread (1)
                  </button>
                </div>
                <button className="text-[14px] font-medium leading-[21px] text-[#005eb8] font-[Noto_Sans]">Mark all as read</button>
              </div>
            </div>
            
            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto">
              {filteredNotifications.map((notification, index) => (
                <div key={index} className="p-[16px_24px] border-b border-[#000000]/[0.09] last:border-b-0">
                  <div className="flex flex-col gap-[8px]">
                    <div className="flex items-center gap-[8px]">
                      <h3 className="text-[14px] font-bold leading-[21px] text-[#212121] font-[Noto_Sans]">{notification.title}</h3>
                      {notification.unread && <div className="w-[8px] h-[8px] bg-[#dc3545] rounded-full" />}
                    </div>
                    <p className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">{notification.message}</p>
                    <div className="flex items-center gap-[8px]">
                      <span className="text-[12px] leading-[16.8px] text-[#8d8d8d] font-[Noto_Sans]">{notification.date}</span>
                      <span className="text-[12px] leading-[16.8px] text-[#8d8d8d] font-[Noto_Sans]">•</span>
                      <span className="text-[12px] leading-[16.8px] text-[#8d8d8d] font-[Noto_Sans]">{notification.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}