(function() {

  var codeBase = null;

  function getCodebaseURL() {
    codeBase = document.getElementById("keoScript").src;
    codeBase = codeBase.substring(0, codeBase.lastIndexOf("/"));
  };

  function getSeriesIdFromDom(trElt) {
    if (trElt)
      return trElt.find('td:eq(5)').find('div').html();
    else
      return "";
  }

  function getStudyIdFromDom(trElt) {
    if (trElt)
      return trElt.find('td:eq(2)').find('div').html();
    else
      return "";
  }

  function collectSeriesUID() {
    var seriesUIDTab = new Array();
    $('[id^="MAINbody:basketForm:dataBasketDataTable:"][class^="iceDatTblRow"]').each(function() {
      seriesUIDTab.push(getSeriesIdFromDom($(this).closest('tr')));
    });
    return seriesUIDTab.join(";");
  }

  function getCollections() {
    return "";
  }

  function openSeriesInViewer(seriesUID) {

    lExecuteParams = 'OpCode=KOS&SeriesUid=' + seriesUID;
    lExecuteParams = lExecuteParams + '&ODBC=NBIA';

    winW = window.innerWidth;
    winH = window.innerHeight;
    popW = 350;
    popH = 250;

    var html = "<html><head><title>Imagys Viewer</title>";
    html += "<script type='text/javascript' src='" + codeBase + "/rma/KAgent.config.js'></script>\n";
    html += "<script type='text/javascript' src='" + codeBase + "/rma/KAgent.js'></script>\n";
    html += "<script>\n";
    html += "var contextCollections = " + getCollections() + "\n";
    html += "window.onload = function(){DefaultCodebase = '" + codeBase + "' + '/rma/';ExecuteCmd('" + lExecuteParams + "');}\n";
    html += "function onKAgentDisconnected(){window.close();}\n";
    html += "function onKAgentConnect(){document.getElementById('popupContent').innerHTML = '<h3>The Visio+ Viewer is launched.<br /><br />Please do not close this window until you finished imaging reading</h3>';}\n";
    html += "</script>\n";
    html += "</head>\n";
    html += "<body>\n";
    html += "<div id='popupContent' style='text-align:center;'><h3>The Visio+ Viewer is launching for imaging visualisation</h3></div>\n";
    html += "<div id='loading' style='text-align:center;'><img src='" + codeBase + "/img/loading.gif' /></div>\n";
    html += "</body></html>";

    var viewerPopup = window.open('', "viewerPopup", " toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, directories=no, status=no,width=" + popW + ",height=" + popH + ", top=" + ((winH - popH) / 2) + ", left=" + ((winW - popW) / 2) + "");

    viewerPopup.document.open();
    viewerPopup.document.write(html);
    viewerPopup.document.close();

  }

  function loadScript(url, callback) {
    var script = document.createElement("script")
    script.type = "text/javascript";
    if (script.readyState) {
      script.onreadystatechange = function() {
        if (script.readyState == "loaded" || script.readyState == "complete") {
          script.onreadystatechange = null;
          if (callback != null)
            callback();
        }
      };
    } else {
      script.onload = function() {
        if (callback != null)
          callback();
      };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  }


  getCodebaseURL();
  loadScript(codeBase + "/jquery-1.9.1.min.js", function() {
    $("#imagysViewerLink").click(function() {
      var seriesUID = collectSeriesUID();
      if (seriesUID) {
        openSeriesInViewer(seriesUID);
      } else {
        alert("Nothing to display: Your basket is empty");
      }
      return false;
    });
  });

})();
