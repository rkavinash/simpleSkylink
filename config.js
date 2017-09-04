/**************************** Note **********************************
 Save your api settings like appKey, defaultRoom and room and save it
 in a file called [config.js]
*********************************************************************/

function setRoomName () {
  alert('set room name');
}

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

if (!getParameterByName('room')) {
  window.location.search = '?room=' + (new Date()).getTime();
}

var config = {
  appKey: '8c00e6a6-b149-443e-a276-2f9351655115',
  defaultRoom: getParameterByName('room'),
  enableDataChannel: true, // Disable this and sendBlobData(), sendP2PMessage() and sendURLData() will NOT work!
  enableIceTrickle: true,
  audioFallback: true,
  forceSSL: true
};

/**
 * For using credentials based authentication
 */
var secret = 'd1bze0az98yhw'; // 'xxxxx' Use App Key secret
var duration = 2; // 2 hours. Default is 24 for CORS auth
var startDateTimeStamp = (new Date ()).toISOString();

// Setup App Key for Privileged User Feature (for Privileged App Key + Auto Introduce Enabled)
if (window.location.pathname.indexOf('/demo/privileged/auto-priv/') === 0) {
  config.appKey = '8c00e6a6-b149-443e-a276-2f9351655115';
  secret = 'd1bze0az98yhw'; // 'xxxxx' Use App Key secret

// Setup App Key for Privileged User Feature (for non-Privileged App Key + Auto Introduce Enabled)
} else if (window.location.pathname.indexOf('/demo/privileged/auto-unpriv/') === 0) {
  config.appKey = '8c00e6a6-b149-443e-a276-2f9351655115';
  secret = 'd1bze0az98yhw'; // 'xxxxx' Use App Key secret

// Setup App Key for Privileged User Feature (for Privileged App Key + Auto Introduce Disabled)
} else if (window.location.pathname.indexOf('/demo/privileged/unauto-priv/') === 0) {
  config.appKey = '8c00e6a6-b149-443e-a276-2f9351655115';
  secret = 'd1bze0az98yhw'; // 'xxxxx' Use App Key secret

// Setup App Key for Privileged User Feature (for non-Privileged App Key + Auto Introduce Disabled)
} else if (window.location.pathname.indexOf('/demo/privileged/unauto-unpriv/') === 0) {
  config.appKey = '8c00e6a6-b149-443e-a276-2f9351655115';
  secret = 'd1bze0az98yhw'; // 'xxxxx' Use App Key secret
}

if (secret) {
  var genHashForCredentials = CryptoJS.HmacSHA1(config.defaultRoom + '_' + duration + '_' + startDateTimeStamp, secret);
  var credentials = encodeURIComponent(genHashForCredentials.toString(CryptoJS.enc.Base64));

  config.credentials = {
    duration: duration,
    startDateTime: startDateTimeStamp,
    credentials: credentials
  };
}