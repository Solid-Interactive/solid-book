# Increasing Volume Size

tags: ec2, aws, volumes, resizing

## Increasing Volume Size

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
