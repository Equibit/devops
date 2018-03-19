# Equibit Core Setup

Refer: https://github.com/luke-jr/bfgminer

Step-1: Install Bluemix CLI and Kubectl, instructions can be found here -> https://console.bluemix.net/docs/containers/cs_cli_install.html

Step-2: Open an IBM Cloud account and send your email to Harmeek for cluster access

Step-3(OPTIONAL): Run the following command to view Kubernetes clusters:
```
$ bx cs clusters | grep equibit-group-dev
OK
Name                ID                                 State    Created      Workers   Datacenter   Version     
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
$ kubectl get pods -o wide --all-namespaces | grep equibit-miner
default       equibit-miner-deployment-5d454888f7-d6gn6                         1/1       Running   0          3d        172.30.138.78   10.114.44.160
```
Step-6: Run the following command to exec into the container:
```
$ kubectl exec -it $(kubectl get pods  | grep equibit-miner | awk '{ print $1 }') bash
root@equibit-miner-deployment-5d454888f7-d6gn6:/#
```

Step-7(OPTIONAL): Run the following commands to view used ports:
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
Equibit binary directory: /root/edc-5.5/scripts/bui

# Equibit Miner Setup

Equibit Miner Docker Image: registry.ng.bluemix.net/equibit/eqb-miner-dev:latest

DEV Pipeline: https://console.bluemix.net/devops/toolchains/ddef9f2e-dfab-47b2-81f6-a0f86da518a3?env_id=ibm:yp:us-south
