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
      'Got experience in WebApp\'s Development and Software...': 'Got experience in WebApp\'s Development and Software Engineering since 2008, worked at Agile Solutions and SAP Innovation Center Silicon Valley',
      'Check his work!': 'Check his work!',
      'Find Out More': 'Find Out More',
      'Let\'s Get In Touch!': 'Let\'s Get In Touch!',
      'Are you willing to contact Carlos? That\'s great...': 'Are you willing to contact Carlos? That\'s great! Give him a call or send him an email and he will get back to you as soon as possible!',
      'Date: ': 'Date: ',
      'Close Item': 'Close Item',
      'Website': 'Website',
    },
    'es': {
    },
  };

  var i18n = {
    _lang: '',
    _supportedLangs: ['en', 'es', 'pt'],
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

  var lang = i18n._supportedLangs[i18n._supportedLangs.indexOf(
    (navigator.language || navigator.systemLanguage).toLowerCase().split(/\-/)[0])] || i18n._supportedLangs[0];

  var _lang = localStorage.getItem('lang');

  if (_lang) {
    i18n._supportedLangs.map(function mapLang( lng ) {
      if (lng === _lang) {
        lang = _lang;
      }
    });
  }

  i18n._setLanguage(lang);
  return i18n;

});

Services.service('Data', [function Data() {
  var Data = {
    columns: 3,
    portfolio: [{
      title: 'Conway\'s Game of Life',
      category: 'Web Application',
      img: 'gameoflife.png',
      imgs: ['gameoflife.png', 'gol.png'],
      url: './public/html/Game%20of%20Life/game.html',
      desc: 'An AngularJS experiment developed for SAP',
      labels: [{
        img: 'sap.png',
        url: 'https://www.sap.com/index.html',
      }],
    },
    {
      title: 'AWS Re:Invent 2017',
      category: 'Amazon Web Services',
      img: 'reinvent2017.jpg',
      imgs: ['reinvent2017.jpg', 'reinvent.png', 'aws2017.jpg'],
      url: 'http://intowow.com/',
      desc: 'Worked as a Software Engineers mainting Crystall Express App',
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
      title: 'CrystalExpress',
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
      title: 'Frontend Engineer',
      category: 'intowow innovation',
      img: 'intowowb.png',
      imgs: ['intowowb.png'],
      url: 'http://intowow.com/',
      desc: 'Worked as a Software Engineers mainting Crystall Express App',
      labels: [{
        img: 'intowowc.png',
        url: 'http://www.intowow.com/',
      }],
    },
    {
      title: 'SDXess',
      category: 'Android and Windows App',
      img: 'sdxess.png',
      video: 'sdxess.avi',
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
        img: 'sdxess.png',
        url: 'http://sdxess.com/',
      },
      {
        img: 'php.png',
        url: 'http://php.net/manual/es/intro-whatis.php',
      }],
    },
    {
      title: 'Phi Tau Phi Scholastic Scholastic Honor Society of the Republic of China',
      category: 'Master of Science',
      img: 'phitauphi.jpg',
      imgs: ['phitauphi.png', 'phitauphi2.png', 'phitauphi3.jpg'],
      url: 'http://nthu-en.web.nthu.edu.tw/bin/home.php',
      desc: 'With a Perfect GPA of 4.3...',
    },
    {
      title: 'International Master on Information Systems and Applications',
      category: 'Master of Science',
      img: 'master.jpg',
      imgs: ['master.jpg', 'master2.jpg'],
      url: 'http://nthu-en.web.nthu.edu.tw/bin/home.php',
      desc: 'On 12-July-2017, Carlos...',
    },
    {
      title: 'Do I need Visa?',
      category: 'Web Application',
      img: 'visa.png',
      url: './public/html/doineedvisa/visa.html',
      desc: 'A Webpage for any person to be able...',
    },
    {
      title: 'Tetris JS',
      category: 'Web Game',
      img: 'tetris.png',
      url: './public/html/tetris/tetris.html?w=10&h=20',
      desc: 'A fully functional Tetris Game...',
    },
    {
      title: 'Cluster Validation: Improving Stability Measurement',
      category: 'Master Thesis',
      img: 'cluster.png',
      url: './public/html/ClusterValidation.pdf',
      desc: 'Carlos Research paper to fullfil...',
    },
    {
      title: 'SAP - Innovation Center Silicon Valley',
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
      title: 'SAP - eBay',
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
      title: 'SAP - Consumer Insight 365',
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
      title: 'SAP - Burberry',
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
      title: 'All TAX Platform',
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
      title: 'Data Mining Project',
      category: 'Web Application',
      img: 'dm.png',
      url: './public/html/DM/tree/tree.html',
      desc: 'A small Web App that process Association Rules output...',
    },
    {
      title: 'Agile Consultant Knowledge Tree',
      category: 'Agile Project',
      img: 'agile-tree.png',
      url: './public/html/agileconsultant/agile-consultant.html',
      desc: 'An SVG Tree that shows all technologies that...',
    },
    {
      title: 'JS Responsive Test',
      category: 'Web Example',
      img: 'resp.png',
      url: './public/html/test/test.html',
      desc: 'A simple Javascript Animation Test with...',
    },
    {
      title: 'SOS (Spanish)',
      category: 'Web Example',
      img: 'sos.png',
      url: './public/html/SOS/SOS.html',
      desc: 'A Basic SOS web Game, experimenting with Drag & Drop.',
    },
    {
      title: 'Clever designs',
      category: 'Web Example',
      img: 'clever.png',
      url: './public/html/cleverdesigns/clever.html',
      desc: 'A basic webpage showing the art from Designer Carmen Lagos.',
    },
    {
      title: 'IMG to Binary Visualization',
      category: 'Web Application',
      img: 'binimg.png',
      url: './public/html/binimg/binimg.html',
      desc: 'A basic webpage that reads any file and try to conert it as image to find patterns on the HEX code.',
    },
    {
      title: 'Food Game',
      category: 'Web Game',
      img: 'food.png',
      url: './public/html/games/foodgame/food.html',
      desc: 'A basic Game sample developed by an HTML5 Game Engine developed...',
    },
    {
      title: 'Birthday Piano App',
      category: 'Web Application',
      img: 'wandrew.png',
      url: './public/html/wandrew/piano.html',
      desc: 'A basic webpage as a Small Gift for Carlos Girlfriend who is a Musician.',
    },
    {
      title: 'Prime Number Pattern Finder',
      category: 'Web Application',
      img: 'prime.png',
      url: './public/html/prime/prime.html',
      desc: 'A basic webpage that offers tools for finding patterns in Prime Numbers.',
    },
    {
      title: 'Social Computing Survey',
      category: 'Web Application',
      img: 'social.png',
      url: './public/html/socialcomputing/social.html',
      desc: 'A Survey Experiment built as a Web App...',
    },
    {
      title: 'SVG Animation',
      category: 'Web Example',
      img: 'svg1.png',
      url: './public/html/pack/index.min.html',
      desc: 'A Cool SVG Animation made for AGILE app\'s Background.',
    },
    {
      title: 'SVG Animation #2',
      category: 'Web Example',
      img: 'svg2.png',
      url: './public/html/cv/cv.html',
      desc: 'A Cool SVG Animation made for more Interactive Resume made by Carlos.',
    },
    {
      title: 'Xuul Kab',
      category: '3D Videogame',
      img: 'xuulcab.png',
      video: 'xuulcab.mp4',
      url: 'https://compete.imagine.microsoft.com/en-us/category/0?skillLevel=0',
      desc: 'A 3D game for PC that Carlos worked as a...',
    },
    {
      title: 'Escuela Digital (Lec. 1, Un. 1)',
      category: 'Web Application',
      img: 'lec1un1.png',
      url: './public/html/escueladigital/escueladigital/Unidad%201/leccion1.html',
      desc: 'A Lesson from the App \'Escuela Digital\' presented for Carlos Bachelor Thesis.',
    },
    {
      title: 'Escuela Digital (Lec. 2, Un. 1)',
      category: 'Web Application',
      img: 'lec2un1.png',
      url: './public/html/escueladigital/escueladigital/Unidad%201/leccion2.html',
      desc: 'A Lesson from the App \'Escuela Digital\' presented for Carlos Bachelor Thesis.',
    },
    {
      title: 'Escuela Digital (Lec. 3, Un. 1)',
      category: 'Web Application',
      img: 'lec3un1.png',
      url: './public/html/escueladigital/escueladigital/Unidad%201/leccion3.html',
      desc: 'A Lesson from the App \'Escuela Digital\' presented for Carlos Bachelor Thesis.',
    },
    {
      title: 'Escuela Digital (Lec. 4, Un. 1)',
      category: 'Web Application',
      img: 'lec4un1.png',
      url: './public/html/escueladigital/escueladigital/Unidad%201/leccion4.html',
      desc: 'A Lesson from the App \'Escuela Digital\' presented for Carlos Bachelor Thesis.',
    },
    {
      title: 'Escuela Digital (Lec. 5, Un. 1)',
      category: 'Web Application',
      img: 'lec5un1.png',
      url: './public/html/escueladigital/escueladigital/Unidad%201/leccion5.html',
      desc: 'A Lesson from the App \'Escuela Digital\' presented for Carlos Bachelor Thesis.',
    },
    {
      title: 'Escuela Digital (Lec. 1, Un. 2)',
      category: 'Web Application',
      img: 'lec1un2.png',
      url: './public/html/escueladigital/escueladigital/Unidad%202/leccion1.html',
      desc: 'A Lesson from the App \'Escuela Digital\' presented for Carlos Bachelor Thesis.',
    },
    {
      title: 'Escuela Digital (Lec. 2, Un. 3)',
      category: 'Web Application',
      img: 'lec1un3.png',
      url: './public/html/escueladigital/escueladigital/Unidad%203/leccion2.html',
      desc: 'A Lesson from the App \'Escuela Digital\' presented for Carlos Bachelor Thesis.',
    },
    {
      title: 'Escuela Digital (Lec. 1, Un. 4)',
      category: 'Web Application',
      img: 'lec1un4.png',
      url: './public/html/escueladigital/escueladigital/Unidad%204/leccion1.html',
      desc: 'A Lesson from the App \'Escuela Digital\' presented for Carlos Bachelor Thesis.',
    },
    {
      title: 'Escuela Digital (Lec. 1, Un. 6)',
      category: 'Web Application',
      img: 'lec1un6.png',
      url: './public/html/escueladigital/escueladigital/Unidad%206/leccion1.html',
      desc: 'A Lesson from the App \'Escuela Digital\' presented for Carlos Bachelor Thesis.',
    },
    {
      title: 'Escuela Digital (Lec. 1, Un. 7)',
      category: 'Web Application',
      img: 'lec1un7.png',
      url: './public/html/escueladigital/escueladigital/Unidad%207/leccion1.html',
      desc: 'A Lesson from the App \'Escuela Digital\' presented for Carlos Bachelor Thesis.',
    },
    {
      title: 'Escuela Digital (Lec. 1, Un. 8)',
      category: 'Web Application',
      img: 'lec1un8.png',
      url: './public/html/escueladigital/escueladigital/Unidad%208/leccion1.html',
      desc: 'A Lesson from the App \'Escuela Digital\' presented for Carlos Bachelor Thesis.',
    },
    {
      title: 'Look for It!',
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
      title: 'Cookis & Bombs',
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
      title: 'Find Carlos on LinkedIn!',
      category: 'LinkedIn',
      img: 'linkedin.png',
      url: 'https://www.linkedin.com/in/carlos-amilcar-sanchez-rosa-0aa88b122',
      desc: 'Carlos Personal LinkedIn Profile.',
    },
    {
      title: 'Find Carlos on Facebook!',
      category: 'Facebook',
      img: 'fb.png',
      url: 'https://www.facebook.com/kotaro.san',
      desc: 'Carlos Personal Facebook.',
    },
    {
      title: 'Numero Dos',
      category: 'Metal Band',
      img: 'num2.png',
      url: 'https://www.facebook.com/groups/2016nthuecho/',
      desc: 'Carlos Play the Bass-Guitar in NTHU Band \'Numero Dos\'.',
    },
    {
      title: 'All Around The World',
      category: 'Travel',
      img: 'map.png',
      url: 'https://www.facebook.com/kotaro.san',
      desc: 'Carlos traveled, work and live in several countries such...',
    }],
  };
  return Data;
}]);
