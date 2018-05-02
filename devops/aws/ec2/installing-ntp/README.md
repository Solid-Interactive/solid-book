tags: ec2, aws, time server, ntp, time sync

## Installing NTP

First, check if you have a timezone set, by running 
```
timedatectl
```

If no, then set a timezone:
```
# look for a list of timezones
timedatectl list-timezones

# set timezone (for our servers America/Los_Angeles is the one we use)
timedatectl set-timezone <chosen timezone>
```

Install NTP
```
sudo apt-get install ntp
```

##### Original Article
https://www.digitalocean.com/community/tutorials/how-to-set-up-timezone-and-ntp-synchronization-on-ubuntu-14-04-quickstart

##### Ubuntu docs
https://help.ubuntu.com/lts/serverguide/NTP.html
