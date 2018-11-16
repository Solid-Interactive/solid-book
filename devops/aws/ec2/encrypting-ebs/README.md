# Encrypting EBS

tags: aws, ec2, ebs, encryption

The EBS volumes that back EC2 can be encrypted.

* [EBS Encryption tutorial](https://cloudacademy.com/blog/how-to-encrypt-an-ebs-volume-the-new-amazon-ebs-encryption/)

To encrypt and EBS volume, you must [create a KMS key](https://docs.aws.amazon.com/kms/latest/developerguide/create-keys.html).

## Creating an EC2 instance with an encrypted EBS volume

* Initialize a new instance
* Create a KMS key for the encryption
* Add a second volumen and make it encrypted via the key
* Start the instance
* [Make the volume available for Linux](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-using-volumes.html) 
  * `lsblk`
  * e.g.: `sudo file -s /dev/xvdb` 
  * If previous command just showed "data": e.g.: `sudo mkfs -t ext4 /dev/xvdb`
  * Create a mount point: `sudo mkdir /crypt`
  * Moung the volume e.g.: `sudo mount /dev/xvdb /crypt`
  
Upon system reboot, the volume will not be mounted. Add a line to the end of `etc/fstab` to mount it on reboot.

e.g.:

```
/dev/xvdb /crypt ext4 defaults,nofail 0 2
```
