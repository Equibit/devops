# Coinium and LiteCoin Setup

Step-1: Install Bluemix CLI and Kubectl, instructions can be found here -> https://console.bluemix.net/docs/containers/cs_cli_install.html

Step-2: Send your email to Harmeek for IBM Cloud access

Step-3(OPTIONAL): Run the following command to view Kubernetes clusters:

$ bx cs clusters
OUTPUT-
OK
Name                ID                                 State    Created      Workers   Datacenter   Version   
equibit-dev         ad3977a04fbc4c8191acaaf8c7502c35   normal   1 week ago   2         tor01        1.8.4_1502   
equibit-group-dev   74f37d1d1a6142b99080a5a45d0bb337   normal   3 days ago   2         tor01        1.8.4_1502   


Step-4a: Run the following command to point to.a particular cluster:
$ bx cs cluster-config equibit-group-dev   
OUTPUT-
OK
The configuration for equibit-group-dev was downloaded successfully. Export environment variables to start using Kubernetes.

export KUBECONFIG=/Users/harmeekjhutty/.bluemix/plugins/container-service/clusters/equibit-group-dev/kube-config-tor01-equibit-group-dev.yml

Step-4b: Run export (set for Windows) command from previous step i.e.

$ export KUBECONFIG=/Users/harmeekjhutty/.bluemix/plugins/container-service/clusters/equibit-group-dev/kube-config-tor01-equibit-group-dev.yml

Step-5(OPTIONAL): Run the following command to view pod information:
$ kubectl get pods -o wide --all-namespaces | grep coinium
default       coinium-serv-deployment-59f46f5966-5lr4n                          1/1       Running   0          11h       172.30.70.222   10.114.44.162

Step-6: Run the following command to exec into the container:
$ kubectl exec -it $(kubectl get pods  | grep coinium | awk '{ print $1 }') bash
root@coinium-serv-deployment-59f46f5966-5lr4n:/#

Step-7: Run the following command to switch to ‘coinium’ user:
root@coinium-serv-deployment-59f46f5966-5lr4n:/# gosu coinium bash
coinium@coinium-serv-deployment-59f46f5966-5lr4n:/$

Step-8a(OPTIONAL): Run the following commands to view running processes:
coinium@coinium-serv-deployment-59f46f5966-5lr4n:/$ ps aux
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
coinium      1 27.2  5.3 1902104 883720 ?      SLsl 06:59 194:59 litecoind -datadir=/home/coinium/.litecoin
root       124 99.7  0.6 882348 103248 ?       Rl   07:20 692:53 /usr/bin/mono /usr/lib/mono/4.5/mono-service.exe CoiniumServ.exe
root      1945  0.0  0.0  20264  3272 pts/0    Ss   18:52   0:00 bash
coinium   1953  0.0  0.0  20256  3236 pts/0    S    18:53   0:00 bash
coinium   1964  0.0  0.0  17500  1972 pts/0    R+   18:55   0:00 ps aux

Step-8b(OPTIONAL): Run the following commands to view used ports:
coinium@coinium-serv-deployment-59f46f5966-5lr4n:/$ netstat -tulpn
(Not all processes could be identified, non-owned process info
 will not be shown, you would have to be root to see it all.)
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      -               
tcp        0      0 127.0.0.1:9332          0.0.0.0:*               LISTEN      1/litecoind     
tcp        0      0 0.0.0.0:9333            0.0.0.0:*               LISTEN      1/litecoind     
tcp6       0      0 :::9333                 :::*                    LISTEN      1/litecoind     

Done!

Notes:
Coinium installation directory: /opt/CoiniumServ/
Coinium config file: /home/coinium/.coinium/coinium.conf
Coinium binary directory: /opt/CoiniumServ/build/bin/Release/
Coinium start command: mono-service /opt/CoiniumServ/build/bin/Release/CoiniumServ.exe

Litecoin binary directory: /usr/local/bin
Litecoin config file: /home/coinium/.coinium/litecoin.conf
Litecoin start command: litcoind
