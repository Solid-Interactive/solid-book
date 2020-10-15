# Increasing Volume Size

tags: ec2, aws, volumes, resizing

## Increasing Volume Size - the easy way

This has no down time (show should still back things up though!)

https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/recognize-expanded-volume-linux.html

1. Identify the EBS volume being used by the EC2 instance (easiest to click through from the EC2 instance and add the appropriate name)
1. Select "modify volume"
1. Increase the size to the desired amount
1. Log on to the instance and do the following (in this example we are increasing from 8 to 30G):

    ```
    # install "cloud-guest-utils" if it is not installed already
    apt install cloud-guest-utils

    # lsblk will show that 30G is available but only 8G is partitioned
    ▶ lsblk
    NAME    MAJ:MIN RM SIZE RO TYPE MOUNTPOINT
    xvda    202:0    0  30G  0 disk
    └─xvda1 202:1    0   8G  0 part /
   
    # add a space between the device name and the partition number
    ▶ sudo growpart /dev/xvda 1
    CHANGED: partition=1 start=2048 old: size=16775135 end=16777183 new: size=62912479,end=62914527
   
    # confirm with lsblk
    ▶ lsblk
    NAME    MAJ:MIN RM SIZE RO TYPE MOUNTPOINT
    xvda    202:0    0  30G  0 disk
    └─xvda1 202:1    0  30G  0 part /   
    
    # df -h will still not show the full size, so you have to extend the filesystem
    ▶ df -h
    Filesystem      Size  Used Avail Use% Mounted on
    udev            992M     0  992M   0% /dev
    tmpfs           200M   21M  180M  11% /run
    /dev/xvda1      7.7G  4.8G  2.9G  63% /
    
    ▶ sudo resize2fs /dev/xvda1
    resize2fs 1.42.13 (17-May-2015)
    Filesystem at /dev/xvda1 is mounted on /; on-line resizing required
    old_desc_blocks = 1, new_desc_blocks = 2
    The filesystem on /dev/xvda1 is now 7864059 (4k) blocks long.
    
    ▶ df -h
    Filesystem      Size  Used Avail Use% Mounted on
    udev            992M     0  992M   0% /dev
    tmpfs           200M   21M  180M  11% /run
    /dev/xvda1       30G  4.8G   25G  17% /
    ```

## Increasing Volume Size - the hard way

This has down time.

http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-expand-volume.html

1. Make sure the instance has an elastic IP. If it doesn't, let the client know there's going to be more downtime and assign an elastic IP. Make sure you have access to the DNS before doing any of this. 
1. Optionally stop ec2 instance if downtime is not a concern
1. *Note root device* (often `/dev/sda1` )
1. Note id of instance and look for volume based on that id in volumes (use search)
    1. Name the volume
1. Make snapshot of volume
1. Create a new volume from the snapshot
    1. Make sure your ec2 availability zone matches your volume availability zone
1. Name your volume (and snapshoots too) for easy reference
1. Now stop the instance if you didn't stop it on step 1
1. Detach old volume
1. Attach new volume
    1. Attach to same root
1. Restart instance

Note that if you resized a volume with other mounted drives, then you will have to remount them. 
So whenever you're doing mounting, it's a good idea to keep the history of your commands somewhere. If you're mounting DB sources, then you'll also have to restart the services.
