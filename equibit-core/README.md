# Equibit Core Setup

Step-1: Install Bluemix CLI and Kubectl, instructions can be found here -> https://console.bluemix.net/docs/containers/cs_cli_install.html

Step-2: Open an IBM Cloud account and send your email to Harmeek/Chris for cluster access

Step-3(OPTIONAL): Run the following command to view Kubernetes clusters:
```
$ bx cs clusters
OK
Name                ID                                 State    Created      Workers   Datacenter   Version   
equibit-dev         ad3977a04fbc4c8191acaaf8c7502c35   normal   1 week ago   2         tor01        1.8.4_1502   
equibit-group-dev   74f37d1d1a6142b99080a5a45d0bb337   normal   3 days ago   2         tor01        1.8.4_1502   
```
Step-4a: Run the following command to point to.a particular cluster:
```
$ bx cs cluster-config equibit-group-dev   
OK
The configuration for equibit-group-dev was downloaded successfully. Export environment variables to start using Kubernetes.

export KUBECONFIG=/Users/harmeekjhutty/.bluemix/plugins/container-service/clusters/equibit-group-dev/kube-config-tor01-equibit-group-dev.yml
```
Step-4b: Run export (set for Windows) command from previous step i.e.
```
$ export KUBECONFIG=/Users/harmeekjhutty/.bluemix/plugins/container-service/clusters/equibit-group-dev/kube-config-tor01-equibit-group-dev.yml
```
Step-5(OPTIONAL): Run the following command to view pod information:
```
$ kubectl get pods -o wide --all-namespaces | grep equibit
default       equibit-group-deployment-5d454888f7-d6gn6                         1/1       Running   0          3d        172.30.138.78   10.114.44.160
```
Step-6: Run the following command to exec into the container:
```
$ kubectl exec -it $(kubectl get pods  | grep equibit | awk '{ print $1 }') bash
root@equibit-group-deployment-5d454888f7-d6gn6:/#
```
Step-7: Run the following command to switch to ‘coinium’ user:
```
root@equibit-group-deployment-5d454888f7-d6gn6:/# gosu equibit bash
equibit@equibit-group-deployment-5d454888f7-d6gn6:/$
```
Step-8a(OPTIONAL): Run the following commands to view running processes:
```
equibit@equibit-group-deployment-5d454888f7-d6gn6:/$ ps aux
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
equibit      1  0.2  0.4 857692 71292 ?        SLsl Jan03  10:30 equibitd -datadir=/home/equibit/.equibit
root       336  0.0  0.0  18252  3236 pts/0    Ss   19:03   0:00 bash
equibit    351  0.0  0.0  18240  3220 pts/0    S    19:04   0:00 bash
equibit    358  0.0  0.0  34424  2960 pts/0    R+   19:05   0:00 ps aux
```

Step-8b(OPTIONAL): Run the following commands to view used ports:
```
equibit@equibit-group-deployment-5d454888f7-d6gn6:/$ netstat -tulpn
(Not all processes could be identified, non-owned process info
 will not be shown, you would have to be root to see it all.)
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp        0      0 0.0.0.0:18330           0.0.0.0:*               LISTEN      1/equibitd      
tcp        0      0 0.0.0.0:18331           0.0.0.0:*               LISTEN      1/equibitd      
tcp6       0      0 :::18330                :::*                    LISTEN      1/equibitd
```
Done!

Notes:
```
Equibit binary directory: /opt/equibit-0.14.2
Equibit config file: /home/equibit/.equibit/equibit.conf
Equibit start command: equibitd
```

# Equibit Build Setup

Base Docker Image: registry.ng.bluemix.net/equibit/equibit-ubuntu:16.04
Equibit Docker Image: registry.ng.bluemix.net/equibit/equibit-core:latest

DEV Pipeline: https://console.bluemix.net/devops/toolchains/5ea48630-e6c7-4464-a876-bc69345f72e4?env_id=ibm:yp:us-south

JSONRPC:
```curl -v --data-binary '{"jsonrpc": "1.0","method": "getmininginfo", "params": [] }' -H 'content-type: text/plain;' http://equibitdev:<token>@equibit-group-dev.us-east.containers.mybluemix.net/```
