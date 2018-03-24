'use strict';

/**
 * *****  Services  *****
 */
var Services = angular.module('portfolio.services', []);

window.getService = function getService(service) {
  return angular.element('body').injector().get( service );
};

window.consoleF = function consoleF() {
  var index = 0;
  for (index = 0 ; index < arguments.length ; index++) {
    console.log(index + ':', arguments[index]);
  }
};

Services.service('i18n', function i18n() {
  var observers = [];
  var langs = {
    'en': {
      'Contact': 'Contact',
      'Programming Languages': 'Programming Languages',
      'Portfolio': 'Portfolio',
      'About': 'About',
      'Im a Computer systems engineer...': 'I\'m a Computer systems engineer specialized in Software Engineering and Web Development.',
      'Currently working at': 'Currently working at',
      'Computer Systems Engineer, Software Engineer & Web Developer...': 'Computer Systems Engineer, Software Engineer & Web Developer with a Master Degree in Information systems and Applications',
      'Android and Windows App': 'Android and Windows App',
      'Netflix running from USA...': 'Netflix running from USA? Youtube from Taiwan? Youku.com from China? and everything in the same connection with a control panel that can help you change the lcoation for any website, that is SDXess a smart VPN almost fully developed by Carlos with the Company 8VG.org, working a Linux Server Side interaction and 2 client apps, one in Windows and another one in Android both developed by Carlos, is one of the most demanding projects that Carlos had worked on. iOS version is coming!',
      'Phi Tau Phi Scholastic Scholastic Honor Society of the Republic of China': 'Phi Tau Phi Scholastic Scholastic Honor Society of the Republic of China',
      'Master of Science': 'Master of Science',
      'With a Perfect GPA of 4.3...': 'With a Perfect GPA of 4.3 (100% / A+) on His Master Degree Studies, Carlos was selected as the best student of the entire Institute of Information Systems and Applications at 國立清華大學 (National Tsing Hua University) Taiwan R.O.C, getting the honor of being selected to be a member of Phi Tau Phi Scholastic Honor Society of the Republic of China',
      'International Master on Information Systems and Applications': 'International Master on Information Systems and Applications',
      'Do I need Visa?': 'Do I need Visa?',
      'On 12-July-2017, Carlos...': 'On 12-July-2017, Carlos got his Master Degree from the International Master Program on Information Systems and applications from 國立清華大學 (National Tsing Hua University) Taiwan R.O.C. with a Perfect GPA of 4.3 (Magna Cum Laude)',
      'Web Application': 'Web Application',
      'A Webpage for any person to be able...': 'A Webpage for any person to be able to consult if they require a visa to travel to an specific country, this project was developed in AngularJS and Bootstrap.',
      'Web Game': 'Web Game',
      'A fully functional Tetris Game...': 'A fully functional Tetris Game developed by Carlos only on Javascript, No JQuery, Angular JS or Other Library/Framework just Pure JavaScript',
      'Carlos Research paper to fullfil...': 'Carlos Research paper to fullfil the requirements of his Master Degree at 國立清華大學.',
      'Master Thesis': 'Master Thesis',
      'SAP is a huge company, and the...': 'SAP is a huge company, and the Innovation Center Silicon Valley was the team with Carlos collaborated for more than 1 year.',
      'A POC developed at SAP Lab\'s...': 'A POC developed at SAP Lab\'s Palo Alto, California USA, Carlos was the lead developer and designer of the app.',
      'Carlos worked as Lead Developer...': 'Carlos worked as Lead Developer of the project Consumer Insight 365 for SAP.',
      'One of the first Projects where Carlos was assigned...': 'One of the first Projects where Carlos was assigned to help as developer at SAP Palo Alto California, this project was presented at SAPPHIRE 2012 in Madrid, Spain. This POC became a mockup for all the following projects at Innovation Center Silicon Valley.',
      'Agile Solutions biggest Project with more...': 'Agile Solutions biggest Project with more than 10 different Modules, where Carlos was Manager of several of them such as BRB, BFB, BPMA, Calendar etc.',
      'A small Web App that process Association Rules output...': 'A small Web App that process Association Rules output and presents a deep analysis of the rules with D3 Graphics. This App was developed to fullfil the requirements of the Course \'Data Mining\' at 國立清華大學 for Carlos Master Degree in Information Systems and Applications.',
      'An SVG Tree that shows all technologies that...': 'An SVG Tree that shows all technologies that can be manage by a proffesional consultant or software engineer at Agile Solutions.',
      'A simple Javascript Animation Test with...': 'A simple Javascript Animation Test with responsive behavior. Used in Agile Solutions for Interview Tests.',
      'A Basic SOS web Game, experimenting with Drag & Drop.': 'A Basic SOS web Game, experimenting with Drag & Drop.',
      'A basic webpage showing the art from Designer Carmen Lagos.': 'A basic webpage showing the art from Designer Carmen Lagos.',
      'A basic webpage that reads any file and try to conert it as image to find patterns on the HEX code.': 'A basic webpage that reads any file and try to conert it as image to find patterns on the HEX code.',
      'A basic Game sample developed by an HTML5 Game Engine developed...': 'A basic Game sample developed by an HTML5 Game Engine developed by Carlos, the GAme Engine Supports the use of joystick, mouse or Keyboard as inputs for any game.',
      'A basic webpage as a Small Gift for Carlos Girlfriend who is a Musician.': 'A basic webpage as a Small Gift for Carlos Girlfriend who is a Musician.',
      'A basic webpage that offers tools for finding patterns in Prime Numbers.': 'A basic webpage that offers tools for finding patterns in Prime Numbers.',
      'A Survey Experiment built as a Web App...': 'A Survey Experiment built as a Web App to fullfil the requirements of the Course "Social Computing" at 國立清華大學 for Carlos Master Degree in Information Systems and Applications.',
      'A Cool SVG Animation made for AGILE app\'s Background.': 'A Cool SVG Animation made for AGILE app\'s Background.',
      'A Cool SVG Animation made for more Interactive Resume made by Carlos.': 'A Cool SVG Animation made for more Interactive Resume made by Carlos.',
      'A 3D game for PC that Carlos worked as a...': 'A 3D game for PC that Carlos worked as a Develoepr with Kanny Davila, Xenia Oliva and Willy Guevara to participate in Imagine Cup.',
      'A Lesson from the App \'Escuela Digital\' presented for Carlos Bachelor Thesis.': 'A Lesson from the App \'Escuela Digital\' presented for Carlos Bachelor Thesis.',
      'An Android videogame with artistic graphics made for...': 'An Android videogame with artistic graphics made for the company Squadventure at the company early stages, This was Carlos second game for android, and he was the only developer and game designer with a Graphics designer help in the entire project.',
      'An Android videogame made for the company Squadventure...': 'An Android videogame made for the company Squadventure at the company early stages, Carlos was the only developer and game designer with a Graphics designer help in the entire project.',
      'Carlos Personal LinkedIn Profile.': 'Carlos Personal LinkedIn Profile.',
      'Carlos Personal Facebook.': 'Carlos Personal Facebook.',
      'Carlos Play the Bass-Guitar in NTHU Band \'Numero Dos\'.': 'Carlos Play the Bass-Guitar in NTHU Band \'Numero Dos\'.',
      'Carlos traveled, work and live in several countries such...': 'Carlos traveled, work and live in several countries such as USA, Honduras, Nicaragua, Guatemala, El Salvador, Taiwan, Japan, Brazil, Chile, Cambodia and Thailand.',
      'Travel': 'Travel',
      'Metal Band': 'Metal Band',
      'Facebook': 'Facebook',
      'LinkedIn': 'LinkedIn',
      'Android Game': 'Android Game',
      'Graduated from: ': 'Graduated from: ',
      'Software Engineer at': 'Software Engineer at', 
      'Got experience in WebApp\'s Development and Software...': 'Experience in WebApp\'s Development and Software Engineering since 2008, worked at Agile Solutions, SAP Innovation Center Silicon Valley & Intowow',
      'Check his work!': 'Check his work!',
      'Find Out More': 'Find Out More',
      'Let\'s Get In Touch!': 'Let\'s Get In Touch!',
      'Are you willing to contact Carlos? That\'s great...': 'Are you willing to contact Carlos? That\'s great! Give him a call or send him an email and he will get back to you as soon as possible!',
      'Date: ': 'Date: ',
      'Close Item': 'Close Item',
      'Website': 'Website',
    },
  };

  var i18n = {
    _lang: '',
    _supportedLangs: ['en'],
    _registerScope: function _registerScope($scope) {
      if (observers.indexOf( $scope ) === -1 ) {
        observers.push( $scope );
      }
    },
    _setLanguage: function _setLanguage(lang) {
      if (typeof lang === 'number') {
        i18n._lang = i18n._supportedLangs[lang];
      }
      else {
        i18n._lang = lang;
      }

      localStorage.setItem('lang', i18n._lang);
      i18n._readLang();
    },
    _readLang: function _readLang() {
      Object.keys(langs[i18n._lang]).map(function mapKey(key) {
        i18n[key] = langs[i18n._lang][key];
      });
      observers.map(function mapObserver(observer) {
        observer.$digest();
      });
    },
  };

  i18n._lang = 'en';
  i18n._readLang();
  i18n._setLanguage('en');
  return i18n;

});

Services.service('Data', [function Data() {
  var Data = {
    columns: 3,
    portfolio: [
    {
      id: 2,
      title: 'Find Carlos on LinkedIn!',
      tags: ['Social', 'Professional'],
      category: 'LinkedIn',
      img: 'carlos.jpg',
      url: 'https://www.linkedin.com/in/carlos-amilcar-sanchez-rosa-0aa88b122',
      desc: 'Carlos Personal LinkedIn Profile.',
    },
    {
      id: 0,
      title: 'AWS Re:Invent 2017',
      tags: ['Backend', 'Professional'],
      category: 'Amazon Web Services',
      img: 'reinvent2017.jpg',
      imgs: ['reinvent2017.jpg', 'reinvent.png', 'aws2017.jpg'],
      url: 'http://intowow.com/',
      desc: 'Carlos Assisted together with his colleagues to AWS:reinvent 2017 at Las Vegas, NV USA',
      labels: [{
        img: 'intowowc.png',
        url: 'http://www.intowow.com/',
      },
      {
        img: 'aws.png',
        url: 'https://aws.amazon.com/',
      }],
    },
    {
      id: 1,
      title: 'CrystalExpress',
      tags: ['Web Apps', 'Professional', 'Backend'],
      category: 'Intowow',
      img: 'crystalexpress.png',
      imgs: ['ce2.png', 'crystalexpress.png'],
      url: 'http://intowow.com/',
      desc: 'CrystalExpress App is an Internal tool used at Intowow, Carlos help in the maintainance and development of new features of this tool.',
      labels: [{
        img: 'intowowc.png',
        url: 'http://www.intowow.com/',
      }],
    },
    {
      id: 3,
      title: 'Frontend Engineer',
      tags: ['Professional'],
      category: 'Intowow',
      img: 'intowowb.png',
      imgs: ['intowowb.png'],
      url: 'http://intowow.com/',
      desc: 'Worked as a Software Engineers maintaining Crystall Express App',
      labels: [{
        img: 'intowowc.png',
        url: 'http://www.intowow.com/',
      }],
    },
    {
      id: 4,
      title: 'SDXess',
      tags: ['Android', 'Native Apps', 'Professional'],
      category: 'Android and Windows App',
      img: 'sdxess.png',
      video: 'sdxess',
      imgs: ['sdxess.png', 'sdxess1.png', 'sdxess2.png', 'sdxess3.png', 'sdxess4.png', 'sdxess5.png'],
      url: 'http://sdxess.com/',
      desc: 'Netflix running from USA...',
      labels: [{
        img: '8vg.png',
        url: 'http://www.8vg.org/',
      },
      {
        img: 'android.png',
        url: 'https://play.google.com/store?hl=es',
      },
      {
        img: 'java.png',
        url: 'https://www.java.com/es/',
      },
      {
        img: 'xess.png',
        url: 'http://sdxess.com/',
      },
      {
        img: 'php.png',
        url: 'http://php.net/manual/es/intro-whatis.php',
      }],
    },

    {
      id: 5,
      title: 'Phi Tau Phi Scholastic Scholastic Honor Society of the Republic of China',
      tags: ['Education'],
      category: 'Master of Science',
      img: 'phitauphi.jpg',
      imgs: ['phitauphi.png', 'phitauphi2.png', 'phitauphi3.jpg'],
      url: 'http://nthu-en.web.nthu.edu.tw/bin/home.php',
      desc: 'With a Perfect GPA of 4.3...',
    },

    {
      id: 6,
      title: 'International Master on Information Systems and Applications',
      tags: ['Education'],
      category: 'Master of Science',
      img: 'master.jpg',
      imgs: ['master.jpg', 'master2.jpg'],
      url: 'http://nthu-en.web.nthu.edu.tw/bin/home.php',
      desc: 'On 12-July-2017, Carlos...',
    },
    {
      id: 7,
      title: 'Do I need Visa?',
      tags: ['Web Apps'],
      category: 'Web Application',
      img: 'visa.png',
      url: './public/html/doineedvisa/visa.html',
      desc: 'A Webpage for any person to be able...',
    },
    {
      id: 8,
      title: 'Tetris JS',
      tags: ['Web Apps', 'Games'],
      category: 'Web Game',
      img: 'tetris.png',
      url: './public/html/tetris/tetris.html?w=10&h=20',
      desc: 'A fully functional Tetris Game...',
    },
    {
      id: 9,
      title: 'Cluster Validation: Improving Stability Measurement',
      tags: ['Education'],
      category: 'Master Thesis',
      img: 'cluster.png',
      url: './public/html/ClusterValidation.pdf',
      desc: 'Carlos Research paper to fullfil...',
    },
    {
      id: 10,
      title: 'SAP - Innovation Center Silicon Valley',
      tags: ['Professional'],
      category: 'SAP Labs Palo Alto',
      img: 'inno-sap.png',
      video: 'sap.mp4',
      url: 'https://icn.sap.com/home.html',
      desc: 'SAP is a huge company, and the...',
      labels: [{
        img: 'sap.png',
        url: 'https://www.sap.com/index.html',
      }],
    },
    {
      id: 11,
      title: 'SAP - eBay',
      tags: ['Web Apps', 'Professional'],
      category: 'Web Application',
      img: 'ebay-insight.png',
      video: 'ebay.mp4',
      url: 'https://www.sap.com/about/customer-testimonials/high-tech/ebay.html',
      desc: 'A POC developed at SAP Lab\'s...',
      labels: [{
        img: 'ebay.png',
        url: 'http://www.ebay.com/',
      },
      {
        img: 'sap.png',
        url: 'https://www.sap.com/index.html',
      }],
    },
    {
      id: 12,
      title: 'SAP - Consumer Insight 365',
      tags: ['Web Apps', 'Professional'],
      category: 'Web Application',
      img: '365.png',
      video: '365.mp4',
      url: 'https://www.sapconsumerinsight365.com/',
      desc: 'Carlos worked as Lead Developer...',
      labels: [{
        img: 'sap.png',
        url: 'https://www.sap.com/index.html',
      }],
    },
    {
      id: 13,
      title: 'SAP - Burberry',
      tags: ['Web Apps', 'Professional'],
      category: 'Web Application',
      img: 'burberry-app.png',
      video: 'Burberry.mp4',
      url: 'http://news.sap.com/burberry-ulta-beauty-mobilize-clienteling/',
      desc: 'One of the first Projects where Carlos was assigned...',
      labels: [{
        img: 'sap.png',
        url: 'https://www.sap.com/index.html',
      },
      {
        img: 'burberry.png',
        url: 'https://www.burberry.com/',
      }],
    },
    {
      id: 14,
      title: 'All TAX Platform',
      tags: ['Web Apps', 'Professional'],
      category: 'Web Application',
      img: 'timp.png',
      video: 'timp.mp4',
      url: 'http://alltaxplatform.com/',
      desc: 'Agile Solutions biggest Project with more...',
      labels: [{
        img: 'agile.png',
        url: 'http://agilesolutions.com/',
      }],
    },
    {
      id: 15,
      title: 'Data Mining Project',
      tags: ['Web Apps', 'Education'],
      category: 'Web Application',
      img: 'dm.png',
      url: './public/html/DM/tree/tree.html',
      desc: 'A small Web App that process Association Rules output...',
    },
    {
      id: 16,
      title: 'Agile Consultant Knowledge Tree',
      tags: ['Web Apps'],
      category: 'Agile Project',
      img: 'agile-tree.png',
      url: './public/html/agileconsultant/agile-consultant.html',
      desc: 'An SVG Tree that shows all technologies that...',
    },
    {
      id: 17,
      title: 'JS Responsive Test',
      tags: ['Web Apps'],
      category: 'Web Example',
      img: 'resp.png',
      url: './public/html/test/test.html',
      desc: 'A simple Javascript Animation Test with...',
    },
    {
      id: 17,
      title: 'SOS (Spanish)',
      tags: ['Web Apps', 'Games'],
      category: 'Web Example',
      img: 'sos.png',
      url: './public/html/SOS/SOS.html',
      desc: 'A Basic SOS web Game, experimenting with Drag & Drop.',
    },
    {
      id: 18,
      title: 'Clever designs',
      tags: ['Web Apps'],
      category: 'Web Example',
      img: 'clever.png',
      url: './public/html/cleverdesigns/clever.html',
      desc: 'A basic webpage showing the art from Designer Carmen Lagos.',
    },
    {
      id: 19,
      title: 'IMG to Binary Visualization',
      tags: ['Web Apps'],
      category: 'Web Application',
      img: 'binimg.png',
      url: './public/html/binimg/binimg.html',
      desc: 'A basic webpage that reads any file and try to conert it as image to find patterns on the HEX code.',
    },
    {
      id: 20,
      title: 'Food Game',
      tags: ['Web Apps', 'Games'],
      category: 'Web Game',
      img: 'food.png',
      url: './public/html/games/foodgame/food.html',
      desc: 'A basic Game sample developed by an HTML5 Game Engine developed...',
    },
    {
      id: 21,
      title: 'Birthday Piano App',
      tags: ['Web Apps'],
      category: 'Web Application',
      img: 'wandrew.png',
      url: './public/html/wandrew/piano.html',
      desc: 'A basic webpage as a Small Gift for Carlos Girlfriend who is a Musician.',
    },
    {
      id: 22,
      title: 'Prime Number Pattern Finder',
      tags: ['Web Apps'],
      category: 'Web Application',
      img: 'prime.png',
      url: './public/html/prime/prime.html',
      desc: 'A basic webpage that offers tools for finding patterns in Prime Numbers.',
    },
    {
      id: 23,
      title: 'Social Computing Survey',
      tags: ['Web Apps', 'Education'],
      category: 'Web Application',
      img: 'social.png',
      url: './public/html/socialcomputing/social.html',
      desc: 'A Survey Experiment built as a Web App...',
    },
    {
      id: 24,
      title: 'SVG Animation',
      tags: ['Web Apps'],
      category: 'Web Example',
      img: 'svg1.png',
      url: './public/html/pack/index.min.html',
      desc: 'A Cool SVG Animation made for AGILE app\'s Background.',
    },
    {
      id: 25,
      title: 'SVG Animation #2',
      tags: ['Web Apps'],
      category: 'Web Example',
      img: 'svg2.png',
      url: './public/html/cv/cv.html',
      desc: 'A Cool SVG Animation made for more Interactive Resume made by Carlos.',
    },
    {
      id: 26,
      title: 'Xuul Kab',
      tags: ['Native Apps', 'Games'],
      category: '3D Videogame',
      img: 'xuulcab.png',
      video: 'xuulcab.mp4',
      url: 'https://compete.imagine.microsoft.com/en-us/category/0?skillLevel=0',
      desc: 'A 3D game for PC that Carlos worked as a...',
    },
    {
      id: 27,
      title: 'Escuela Digital (Lec. 1, Un. 1)',
      tags: ['Web Apps'],
      category: 'Web Application',
      img: 'lec1un1.png',
      url: './public/html/escueladigital/escueladigital/Unidad%201/leccion1.html',
      desc: 'A Lesson from the App \'Escuela Digital\' presented for Carlos Bachelor Thesis.',
    },
    {
      id: 28,
      title: 'Escuela Digital (Lec. 2, Un. 1)',
      tags: ['Web Apps'],
      category: 'Web Application',
      img: 'lec2un1.png',
      url: './public/html/escueladigital/escueladigital/Unidad%201/leccion2.html',
      desc: 'A Lesson from the App \'Escuela Digital\' presented for Carlos Bachelor Thesis.',
    },
    {
      id: 29,
      title: 'Escuela Digital (Lec. 3, Un. 1)',
      tags: ['Web Apps'],
      category: 'Web Application',
      img: 'lec3un1.png',
      url: './public/html/escueladigital/escueladigital/Unidad%201/leccion3.html',
      desc: 'A Lesson from the App \'Escuela Digital\' presented for Carlos Bachelor Thesis.',
    },
    {
      id: 30,
      title: 'Escuela Digital (Lec. 4, Un. 1)',
      tags: ['Web Apps'],
      category: 'Web Application',
      img: 'lec4un1.png',
      url: './public/html/escueladigital/escueladigital/Unidad%201/leccion4.html',
      desc: 'A Lesson from the App \'Escuela Digital\' presented for Carlos Bachelor Thesis.',
    },
    {
      id: 31,
      title: 'Escuela Digital (Lec. 5, Un. 1)',
      tags: ['Web Apps'],
      category: 'Web Application',
      img: 'lec5un1.png',
      url: './public/html/escueladigital/escueladigital/Unidad%201/leccion5.html',
      desc: 'A Lesson from the App \'Escuela Digital\' presented for Carlos Bachelor Thesis.',
    },
    {
      id: 32,
      title: 'Escuela Digital (Lec. 1, Un. 2)',
      tags: ['Web Apps'],
      category: 'Web Application',
      img: 'lec1un2.png',
      url: './public/html/escueladigital/escueladigital/Unidad%202/leccion1.html',
      desc: 'A Lesson from the App \'Escuela Digital\' presented for Carlos Bachelor Thesis.',
    },
    {
      id: 33,
      title: 'Escuela Digital (Lec. 2, Un. 3)',
      tags: ['Web Apps'],
      category: 'Web Application',
      img: 'lec1un3.png',
      url: './public/html/escueladigital/escueladigital/Unidad%203/leccion2.html',
      desc: 'A Lesson from the App \'Escuela Digital\' presented for Carlos Bachelor Thesis.',
    },
    {
      id: 34,
      title: 'Escuela Digital (Lec. 1, Un. 4)',
      tags: ['Web Apps'],
      category: 'Web Application',
      img: 'lec1un4.png',
      url: './public/html/escueladigital/escueladigital/Unidad%204/leccion1.html',
      desc: 'A Lesson from the App \'Escuela Digital\' presented for Carlos Bachelor Thesis.',
    },
    {
      id: 35,
      title: 'Escuela Digital (Lec. 1, Un. 6)',
      tags: ['Web Apps'],
      category: 'Web Application',
      img: 'lec1un6.png',
      url: './public/html/escueladigital/escueladigital/Unidad%206/leccion1.html',
      desc: 'A Lesson from the App \'Escuela Digital\' presented for Carlos Bachelor Thesis.',
    },
    {
      id: 36,
      title: 'Escuela Digital (Lec. 1, Un. 7)',
      tags: ['Web Apps'],
      category: 'Web Application',
      img: 'lec1un7.png',
      url: './public/html/escueladigital/escueladigital/Unidad%207/leccion1.html',
      desc: 'A Lesson from the App \'Escuela Digital\' presented for Carlos Bachelor Thesis.',
    },
    {
      id: 37,
      title: 'Escuela Digital (Lec. 1, Un. 8)',
      tags: ['Web Apps'],
      category: 'Web Application',
      img: 'lec1un8.png',
      url: './public/html/escueladigital/escueladigital/Unidad%208/leccion1.html',
      desc: 'A Lesson from the App \'Escuela Digital\' presented for Carlos Bachelor Thesis.',
    },
    {
      id: 38,
      title: 'Look for It!',
      tags: ['Android', 'Games'],
      category: 'Android Game',
      img: 'lookforit.png',
      url: 'https://m.downloadatoz.com/look-for-it/kotaro.lookforit/',
      desc: 'An Android videogame with artistic graphics made for...',
      labels: [{
        img: 'android.png',
        url: 'https://play.google.com/store?hl=es',
      },
      {
        img: 'squadventure.png',
        url: 'http://squadventure.com/',
      }],
    },
    {
      id: 39,
      title: 'Cookis & Bombs',
      tags: ['Android', 'Games'],
      category: 'Android Game',
      img: 'cookiesnbombs.png',
      url: 'https://m.downloadatoz.com/cookies-bombs/kotaro.cookiesnbombs/',
      desc: 'An Android videogame made for the company Squadventure...',
      labels: [{
        img: 'android.png',
        url: 'https://play.google.com/store?hl=es',
      },
      {
        img: 'squadventure.png',
        url: 'http://squadventure.com/',
      }],
    },
    {
      id: 40,
      title: 'Find Carlos on Facebook!',
      tags: ['Social'],
      category: 'Facebook',
      img: 'fb.png',
      url: 'https://www.facebook.com/kotaro.san',
      desc: 'Carlos Personal Facebook.',
    },
    {
      id: 41,
      title: 'Numero Dos',
      tags: ['Social'],
      category: 'Metal Band',
      img: 'num2.png',
      url: 'https://www.facebook.com/groups/2016nthuecho/',
      desc: 'Carlos Play the Bass-Guitar in NTHU Band \'Numero Dos\'.',
    },
    {
      id: 42,
      title: 'All Around The World',
      tags: ['Social'],
      category: 'Travel',
      img: 'map.png',
      url: 'https://www.facebook.com/kotaro.san',
      desc: 'Carlos traveled, work and live in several countries such...',
    }],
  };
  return Data;
}]);


