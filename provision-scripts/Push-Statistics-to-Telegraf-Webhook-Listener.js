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

let timestamp = Date.now();
let serialNumber = declare("DeviceID.SerialNumber", {value: 1}).value[0];
let bytesSents = declare("Device.Ethernet.Interface.*.Stats.BytesSent", {value: 1});
let bytesReceiveds = declare("Device.Ethernet.Interface.*.Stats.BytesReceived", {value: 1});
let points = []


if (bytesSents.size) {
  for (let p of bytesSents) {
    let point = {};
    point["serialNumber"] = serialNumber;
    point[p.path] = p.value[0];
    point["timestamp"] = timestamp;
    points.push(point);
  }
}

if (bytesReceiveds.size) {
  for (let p of bytesReceiveds) {
    let point = {};
    point["serialNumber"] = serialNumber;
    point[p.path] = p.value[0];
    point["timestamp"] = timestamp;
    points.push(point);
  }
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
  points.push(point);
}

let url = "http://telegraf:9111/CPEStats";
ext('ext-sample', 'PostWebhook', url, JSON.stringify(points));