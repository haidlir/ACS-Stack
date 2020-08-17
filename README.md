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

# Sample Result
- CPE Statistics
![CPE Statistics](https://raw.githubusercontent.com/haidlir/ACS-Stack/master/images/cpe-statistics.png "CPE Statistics")