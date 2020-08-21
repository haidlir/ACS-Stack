// Additional
const minutely = Date.now(60000)
declare("InternetGatewayDevice.DeviceInfo.UpTime", {path: minutely, value: minutely});
declare("InternetGatewayDevice.LANDevice.*.Hosts.HostNumberOfEntries", {path: minutely, value: minutely});
// declare("InternetGatewayDevice.BulkData.ParameterWildCardSupported", {path: minutely, value: minutely});
// declare("InternetGatewayDevice.BulkData.Status", {path: minutely, value: minutely});
// declare("Device.BulkData.ParameterWildCardSupported", {value: minutely}, {value: true});
declare("InternetGatewayDevice.LANDevice.*.WLANConfiguration.*.SSID", {path: minutely, value: minutely});
declare("InternetGatewayDevice.LANDevice.*.WLANConfiguration.TotalBytesSent", {path: minutely, value: minutely});
declare("InternetGatewayDevice.LANDevice.*.WLANConfiguration.TotalBytesReceived", {path: minutely, value: minutely});
declare("InternetGatewayDevice.LANDevice.*.WLANConfiguration.TotalAssociations", {path: minutely, value: minutely});
declare("InternetGatewayDevice.LANDevice.*.Hosts.Host.*.Active", {path: minutely, value: minutely});
declare("Device.Ethernet.Interface.*.Stats.BytesSent", {path: minutely, value: minutely});
declare("Device.Ethernet.Interface.*.Stats.BytesReceived", {path: minutely, value: minutely});

log("start logic....");
let timestamp = Date.now();
let serialNumber = declare("DeviceID.SerialNumber", {value: 1}).value[0];

let params = [
  {"measurement": "CPEByteStats", "path": "Device.Ethernet.Interface.*.Stats.BytesSent"},
  {"measurement": "CPEByteStats", "path": "Device.Ethernet.Interface.*.Stats.BytesReceived"},
  {"measurement": "CPEDescription", "path": "DeviceID.Manufacturer"},
  {"measurement": "CPEDescription", "path": "InternetGatewayDevice.DeviceInfo.HardwareVersion"},
  {"measurement": "CPEWifiStats", "path": "  InternetGatewayDevice.LANDevice.*.WLANConfiguration.*.SSID"},
];

let points = []
for (let param of params) {
  points = appendPointFromParam(points, param["measurement"], param["path"])
}

let activeHost = declare("InternetGatewayDevice.LANDevice.*.Hosts.Host.*.Active", {value: 1});
if (activeHost.size) {
  let numActiveHost = 0
  for (let p of activeHost) {
    if (p.value[0]) {
      numActiveHost++
    }
  }
  let point = {};
  point["serialNumber"] = serialNumber;
  point["activeHost"] = numActiveHost;
  point["timestamp"] = timestamp;
  point["measurement"] = "CPEWifiStats";
  points.push(point);
}

let url = "http://telegraf:9111/CPEStats";
let result = ext('ext-sample', 'PostWebhook', url, JSON.stringify(points));
log("finish");

function appendPointFromParam(points, measurement, path) {
  let resp = declare(path, {value: 1});
  if (resp.size) {
    for (let p of resp) {
      let point = {};
      point["measurement"] = measurement;
      point["serialNumber"] = serialNumber;
      point[p.path] = p.value[0];
      point["timestamp"] = timestamp;
      points.push(point);
    }
  }
  return points
}