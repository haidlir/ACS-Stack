# Stack
- GenieACS
- MongoDB
- Telegraf
- InfluxDB
- Grafana

# Docker Image
Follow guidance from https://github.com/DrumSergio/genieacs-docker#pullbuild-dockerfile
```
$ docker build -f GenieACS.dockerfile . -t drumsergio/genieacs:local
```

# Turn It Up
```
$ ./up.sh
```

# Pre-Steps
1. From ACS web, configure CPE to ACS authentication refering to [this guide](https://github.com/genieacs/genieacs/wiki/GenieACS-Auth-Config#cpe-to-acs-in-version-120).
2. From CPE console, adjust the CPE's configuration.
3. Overwrite the default provision-script using the [./provision-scripts/Push-Statistics-to-Telegraf-Webhook-Listener.js](https://github.com/haidlir/ACS-Stack/blob/master/provision-scripts/Push-Statistics-to-Telegraf-Webhook-Listener.js) file
3. [Restart](https://docs.docker.com/engine/reference/commandline/restart/) GenieACS service 
4. [Import](https://grafana.com/docs/grafana/latest/reference/export_import/#importing-a-dashboard) [grafana/sample-dashboard.json](https://github.com/haidlir/ACS-Stack/blob/master/grafana/sample-dashboard.json) to Grafana

# Sample Result
- CPE Statistics
![CPE Statistics](https://raw.githubusercontent.com/haidlir/ACS-Stack/master/images/cpe-statistics.png "CPE Statistics")