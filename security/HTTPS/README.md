# HTTPS

tags: security, https, certs, tls

## Certs

There are 3 main types of certs: DV, OV, and EV. [DV and EV certs are most common](https://www.ssl.com/article/dv-ov-and-ev-certificates/).

### Confirm a secure connection via openssl

```bash
openssl s_client -connect <domain.com>:443 -tls1_2
```

If you get the certificate chain and the handshake you know the system in question 
supports TLS 1.2. If you see don't see the certificate chain, and something similar to 
"handshake error" you know it does not support TLS 1.2. You can also test for TLS 1 or 
TLS 1.1 with -tls1 or tls1_1 respectively.

More info [here](https://serverfault.com/questions/638691/how-can-i-verify-if-tls-1-2-is-supported-on-a-remote-web-server-from-the-rhel-ce)

### Use nmap for cipher information

```bash
nmap --script ssl-enum-ciphers -p 443 <domain.com>
```

This will tell you the available ciphers for the server and their strength.
 
 ### Test with SSL Labs
 
 SSL labs offers an online tool for verifying SSL/TLS. It's nice because you don't have to install any
 packages or memorize any commands.
 
 - Go here [https://www.ssllabs.com/ssltest/index.html](https://www.ssllabs.com/ssltest/index.html)
 - Enter the full domain https://<domain.com> and hit submit
 
 ## TLS versions
 
 TLS 1.0 is no longer considered secure. Therefore PCI compliance states that it must be disabled.
 
 IE 10 has support for TLS 1.1 and 1.2, but it is disabled by default, so disabling TLS 1.0 can block the typical IE10 user.
 
 https://caniuse.com/#search=tls
 
 https://help.salesforce.com/articleView?id=000220586&language=en_US&type=1
 
 https://www.netsparker.com/web-vulnerability-scanner/vulnerabilities/insecure-transportation-security-protocol-supported-tls-10/