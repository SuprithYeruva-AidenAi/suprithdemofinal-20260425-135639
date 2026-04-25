import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Sidebar from '../components/Sidebar';
import MobileSidebar from '../components/MobileSidebar';
import { DashboardService, type DashboardModel } from '../services/dashboardService';
import { UOITimeoutError, UOIUnavailableError, UOIUpstreamError } from '../api/uoi';

export default function DashboardNew() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Travel');
  const [notificationOpen, setNotificationOpen] = useState(false);

  // API state
  const [dashboardData, setDashboardData] = useState<DashboardModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const slides = [
    "https://s3-alpha-sig.figma.com/img/b174/518e/b937b0d57f4c2d0945d9af6744ea37cb?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=IgUA6SYvFf2bjGgsXM9J5LdtV64i7P4flXUmwMMHKPU2p-1U2k5xNVoMDLJGb36~0R9fhLA3-R4J8Oa6ZcLqag1QpNk-HKKxxuU-CGLDPXJ2bCTGjAYI75AgmPGXwCbFnru0pQrP17-RGZWVmZztqjrrj0iyzMaGAQi~e3rOYgP~wEvKIk~GREpl6aAlwcSxDSPWAwZ2HudtFnl80kbsFHUXAwYD7eLzdB1NQekU82kBZTpg1MxSE~pEY11CYUeEZ84SO-hyRPP68HVlYDyWBWmAFvksSIFj7q4WsTeptzmtxQeWEv2o2YTErSwcjm4BaJC1BmcmX7hfIVbtkZtFbw__",
    "https://s3-alpha-sig.figma.com/img/b174/518e/b937b0d57f4c2d0945d9af6744ea37cb?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=IgUA6SYvFf2bjGgsXM9J5LdtV64i7P4flXUmwMMHKPU2p-1U2k5xNVoMDLJGb36~0R9fhLA3-R4J8Oa6ZcLqag1QpNk-HKKxxuU-CGLDPXJ2bCTGjAYI75AgmPGXwCbFnru0pQrP17-RGZWVmZztqjrrj0iyzMaGAQi~e3rOYgP~wEvKIk~GREpl6aAlwcSxDSPWAwZ2HudtFnl80kbsFHUXAwYD7eLzdB1NQekU82kBZTpg1MxSE~pEY11CYUeEZ84SO-hyRPP68HVlYDyWBWmAFvksSIFj7q4WsTeptzmtxQeWEv2o2YTErSwcjm4BaJC1BmcmX7hfIVbtkZtFbw__",
    "https://s3-alpha-sig.figma.com/img/b174/518e/b937b0d57f4c2d0945d9af6744ea37cb?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=IgUA6SYvFf2bjGgsXM9J5LdtV64i7P4flXUmwMMHKPU2p-1U2k5xNVoMDLJGb36~0R9fhLA3-R4J8Oa6ZcLqag1QpNk-HKKxxuU-CGLDPXJ2bCTGjAYI75AgmPGXwCbFnru0pQrP17-RGZWVmZztqjrrj0iyzMaGAQi~e3rOYgP~wEvKIk~GREpl6aAlwcSxDSPWAwZ2HudtFnl80kbsFHUXAwYD7eLzdB1NQekU82kBZTpg1MxSE~pEY11CYUeEZ84SO-hyRPP68HVlYDyWBWmAFvksSIFj7q4WsTeptzmtxQeWEv2o2YTErSwcjm4BaJC1BmcmX7hfIVbtkZtFbw__"
  ];

  const rewardSlides = [
    "https://s3-alpha-sig.figma.com/img/3ccc/e6dc/76312628f87fe4b2face85c5785f97c9?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=GhaZPejTzke73Bac0TcIa9Ka8QfE1svJkJKAmX9vBmxuxClyX5GI605d2rWLR02X70oJAWg~aalQBukfGG7TAupVf84tGtC8uA3mFFdtu~CpDDoZ5Mds6AJuHjxSvF-aAU2s7q9cTSrC7J-hZ9Lud0ik~M9Kpl7AGE1nll7LSB0tXKhuyDrgHoQ0POfuhs766Iv7Bf6dFmdIQXNB0fDua5xyOuI7jUYQu3LyrFBt8--0QBFEi9TMQpLiszMlxmo2MYx7TnEVa7aAalfEuO81Uc9UoOQDZuS3jxs1umlWslzCFI32G7Z5NDCj5UhTMnQSRhIxjPOtQ9S6PftVMJW03g__"
  ];

  // Load dashboard data on mount
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    DashboardService.getSummary(controller.signal)
      .then((data) => {
        setDashboardData(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err?.name === 'AbortError') return;
        if (err instanceof UOITimeoutError) {
          setError('The service timed out. Please try again.');
        } else if (err instanceof UOIUnavailableError) {
          setError('The service is temporarily unavailable.');
        } else if (err instanceof UOIUpstreamError) {
          setError(err.message);
        } else {
          setError('Failed to load dashboard data.');
        }
        setLoading(false);
      });
    return () => controller.abort();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setError(null);
    DashboardService.refreshSummary()
      .then((data) => {
        setDashboardData(data);
        setRefreshing(false);
      })
      .catch((err) => {
        if (err instanceof UOITimeoutError) {
          setError('The service timed out. Please try again.');
        } else if (err instanceof UOIUnavailableError) {
          setError('The service is temporarily unavailable.');
        } else {
          setError('Failed to refresh dashboard data.');
        }
        setRefreshing(false);
      });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const tabs = [
    { id: 'Travel', label: 'Travel', icon: 'material-symbols:flight' },
    { id: 'Motor', label: 'Motor', icon: 'material-symbols:directions-car' },
    { id: 'Helper', label: 'Helper', icon: 'material-symbols:person' },
    { id: 'Home', label: 'Home', icon: 'material-symbols:home' },
    { id: 'Hospital', label: 'Hospital Protection', icon: 'material-symbols:local-hospital' },
    { id: 'Personal', label: 'Personal Accident', icon: 'material-symbols:person' }
  ];

  const handleHelpClick = () => {
    navigate('/faq');
  };

  // Derive greeting and user name from API data or fallback
  const greeting = dashboardData?.greeting ?? 'Good evening';
  const userName = dashboardData?.userName ?? 'there';

  // Find card data by product code
  const getCard = (code: string) =>
    dashboardData?.cards.find((c) => c.productCode === code);

  const travelCard = getCard('TR01');
  const motorCard = getCard('MO01');
  const helperCard = getCard('PA01') ?? getCard('HM01');
  const homeCard = getCard('HM01');

  return (
    <div className="font-[Noto_Sans] h-screen flex flex-row overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Right Column */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="shrink-0 flex items-center justify-between px-[24px] py-[12px] bg-white border-b border-[#000000]/[0.09]">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center gap-[12px]"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Icon icon="material-symbols:menu" width={24} height={24} style={{color: '#212121'}} />
            <img
              src="https://s3-alpha-sig.figma.com/img/26ec/3ab4/0588c7482da725dcdeb68b2897f9bde2?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ShoM0pDLFtIglvPWeRLcrNHkP-8DajZ~UfTydATZnIyvxRx0Q8vNaKu-xBitsol0veqqwq1r4p1azXwhatXwj7sKArxvuNthVWmFirx22koohe8997mFNM6GF2P9FJZQ6hnguVRCcCTWizRFgiWWnqabTviIJl1EuaMxA65dwinn4u47OVQuKOW4HPfBJ49i-x-lqHrsAbGLy9XfBAQqpYzMCSsmnWFH-jgrpSRysU3HqoilRLqyQb6LtiIX7mix4qKeTiJI50ywXWQYf5zHXGyqc7Ry5JQaJUdS88v~1e1Kd-i6t7RipipnfhyJG71UbhW-m-9vh~8Pv9t2nKWPxg__"
              className="w-[59px] h-[30px]"
              alt="Logo"
            />
          </button>

          {/* Desktop Header Icons */}
          <div className="hidden md:flex items-center gap-[20px] ml-auto">
            <button onClick={handleHelpClick}>
              <Icon icon="carbon:help" width={24} height={24} style={{color: '#212121'}} />
            </button>
            <button onClick={() => setNotificationOpen(!notificationOpen)}>
              <Icon icon="material-symbols:notifications" width={24} height={24} style={{color: '#212121'}} />
            </button>
            <div className="w-[1px] h-[32px] bg-[#000000]/[0.09] rounded-full" />
            <Icon icon="material-symbols:person" width={56} height={32} style={{color: '#b3d1ff'}} />
          </div>

          {/* Mobile Notification Icon */}
          <button className="md:hidden" onClick={() => setNotificationOpen(!notificationOpen)}>
            <Icon icon="material-symbols:notifications" width={24} height={24} style={{color: '#212121'}} />
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-white bg-gradient-to-b from-[#005eb8]/[0.07] to-[#5c55eb]/[0.07]">
          <div className="p-[24px] md:p-[48px_32px_100px_32px] max-w-[980px] mx-auto space-y-[28px] md:space-y-[32px]">

            {/* Error Banner */}
            {error && (
              <div className="flex items-center gap-[8px] px-[16px] py-[12px] bg-[#fce4ec] rounded-[8px]">
                <Icon icon="material-symbols:error" width={20} height={20} style={{color: '#c62828'}} />
                <span className="flex-1 text-[14px] leading-[21px] text-[#c62828] font-[Noto_Sans]">{error}</span>
                <button
                  onClick={handleRefresh}
                  className="text-[14px] font-medium text-[#005eb8] font-[Noto_Sans] hover:underline"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Greeting Section */}
            <div className="flex flex-col gap-[24px]">
              <div className="flex flex-col gap-[12px] text-center md:text-left">
                <div className="flex items-center gap-[12px] justify-center md:justify-start">
                  <h1 className="text-[28px] md:text-[32px] font-bold leading-[33.6px] md:leading-[38.4px] text-[#212121] font-[Noto_Sans]">
                    {loading ? 'Loading...' : `${greeting}, ${userName} \uD83D\uDC4B`}
                  </h1>
                  {!loading && (
                    <button
                      onClick={handleRefresh}
                      disabled={refreshing}
                      className="p-[4px] rounded-full hover:bg-[#f0f0f0] transition-colors"
                      title="Refresh dashboard"
                    >
                      <Icon
                        icon="material-symbols:refresh"
                        width={20}
                        height={20}
                        style={{color: refreshing ? '#b0b0b0' : '#6e6e6e'}}
                        className={refreshing ? 'animate-spin' : ''}
                      />
                    </button>
                  )}
                </div>
                <p className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-[#6e6e6e] font-[Noto_Sans]">
                  Here&apos;s an overview of your insurance policies and recent activities
                </p>
              </div>

              {/* Marketing Banner Slider */}
              <div className="relative overflow-hidden rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)]">
                <img
                  src={slides[currentSlide]}
                  className="w-full h-[200px] md:h-[270px] object-cover transition-opacity duration-500"
                  alt="Marketing Banner"
                />
                <div className="absolute bottom-[8px] left-1/2 transform -translate-x-1/2 flex gap-[4px]">
                  {slides.map((_, index) => (
                    <div
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-[6px] h-[6px] rounded-full cursor-pointer transition-colors ${
                        index === currentSlide ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col gap-[16px] md:gap-[20px]">
              <h2 className="text-[16px] md:text-[20px] font-bold leading-[24px] text-[#212121] font-[Noto_Sans]">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-[12px] md:gap-[20px]">
                <div className="flex flex-col md:flex-row items-center gap-[8px] md:gap-[12px] p-[12px] md:p-[16px] bg-white rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] cursor-pointer hover:opacity-90 transition-opacity">
                  <Icon icon="material-symbols:keyboard-arrow-up" width={32} height={32} style={{color: '#212121'}} />
                  <div className="flex flex-col gap-[4px] text-center md:text-left">
                    <span className="text-[14px] md:text-[16px] font-medium leading-[21px] md:leading-[24px] text-[#212121] font-[Noto_Sans]">Submit Claim</span>
                    <span className="hidden md:block text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Prepare documents for claims</span>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-[12px] p-[16px] bg-white rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] cursor-pointer hover:opacity-90 transition-opacity">
                  <div className="w-[24px] h-[24px] bg-white bg-gradient-to-r from-[#005eb8]/[0.10] to-[#5c55eb]/[0.10] rounded-[75px] flex items-center justify-center" />
                  <div className="flex flex-col gap-[4px] flex-1">
                    <span className="text-[16px] font-medium leading-[24px] text-[#212121] font-[Noto_Sans]">Buy New Policy</span>
                    <span className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Explore a wide range of policies</span>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-[12px] p-[16px] bg-white rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] cursor-pointer hover:opacity-90 transition-opacity">
                  <div className="w-[24px] h-[24px] bg-white bg-gradient-to-r from-[#005eb8]/[0.10] to-[#5c55eb]/[0.10] rounded-[75px] flex items-center justify-center" />
                  <div className="flex flex-col gap-[4px] flex-1">
                    <span className="text-[16px] font-medium leading-[24px] text-[#212121] font-[Noto_Sans]">Help &amp; Support</span>
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
                  {dashboardData && (
                    <span className="text-[16px] md:text-[20px] leading-[24px] text-[#6e6e6e] font-[Noto_Sans]">
                      ({dashboardData.cards.filter((c) => c.hasCoverage).length})
                    </span>
                  )}
                </div>
                <div
                  className="flex items-center gap-[8px] md:gap-[12px] cursor-pointer"
                  onClick={() => navigate('/policies')}
                >
                  <span className="text-[14px] md:text-[16px] font-medium leading-[21px] md:leading-[24px] text-[#0d6efd] font-[Noto_Sans]">View All</span>
                  <Icon icon="material-symbols:arrow-forward" width={16} height={16} style={{color: '#0d6efd'}} />
                </div>
              </div>

              {/* Mobile Tabs */}
              <div className="md:hidden flex overflow-x-auto scrollbar-hide border-b border-[#000000]/[0.09]">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-col items-center gap-[12px] px-[12px] py-[12px] min-w-[65px] ${
                      activeTab === tab.id ? 'border-b-2 border-[#005eb8]' : ''
                    }`}
                  >
                    <Icon
                      icon={tab.icon}
                      width={24}
                      height={24}
                      style={{color: activeTab === tab.id ? '#005eb8' : '#212121'}}
                    />
                    <span className={`text-[14px] leading-[21px] font-[Noto_Sans] text-center ${
                      activeTab === tab.id ? 'text-[#005eb8]' : 'text-[#212121]'
                    }`}>
                      {tab.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Loading skeleton */}
              {loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[12px] md:gap-[20px]">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-[160px] bg-white rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] animate-pulse" />
                  ))}
                </div>
              )}

              {/* Coverage Cards */}
              {!loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[12px] md:gap-[20px] items-stretch">
                  {/* Travel Card */}
                  <div className="h-full flex flex-col bg-white rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] overflow-hidden">
                    <div className="flex items-center justify-between p-[12px] md:p-[16px] border-b border-[#000000]/[0.09]">
                      <div className="flex items-center gap-[8px]">
                        <Icon icon="material-symbols:flight" width={24} height={24} style={{color: '#212121'}} />
                        <span className="text-[16px] font-medium leading-[24px] text-[#212121] font-[Noto_Sans]">Travel</span>
                      </div>
                      {travelCard?.hasCoverage ? (
                        <span className="bg-gradient-to-r from-[#005eb8] to-[#8c5cf5] text-white text-[10px] font-bold px-[10px] py-[3px] rounded-full uppercase tracking-wide">COVERED</span>
                      ) : (
                        <span className="bg-[#f5f5f5] text-[#8d8d8d] text-[12px] font-medium px-[8px] py-[4px] rounded-[24px]">NOT COVERED</span>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col p-[12px] md:p-[16px] gap-[12px] md:gap-[16px]">
                      {travelCard?.hasCoverage ? (
                        <>
                          <div className="flex items-center justify-between p-[8px_12px] bg-white bg-gradient-to-b from-[#005eb8]/[0.07] to-[#5c55eb]/[0.07] rounded-[8px] border border-[#e0e0e0]">
                            <span className="flex-1 text-[14px] font-medium leading-[21px] bg-gradient-to-r from-[#005eb8] to-[#5c55eb] bg-clip-text text-transparent font-[Noto_Sans]">New trip? Get covered in 2 minutes.</span>
                            <button className="px-[16px] py-[8px] bg-[#005eb8] text-white text-[14px] font-medium leading-[21px] rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] font-[Noto_Sans]">Buy Now</button>
                          </div>
                          {travelCard.recentItems.length > 0 ? (
                            travelCard.recentItems.map((item) => (
                              <div key={item.id} className="flex items-center justify-between p-[12px] bg-[#f9f9f9] rounded-[12px]">
                                <div className="flex flex-col gap-[4px] flex-1">
                                  <div className="flex items-center gap-[8px]">
                                    <span className="text-[16px] font-medium leading-[24px] text-[#212121] font-[Noto_Sans]">{item.title}</span>
                                    {item.status && (
                                      <span className="bg-[#e8f5e9] text-[#2e7d32] text-[11px] font-medium px-[8px] py-[2px] rounded-full">{item.status}</span>
                                    )}
                                  </div>
                                  <span className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Policy No: {item.id}</span>
                                </div>
                                <Icon icon="material-symbols:chevron-right" width={16} height={16} style={{color: '#212121'}} />
                              </div>
                            ))
                          ) : (
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
                          )}
                        </>
                      ) : (
                        <span className="text-[16px] leading-[24px] text-[#212121] font-[Noto_Sans]">Protect your travels from $X/year. Get quote here.</span>
                      )}
                    </div>
                  </div>

                  {/* Motor Card */}
                  <div className="h-full flex flex-col bg-white rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] overflow-hidden">
                    <div className="flex items-center justify-between p-[12px] md:p-[16px] border-b border-[#000000]/[0.09]">
                      <div className="flex items-center gap-[8px]">
                        <Icon icon="material-symbols:directions-car" width={24} height={24} style={{color: '#212121'}} />
                        <span className="text-[16px] font-medium leading-[24px] text-[#212121] font-[Noto_Sans]">Motor</span>
                      </div>
                      {motorCard?.hasCoverage ? (
                        <span className="bg-gradient-to-r from-[#005eb8] to-[#8c5cf5] text-white text-[10px] font-bold px-[10px] py-[3px] rounded-full uppercase tracking-wide">COVERED</span>
                      ) : (
                        <span className="bg-[#f5f5f5] text-[#8d8d8d] text-[12px] font-medium px-[8px] py-[4px] rounded-[24px]">NOT COVERED</span>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col p-[12px] md:p-[16px]">
                      {motorCard?.hasCoverage && motorCard.recentItems.length > 0 ? (
                        motorCard.recentItems.map((item) => (
                          <div key={item.id} className="flex items-center justify-between p-[12px] bg-[#f9f9f9] rounded-[12px] mb-[8px]">
                            <div className="flex flex-col gap-[4px] flex-1">
                              <span className="text-[16px] font-medium leading-[24px] text-[#212121] font-[Noto_Sans]">{item.title}</span>
                              {item.status && (
                                <span className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">{item.status}</span>
                              )}
                            </div>
                            <Icon icon="material-symbols:chevron-right" width={16} height={16} style={{color: '#212121'}} />
                          </div>
                        ))
                      ) : (
                        <span className="text-[16px] leading-[24px] text-[#212121] font-[Noto_Sans]">Protect your car from $X/year with your pre-filled details. Get quote here.</span>
                      )}
                    </div>
                  </div>

                  {/* Helper Card */}
                  <div className="h-full flex flex-col bg-white rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] overflow-hidden">
                    <div className="flex items-center justify-between p-[12px] md:p-[16px] border-b border-[#000000]/[0.09]">
                      <div className="flex items-center gap-[8px]">
                        <Icon icon="material-symbols:person" width={24} height={24} style={{color: '#212121'}} />
                        <span className="text-[16px] font-medium leading-[24px] text-[#212121] font-[Noto_Sans]">Helper</span>
                      </div>
                      {helperCard?.hasCoverage ? (
                        <span className="bg-gradient-to-r from-[#005eb8] to-[#8c5cf5] text-white text-[10px] font-bold px-[10px] py-[3px] rounded-full uppercase tracking-wide">COVERED</span>
                      ) : (
                        <span className="bg-[#f5f5f5] text-[#8d8d8d] text-[12px] font-medium px-[8px] py-[4px] rounded-[24px]">NOT COVERED</span>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col p-[12px] md:p-[16px] gap-[12px]">
                      {helperCard?.hasCoverage && helperCard.recentItems.length > 0 ? (
                        helperCard.recentItems.map((item) => (
                          <div key={item.id} className="flex items-center justify-between p-[12px] bg-[#f9f9f9] rounded-[12px]">
                            <div className="flex flex-col gap-[4px] flex-1">
                              <div className="flex items-center gap-[8px]">
                                <span className="text-[16px] font-medium leading-[24px] text-[#212121] font-[Noto_Sans]">{item.title}</span>
                                {item.status && (
                                  <span className="bg-[#e8f5e9] text-[#2e7d32] text-[11px] font-medium px-[8px] py-[2px] rounded-full">{item.status}</span>
                                )}
                              </div>
                              <span className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Policy No: {item.id}</span>
                            </div>
                            <Icon icon="material-symbols:chevron-right" width={16} height={16} style={{color: '#212121'}} />
                          </div>
                        ))
                      ) : (
                        <div className="flex items-center justify-between p-[12px] bg-[#f9f9f9] rounded-[12px]">
                          <div className="flex flex-col gap-[4px] flex-1">
                            <div className="flex items-center gap-[8px]">
                              <span className="text-[16px] font-medium leading-[24px] text-[#212121] font-[Noto_Sans]">UniHelper</span>
                              <span className="bg-[#e8f5e9] text-[#2e7d32] text-[11px] font-medium px-[8px] py-[2px] rounded-full">In Force</span>
                            </div>
                            <span className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Policy No: PNF320104124A23</span>
                          </div>
                          <Icon icon="material-symbols:chevron-right" width={16} height={16} style={{color: '#212121'}} />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Home Card */}
                  <div className="h-full flex flex-col bg-white rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] overflow-hidden">
                    <div className="flex items-center justify-between p-[12px] md:p-[16px] border-b border-[#000000]/[0.09]">
                      <div className="flex items-center gap-[8px]">
                        <Icon icon="material-symbols:home" width={24} height={24} style={{color: '#212121'}} />
                        <span className="text-[16px] font-medium leading-[24px] text-[#212121] font-[Noto_Sans]">Home</span>
                      </div>
                      {homeCard?.hasCoverage ? (
                        <span className="bg-gradient-to-r from-[#005eb8] to-[#8c5cf5] text-white text-[10px] font-bold px-[10px] py-[3px] rounded-full uppercase tracking-wide">COVERED</span>
                      ) : (
                        <span className="bg-[#f5f5f5] text-[#8d8d8d] text-[12px] font-medium px-[8px] py-[4px] rounded-[24px]">NOT COVERED</span>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col p-[12px] md:p-[16px] gap-[12px]">
                      {homeCard?.hasCoverage && homeCard.recentItems.length > 0 ? (
                        homeCard.recentItems.map((item) => (
                          <div key={item.id} className="flex items-center justify-between p-[12px] bg-[#f9f9f9] rounded-[12px]">
                            <div className="flex flex-col gap-[4px] flex-1">
                              <div className="flex items-center gap-[8px]">
                                <span className="text-[16px] font-medium leading-[24px] text-[#212121] font-[Noto_Sans]">{item.title}</span>
                                {item.status && (
                                  <span className="bg-[#fff8e1] text-[#e65100] text-[11px] font-medium px-[8px] py-[2px] rounded-full">{item.status}</span>
                                )}
                              </div>
                              <span className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Policy No: {item.id}</span>
                            </div>
                            <Icon icon="material-symbols:chevron-right" width={16} height={16} style={{color: '#212121'}} />
                          </div>
                        ))
                      ) : (
                        <div className="flex items-center justify-between p-[12px] bg-[#f9f9f9] rounded-[12px]">
                          <div className="flex flex-col gap-[4px] flex-1">
                            <div className="flex items-center gap-[8px]">
                              <span className="text-[16px] font-medium leading-[24px] text-[#212121] font-[Noto_Sans]">UniHome</span>
                              <span className="bg-[#fff8e1] text-[#e65100] text-[11px] font-medium px-[8px] py-[2px] rounded-full">Renewal Due</span>
                            </div>
                            <span className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Policy No: PNF320104124A23</span>
                          </div>
                          <Icon icon="material-symbols:chevron-right" width={16} height={16} style={{color: '#212121'}} />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Hospitalisation Protection Card */}
                  <div className="h-full flex flex-col bg-white rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] overflow-hidden">
                    <div className="flex items-center justify-between p-[12px] md:p-[16px] border-b border-[#000000]/[0.09]">
                      <div className="flex items-center gap-[8px]">
                        <Icon icon="material-symbols:local-hospital" width={24} height={24} style={{color: '#212121'}} />
                        <span className="text-[16px] font-medium leading-[24px] text-[#212121] font-[Noto_Sans]">Hospitalisation Protection</span>
                      </div>
                      <span className="bg-[#f5f5f5] text-[#8d8d8d] text-[12px] font-medium px-[8px] py-[4px] rounded-[24px]">NOT COVERED</span>
                    </div>
                    <div className="flex-1 flex flex-col p-[12px] md:p-[16px]">
                      <span className="text-[16px] leading-[24px] text-[#212121] font-[Noto_Sans]">Cover day-to-day expenses when hospitalised from $X/year. Get quote here.</span>
                    </div>
                  </div>

                  {/* Personal Accident Card */}
                  <div className="h-full flex flex-col bg-white rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] overflow-hidden">
                    <div className="flex items-center justify-between p-[12px] md:p-[16px] border-b border-[#000000]/[0.09]">
                      <div className="flex items-center gap-[8px]">
                        <Icon icon="material-symbols:person" width={24} height={24} style={{color: '#212121'}} />
                        <span className="text-[16px] font-medium leading-[24px] text-[#212121] font-[Noto_Sans]">Personal Accident</span>
                      </div>
                      <span className="bg-[#f5f5f5] text-[#8d8d8d] text-[12px] font-medium px-[8px] py-[4px] rounded-[24px]">NOT COVERED</span>
                    </div>
                    <div className="flex-1 flex flex-col p-[12px] md:p-[16px]">
                      <span className="text-[16px] leading-[24px] text-[#212121] font-[Noto_Sans]">Get medical coverage for accidents from $X/year with your pre-filled details. Get quote here.</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Rewards */}
            <div className="flex flex-col gap-[16px] md:gap-[20px]">
              <div className="flex items-center justify-between">
                <h2 className="text-[16px] md:text-[20px] font-bold leading-[24px] text-[#212121] font-[Noto_Sans]">Rewards</h2>
                <div className="flex items-center gap-[8px] md:gap-[12px] cursor-pointer" onClick={() => navigate('/rewards')}>
                  <span className="text-[14px] md:text-[16px] font-medium leading-[21px] md:leading-[24px] text-[#0d6efd] font-[Noto_Sans]">View All</span>
                  <Icon icon="material-symbols:arrow-forward" width={16} height={16} style={{color: '#0d6efd'}} />
                </div>
              </div>

              {/* Rewards Card */}
              <div className="flex overflow-x-auto gap-[20px] scrollbar-hide">
                <div className="relative shrink-0 w-[240px] md:w-[313px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] rounded-[8px] overflow-hidden">
                  <img
                    src={rewardSlides[0]}
                    className="w-full h-[135px] md:h-[176px] object-cover"
                    alt="KITH Reward"
                  />
                  <div className="flex flex-col justify-between p-[12px] md:p-[16px] bg-white gap-[12px] md:gap-[16px] h-[207px]">
                    <div className="flex flex-col gap-[8px] md:gap-[12px]">
                      <h3 className="text-[16px] font-medium leading-[24px] text-[#212121] font-[Noto_Sans]">10% off KITH by Casa Products</h3>
                      <p className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Enter promo code UOIKITH10 at checkout on www.kith.sg to enjoy the offer.</p>
                    </div>
                    <button className="w-auto self-start px-[20px] md:px-[16px] py-[12px] bg-[#005eb8] text-white text-[16px] font-medium leading-[24px] rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] font-[Noto_Sans]">Shop Now</button>
                  </div>
                  <img
                    src="https://s3-alpha-sig.figma.com/img/86bf/5a50/b8f3a3749921a7a5868d0591a840460d?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=roDYZCuP6L95dqOCJWUcchZ3j2HP8gd~x9MbTBJCHBULbSAd3GRACaGNZVY5f2SBbAQ5~gPFsFBMqRfz~Wmpxl7Zza0ZpLgIX5D-zdEe1BVX7EPzQXCMs26Afyrz1A-k0-TDwjDGZZsfftsUINAIE~iOkoXjGMtgScU6xOOTHNW~JL6Ip4AgOGfElYKGOeHY--5sMXi6qw~KPrMS8JG~FYUqwiIZlSpEeul~A~FGVIiHHqBOi~ZO-i0OUtklAkZsjLb3iBV~NtHCeWGa6G4zy2x6cPzDyTRqHozLZSh05vQYxseV-o361MFESUfScUeQMPNGr5tIyjDkLY-BvqOaSA__"
                    className="absolute top-[8px] left-[8px] w-[36px] md:w-[52px] h-[36px] md:h-[52px] rounded-full object-cover"
                    alt="KITH Logo"
                  />
                </div>
                <div className="hidden md:block shrink-0">
                  <Icon icon="material-symbols:chevron-right" width={40} height={40} style={{color: '#212121'}} />
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="shrink-0 flex items-center justify-between px-[24px] py-[16px] bg-[#005eb8] text-white">
          <span className="text-[14px] leading-[21px] font-[Noto_Sans]">Copyright &copy; 2026 United Overseas Insurance Limited Co. Reg. No. 197100152R.</span>
          <span className="hidden md:block text-[14px] leading-[21px] font-[Noto_Sans]">All Rights Reserved.</span>
        </footer>
      </div>

      {/* Notification Panel */}
      {notificationOpen && (
        <div className="absolute top-[50px] right-[24px] md:left-[684px] md:top-[50px] w-[320px] md:w-[400px] max-h-[600px] bg-white rounded-[24px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] z-50 overflow-hidden">
          {/* Header */}
          <div className="flex flex-col gap-[16px] p-[24px] border-b border-[#000000]/[0.09]">
            <div className="flex items-center justify-between">
              <h3 className="text-[20px] font-bold leading-[24px] text-[#212121] font-[Noto_Sans]">Notifications</h3>
              <button onClick={() => setNotificationOpen(false)}>
                <Icon icon="material-symbols:close" width={24} height={24} style={{color: '#212121'}} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[8px]">
                <button className="px-[20px] py-[4px] bg-white border border-[#000000]/[0.09] rounded-[24px] text-[14px] font-medium leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">All</button>
                <button className="px-[20px] py-[4px] bg-[#f9f9f9] border border-[#000000]/[0.09] rounded-[24px] text-[14px] font-medium leading-[21px] text-[#005eb8] font-[Noto_Sans]">Unread (1)</button>
              </div>
              <button className="text-[14px] font-medium leading-[21px] text-[#005eb8] font-[Noto_Sans]">Mark all as read</button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-[16px_24px] border-b border-[#000000]/[0.09]">
              <div className="flex flex-col gap-[8px]">
                <h4 className="text-[14px] font-bold leading-[21px] text-[#212121] font-[Noto_Sans]">Policy Cancellation Successful</h4>
                <p className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">UniHome - PNF320104124A23 policy has been cancelled. S$XX.XX will be refunded to your ****9111 ending 4123 within 14 working days.</p>
                <div className="flex items-center gap-[8px]">
                  <span className="text-[12px] leading-[16.8px] text-[#8d8d8d] font-[Noto_Sans]">14 Feb 2026</span>
                  <span className="text-[12px] leading-[16.8px] text-[#8d8d8d] font-[Noto_Sans]">Policy</span>
                </div>
              </div>
            </div>
            <div className="p-[16px_24px] border-b border-[#000000]/[0.09]">
              <div className="flex flex-col gap-[8px]">
                <h4 className="text-[14px] font-bold leading-[21px] text-[#212121] font-[Noto_Sans]">Scheduled Maintenance</h4>
                <p className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">Corporate insurance will be unavailable due to scheduled maintenance on 14 March, 9pm to 6pm.</p>
                <div className="flex items-center gap-[8px]">
                  <span className="text-[12px] leading-[16.8px] text-[#8d8d8d] font-[Noto_Sans]">03 Feb 2026</span>
                  <span className="text-[12px] leading-[16.8px] text-[#8d8d8d] font-[Noto_Sans]">System</span>
                </div>
              </div>
            </div>
            <div className="p-[16px_24px] border-b border-[#000000]/[0.09]">
              <div className="flex flex-col gap-[8px]">
                <h4 className="text-[14px] font-bold leading-[21px] text-[#212121] font-[Noto_Sans]">Password Expiring</h4>
                <p className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">Your password will expire in 7 days. Update now to avoid any issues.</p>
                <div className="flex items-center gap-[8px]">
                  <span className="text-[12px] leading-[16.8px] text-[#8d8d8d] font-[Noto_Sans]">03 Jan 2026</span>
                  <span className="text-[12px] leading-[16.8px] text-[#8d8d8d] font-[Noto_Sans]">System</span>
                </div>
              </div>
            </div>
            <div className="p-[16px_24px] border-b border-[#000000]/[0.09]">
              <div className="flex flex-col gap-[8px]">
                <h4 className="text-[14px] font-bold leading-[21px] text-[#212121] font-[Noto_Sans]">Update of Privacy Policy</h4>
                <p className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">Our Privacy Policy has been updated.</p>
                <div className="flex items-center gap-[8px]">
                  <span className="text-[12px] leading-[16.8px] text-[#8d8d8d] font-[Noto_Sans]">03 Jan 2026</span>
                  <span className="text-[12px] leading-[16.8px] text-[#8d8d8d] font-[Noto_Sans]">System</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
