/*******************************************************************************************
 * * Keosys Remote Access configuration script
 * *******************************************************************************************/
/* Constant values, site specific */
var DefaultCodebase = "https://dcm-acc.bmia.nl/ncia/js/keosys/rma/";
var DefaultShell = "D:\\Keosys\\KSWMIAS\\4.3.999\\Bin\\StartViewer.exe";
var DefaultShellParameters = "ExamsPath=\\\\app02-acc-vh.trait.vancis.nl\\NBIA";
var AcceptNoShellParam = false;
var DefaultRemoteHost = "viewer-acc.bmia.nl";
var DefaultRemotePort = 443;
var DefaultDomain = "DOMAIN";
var DefaultUsername = "keosysadmin";
var DefaultPassword = "mIhbX4VpI7wVB8vcZU7LpQ==";
var DefaultFullScreen = true;
var DefaultLoadingMsg = '<div id="keoloading"><IMG src="' + DefaultCodebase + 'img/rapwait.gif" style="vertical-align:middle">Loading ...</div><br>';
var DefaultPreloadJVM = false;
var DefaultJRE = "1.5";
var m_nTSTimeout = 600;

// required config
var RmaConfig = {
  'ws': {
    'context': {
      'host': "http://keosys1.tst.cancerdata.org/context/"
    },
    'application': {
      'host': 'http://keosys2.tst.cancerdata.org/repo/',
      'download': '%(RmaConfig.ws.application.host)sims-rma-app-distribution-%(osType)s-installer?version=LATEST'
    }
  },
  'contextConfig' : {
    'locale': 'en_US',
    'appRepoUrls': {
      'host': "%(RmaConfig.ws.application.host)s"
    }
  },
  "CODEBASE": window.location.protocol + "//" + window.location.host + DefaultCodebase,

  "contextOverloader": function(){
    var context = new Object();
    context['exams'] = contextExams;
    context['collections'] = contextCollections;
    return context;
  }
}
