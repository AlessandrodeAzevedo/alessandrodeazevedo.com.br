---
layout: post
title: "Escalabilidade banco mysql(mariadb)"
date: 2019-09-01T12:31:00Z
categories: infra
image: "mysql-logo.jpg"
author: Alessandro de Azevedo
comments: true
tags:
    - infra
    - ubuntu
    - virtual box
    - linux
---

Hoje em dia o número de serviços que fazem escalabilidade do banco de dados está crescendo cada vez mais, porém para algumas empresas o alto custo desses serviços pode ser um impeditivo. Nesse passo a passo irei mostrar como fazer de uma forma simples um cluster de escalabilidade do banco de dados

<!--more-->

É claro que existem inúmeras formas e caminhos de fazer o que irei descrever aqui, porém como tive dificuldade de encontrar um formato mais claro na internet, irei dar o passo a passo do cluster mais simples possível que consegui fazer através dos meus estudos 

Foram utilizados as seguintes tecnologias para fazer os passos

- Ubuntu 18.04
- Mariadb 10.3.14 (Esse foi o usado na minha instalação mais pode ser o mais atual)
- Galera Cluster
- Haproxy 1.8.8 (Esse foi o usado na minha instalação mais pode ser o mais atual)

Passos para a instalação do mariadb a partir do repositório oficial (isso é importante para garantir uma versão do mariadb que de suporte ao Galera Cluster)

```
$ sudo apt-get install software-properties-common
$ sudo apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 0xF1656F24C74CD1D8
$ sudo add-apt-repository 'deb [arch=amd64] http://mirror.zol.co.zw/mariadb/repo/10.3/ubuntu bionic main'
$ sudo apt update
$ sudo apt -y install mariadb-server mariadb-client
```

Durante essa instalação vai ser solicitada a criação da senha para o root, porém ela pode ser criada posteriormente não importa

Confirme se a instalação foi concluída com sucesso verificando a versão do mysql

```
$ mysql -v
```

### Configurações necessárias em todos os servidores (nós)

Vamos configurar primeiro o firewall para permitir requisições nas seguintes portas

```
$ ufw allow 3306
$ ufw allow 4567
$ ufw allow 4568
$ ufw allow 4444
```

No arquivo a seguir:

```
$ sudo vim /etc/mysql/mariadb.cnf
```

descomente a linha

```
character-set-server = utf8
```

adicionamos agora o arquivo de configuração do galera cluster

***“coloquei separado a configuração que é geral e a configuração única do servidor, onde o arquivo galera.cnf é o geral (igual para todos), e o arquivo galera-node.conf é único em cada nó”***

```
vim /etc/mysql/mariadb.conf.d/galera.cnf
```

*Neste arquivo é necessário incluir o ips que serão utilizados separados por vírgula*

*ex.: wsrep_cluster_address="gcomm://10.10.10.1,10.10.10.2,10.10.10.3"*

*O primeiro IP DEVE ser o do master*

```
[mysqld]
bind-address=0.0.0.0
default_storage_engine=InnoDB
binlog_format=row
innodb_autoinc_lock_mode=2

# Galera cluster configuration
wsrep_on=ON
wsrep_provider=/usr/lib/galera/libgalera_smm.so
wsrep_cluster_address="gcomm://IP.node1,IP.node2,IP.node3"
wsrep_cluster_name="mariadb-galera-cluster"
wsrep_sst_method=rsync
```

Agora vamos configurar o arquivo especifico de cada nó, neste arquivo é necessário informar o hostname referente ao server e o seu ip

```
vim /etc/mysql/mariadb.conf.d/galera-node.conf
```

```
# Cluster node configuration
wsrep_node_address="10.10.10.2 (ip do servidor)"
wsrep_node_name="galera-no-01(hostname do servidor)"
```

Após fazer a configuração em todos os nós pare o serviço do mariadb em todos eles

```
$ systemctl stop mariadb
```

Configuração para inicialização do serviço de replicação

No servidor que vai ter a função master rode o seguinte comando

```
$ galera_new_cluster
```

após rodar o comando verifique se deu certo com esse comando

```
$ mysql -u root -p -e "show status like 'wsrep_%'";
```

se tudo deu certo até aqui vamos verificar os nós do nosso cluster, ainda no servidor master rode o comando

```
$ mysql -u root -p -e "show status like 'wsrep_cluster_size'";
```

esse comando retornará o número de nós do nosso cluster, nesse momento esse número precisa ser 1 pois todos os outros nós estão com o serviço do mariadb parado, podemos agora ir em cada nó e subir o serviço

```
$ service mariadb start
```

se rodarmos novamente o comando em qualquer um dos nós ele retornará o número total de nós do nosso cluster

```
$ mysql -u root -p -e "show status like 'wsrep_cluster_size'";
```

Para testar agora é só logar em qualquer um dos nós, criar um database por ex. e verificar se a mudança foi refletida nos outros nós, neste momento poderiamos fazer INSERTS, UPDATES, SELECTS em qualquer um dos ips dos nós que automagicamente o galera cluster se encarrega de replicar para os outros os nós, vale lembrar que o galera cluster cuida sozinho para que não aconteça ids repetidos que poderiam inviabilizar a escalabilidade

Porém para escalarmos precisamos de um ip unico para usarmos em nossa aplicação e automatizar a escalabilidade, para isso vou usar o HAProxy fazendo os seguintes passos

### Configuração do HAProxy

Antes de instalarmos o haproxy vamos criar um usuário no mysql que o haproxy usará para verificar a saúde dos nossos nós sql

```
$ mysql - u root -p
# CREATE USER 'haproxy'@'10.132.%';
# FLUSH PRIVILEGES;
# quit;
```

Agora sim instalamos o haproxy

```
$ sudo apt-get install haproxy
```

A configuração ficará no seguinte arquivo

```
$ sudo vim /etc/haproxy/haproxy.cfg
```

Adicionamos no final desse arquivo a seguinte configuração, modificando no frontend o bind para o ip do próprio loadbalancer, e adicionando os servers no backend (fique atento a identação)

```
# Galera Cluster Frontend configuration
frontend galera_cluster_frontend
    bind 10.10.10.1(ip do load balancer):3306
    mode tcp
    option tcplog
    default_backend galera_cluster_backend

# Galera Cluster Backend configuration
backend galera_cluster_backend
    mode tcp
    option tcpka
    balance leastconn
    option mysql-check user haproxy
    server db-server-01 ip-do-no-01:3306  check weight 1
    server db-server-02 ip-do-no-02:3306  check weight 1
    server db-server-03 ip-do-no-03:3306  check weight 1
```

*Obs. Na linha balancer também pode ser modificado o tipo de balanceamento entre os servidores, os valores permitidos são:*

* roundrobin
* static-rr
* first
* source
* leastconn

*No meu caso utilizei o 'leastconn' que faz a requisição para o nó que tiver menos conexões ativas mais pode ser o que você preferir*

Reinicie o serviço haproxy

```
$ service haproxy restart
```

Observações finais

- Após a realização dessas configurações o acesso pode ser configurado normalmente com qualquer usuário existente utilizando o ip do loadbalancer
- Mesmo a criação/edição de usuários e permissões é replicada, ou seja, só é preciso configurar em um server, e eles serão replicados
- Para incluir um server temporário é só fazer a configuração do cluster dele mesmo e adicioná-lo ao haproxy (não é necessário o ajuste nos outros nós)
