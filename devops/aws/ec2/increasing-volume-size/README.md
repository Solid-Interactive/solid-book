# Increasing Volume Size

tags: ec2, aws, volumes, resizing

http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-expand-volume.html

Note that

1. Optionally stop ec2 instance, 
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
