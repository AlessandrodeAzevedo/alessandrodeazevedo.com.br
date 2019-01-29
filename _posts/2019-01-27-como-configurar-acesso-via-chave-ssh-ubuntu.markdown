---
layout: post
title: "Como configurar acesso via chave ssh ubuntu"
date: 2019-01-27T23:31:00Z
categories: infra
image: "ssh.jpg"
author: Alessandro de Azevedo
comments: true
tags:
    - infra
    - ubuntu
    - virtual box
    - linux
    - redes
---

Para criar o acesso via ssh no servidor precisamos basicamente instalar o pacote ssh

```
$ sudo apt install openssh-server
```

<!--more-->

após instalar esse pacote provavelmente o acesso ssh já estará funcionando, para testar podemos testar o acesso fazendo a seguinte chamada de outra máquina da rede

```
$ ssh [usuario remoto]@[ip remoto]
```

Porém queremos um ssh sem senha e para isso temos que colocar a nossa chave pública no servidor

se você ainda não tem uma chave ssh acesse esse [link do git](https://git-scm.com/book/pt-br/v1/Git-no-Servidor-Gerando-Sua-Chave-P%C3%BAblica-SSH){:target="_blank"} e gere a sua não tem mistérios

vamos acessar o nosso servidor e na pasta do usuário criar caso já não exista a pasta `.ssh` e o arquivo `authorized_keys`

```
$ sudo mkdir ~/.ssh
$ sudo vim ~/.ssh/authorized_keys
```

Pronto agora já podemos acessar o servidor sem senha 

```
$ ssh [usuario remoto]@[ip remoto]
```