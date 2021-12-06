export const errorsIgnore = [
  'ResizeObserver loop limit exceeded',
  'ResizeObserver loop completed with undelivered notifications',
  'Non-Error promise rejection captured with keys: [object has no keys]',
  "Cannot read property '_avast_submit' of undefined",
  "null is not an object (evaluating 'n.title')",
  // Random plugins/extensions
  'top.GLOBALS',
  // See: http://blog.errorception.com/2012/03/tale-of-unfindable-js-error.html
  'originalCreateNotification',
  'canvas.contentDocument',
  'MyApp_RemoveAllHighlights',
  'http://tt.epicplay.com',
  "Can't find variable: ZiteReader",
  'jigsaw is not defined',
  'ComboSearch is not defined',
  'http://loading.retry.widdit.com/',
  'atomicFindClose',
  // Facebook borked
  'fb_xd_fragment',
  // ISP "optimizing" proxy - `Cache-Control: no-transform` seems to
  // reduce this. (thanks @acdha)
  // See http://stackoverflow.com/questions/4113268
  'bmi_SafeAddOnload',
  'EBCallBackMessageReceived',
  // See http://toolbar.conduit.com/Developer/HtmlAndGadget/Methods/JSInjection.aspx
  'conduitPage',
  'grecaptcha is not defined',
  'No identifiers allowed directly after numeric literal',
  'Non-Error promise rejection captured with value: 0',
  'Identifier "originalPrompt" has already been declared',
  'undefined is not an object (evaluating "b.tagName.toLowerCase")',
  'Non-Error exception captured',
  'require is not defined',
  "Cannot read property 'getReadModeExtract' of undefined",
  "Cannot read property 'getReadModeRender' of undefined",
  "Cannot read property 'getReadModeConfig' of undefined",
  'null is not an object (evaluating \'document.head.querySelector("meta[name=\'supported-color-schemes\']").content\')',
  'Unexpected end of input',
  "undefined is not an object (evaluating 'd.tagName.toUpperCase')",
  '$ is not defined',
  "Cannot read property 'disconnect' of null",
  "can't redefine non-configurable property 'userAgent'",
  'Non-Error promise rejection captured with keys: message',
  "undefined is not an object (evaluating 'window.webkit.messageHandlers.selectedDebugHandler.postMessage')",
  /ztePageScrollModule/,
  /feedConf/,
  /snapchat.com/,
  /myGloFrameList/,
  /SecurityError/,
  /Error: AccessDeny/,
  /event is not defined/,
  /anonymous function: captureException/,
  /Blocked a frame with origin/,
  /window.ucbrowser.smWeather.changecity/,
];

export const notAllowUrls = [
  // Facebook flakiness
  /graph\.facebook\.com/i,
  // Facebook blocked
  /connect\.facebook\.net\/en_US\/all\.js/i,
  // Woopra flakiness
  /eatdifferent\.com\.woopra-ns\.com/i,
  /static\.woopra\.com\/js\/woopra\.js/i,
  // Chrome extensions
  /extensions\//i,
  /^chrome:\/\//i,
  // Other plugins
  /127\.0\.0\.1:4001\/isrunning/i, // Cacaoweb
  /webappstoolbarba\.texthelp\.com\//i,
  /metrics\.itunes\.apple\.com\.edgesuite\.net\//i,
];
