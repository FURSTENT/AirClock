function doGet(e) {
  const lat = e.parameter.lat;
  const lon = e.parameter.lon;
  const radius = e.parameter.radius;
  const hex = e.parameter.hex;
  
  let url = "";
  
  // ICAO hex詳細取得モード
  if (hex) {
    url = `https://hexdb.io/api/v1/aircraft/${hex.toLowerCase()}`;
  } 
  // 通常の航空機検索モード
  else if (lat && lon && radius) {
    url = `https://api.adsb.lol/v2/point/${lat}/${lon}/${radius}`;
  } else {
    return ContentService.createTextOutput(JSON.stringify({error: "パラメータが足りないです"}))
                         .setMimeType(ContentService.MimeType.JSON);
  }
  
  try {
    const response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
    const resText = response.getContentText();
    
    // CORSを回避するためのヘッダーを付けてJSONを返す
    return ContentService.createTextOutput(resText)
                         .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({error: err.toString()}))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}
