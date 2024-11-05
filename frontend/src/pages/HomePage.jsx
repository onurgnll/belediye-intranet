import React, { useState } from 'react';
import Header from '../components/Header';
import backgroundImage from '../assets/images/belediye.jpg'; 
import './HomePage.css';
import icon1 from '../assets/icons/business.png'; 
import icon2 from '../assets/icons/calendar.png'; 
import icon3 from '../assets/icons/clipboard.png'; 
import icon4 from '../assets/icons/landline.png'; 
import icon5 from '../assets/icons/home-page.png';
import icon6 from '../assets/icons/testing.png';

const HomePage = () => {
  const [activeAnnouncement, setActiveAnnouncement] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  const announcements = [
    {
      id: 1,
      image: 'https://atakum.bel.tr/img/327324821.JPG',
      title: 'Duyuru 1',
      description: 'duyuru içeriğii',
    },
    {
      id: 2,
      image: 'https://atakum.bel.tr/img/327324821.JPG',
      title: 'Duyuru 2',
      description: 'duyuru içeriğii',
    },
    {
      id: 3,
      image: 'https://atakum.bel.tr/img/327324821.JPG',
      title: 'Duyuru 3',
      description: 'duyuru içeriğii',
    },
    {
      id: 4,
      image: 'https://atakum.bel.tr/img/327324821.JPG',
      title: 'Duyuru 4',
      description: 'duyuru içeriğii',
    },
    {
      id: 5,
      image: 'https://atakum.bel.tr/img/272047914.JPG',
      title: 'Duyuru 1',
      description: 'duyuru içeriğii',
    },
    {
      id: 6,
      image: 'https://atakum.bel.tr/img/272047914.JPG',
      title: 'Duyuru 2',
      description: 'duyuru içeriğii',
    },
    {
      id: 7,
      image: 'https://atakum.bel.tr/img/272047914.JPG',
      title: 'Duyuru 3',
      description: 'duyuru içeriğii',
    },
    {
      id: 8,
      image: 'https://atakum.bel.tr/img/272047914.JPG',
      title: 'Duyuru 4',
      description: 'duyuru içeriğii',
    },
    {
      id: 10,
      image: 'https://atakum.bel.tr/img/327324821.JPG',
      title: 'Duyuru 1',
      description: 'duyuru içeriğii',
    },
    {
      id: 11,
      image: 'https://atakum.bel.tr/img/327324821.JPG',
      title: 'Duyuru 2',
      description: 'duyuru içeriğii',
    },
    {
      id: 13,
      image: 'https://atakum.bel.tr/img/327324821.JPG',
      title: 'Duyuru 3',
      description: 'duyuru içeriğii',
    },
    {
      id: 12,
      image: 'https://atakum.bel.tr/img/327324821.JPG',
      title: 'Duyuru 4',
      description: 'duyuru içeriğii',
    },
    // Add more announcements here...
  ];


  const handleClick = (id) => {
    setActiveAnnouncement(activeAnnouncement === id ? null : id);
  };

  const redirectToSurvey = () => {
    window.location.href = 'https://example.com/anket';
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="home-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Header />
      <div className="sidebar">
        <button>
          <img src={icon5} alt="Icon 5" />
          <span>Anasayfa</span>
        </button>
        <button>
          <img src={icon4} alt="Icon 4" />
          <span>Dahili Numaralar</span>
        </button>
        <button>
          <img src={icon1} alt="Icon 1" />
          <span>Destek Talepleri</span>
        </button>
        <button>
          <img src={icon3} alt="Icon 3" />
          <span>Zimmet İzinler</span>
        </button>
        <button>
          <img src={icon2} alt="Icon 2" />
          <span>Doğum Günü</span>
        </button>
        <button>
          <img src={icon6} alt="Icon 6" />
          <span>Anketler</span>
        </button>
      </div>
      <div className="content">
        <div className="announcement-col">
          {announcements.map((announcement) => (
            <div
              className={`announcement-box ${activeAnnouncement === announcement.id ? 'active' : ''}`}
              key={announcement.id}
              onClick={() => handleClick(announcement.id)}
            >
              <img 
                src={announcement.image} 
                alt={announcement.title} 
                className="announcement-image" 
              />
              <div className="announcement-content">
                <h3>{announcement.title}</h3>
                <p className="announcement-description">
                  {announcement.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {isDialogOpen && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <h2>Önemli Bilgilendirme</h2>
            <p>Bu siteye giriş yaptınız. Lütfen zorunlu anketi doldurun.</p>
            <button onClick={closeDialog}>Kapat</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
