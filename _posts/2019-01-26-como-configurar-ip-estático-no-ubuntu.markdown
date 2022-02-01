---
layout: post
title:  "Como configurar IP estático no Ubuntu"
date: 2019-01-27T12:31:00Z
categories: infra
image: "ip-a.png"
author: Alessandro de Azevedo
comments: true
tags:
    - infra
    - ubuntu
    - virtual box
    - linux
    - redes
---

Para utilizar um servidor doméstico precisei configurar uma rede estática dentro de uma máquina no Virtual box e criei esse passo a passo, são passos rápidos e fáceis que vou enumerar abaixo

<!--more-->

Sistema operacional: Ubuntu 18.04

Antes de tudo é sempre bom atualizar o nosso sistema

{% highlight bash %}
$ sudo apt update
{% endhighlight %}

Agora vamos descobrir as faixas que se enquadram a nossa rede e definir qual vai ser o nosso ip, para isso vamos dar o seguinte comando

{% highlight bash %}
$ ip a
{% endhighlight %}

vamos ter uma saída parecida com essa

![Saída do comando ip a]({{ site.baseurl }}/assets/images/utilidades/ip-a.png)

nessa saída podemos notar que existem 2 redes na nossa máquina, temos a *:lo* que é a nossa rede interna e que geralmente chamamos de localhost, e no meu caso tem a enp0s3 (no seu caso esse nome pode ser diferente ou não) vamos focar nele

reparem que marquei na imagem o ip que a rede deu automáticamente para ele, podemos mudar porém com o cuidado de não colocar algum ip que já existe na rede, eu aconselho manter o ip definido pela rede que no nosso caso é **192.168.0.105/24**

Pronto agora vamos até o local onde ficam as configurações

{% highlight bash %}
$ cd /etc/netplan/
{% endhighlight %}

Dentro dessa pasta terá o nosso arquivo de configuração para editar, podemos dar um `$ ls` pra ver, vai ter um arquivo .yaml, vamos editar esse arquivo que no meu caso é *01-netcfg.yaml* e no seu caso provavelmente também vai ser

Você pode usar o editor de sua preferência no meu caso eu vou usar o vim, caso também queira usar esse editor é só dar um `sudo apt install vim`

{% highlight bash %}
$ sudo vim 01-netcfg.yaml
{% endhighlight %}

Precisamos editar o nosso arquivo para as configurações que a gente quer como no exemplo abaixo

{% highlight ruby %}

network:
  version: 2
  renderer: networkd
  ethernets:
    enp0s3: # aqui vai o nome da sua rede, vimos ele quando fizemos o comando ip a
      dhcp4: no
      addresses: [192.168.0.105/24] # Aqui colocamos o ip que iremos definir para a nossa máquina
      # o gateway é o primeiro ip disponível na rede 
      # podemos obter esse dado pegando a saída que tivemos no passo anterior 
      # e mudando o último número para '1' no meu caso substituir 105 por 1
      gateway4: 192.168.0.1 
      nameservers:
        addresses: [8.8.8.8, 8.8.4.4] # coloquei os nameservers do google para resolver nossos DNSs

{% endhighlight %}

Pronto com isso conseguimos definir o nosso ip estático, aconselho reiniciar `sudo shutdown now -r` e após logar novamente dar um ping no google por exemplo `ping google.com` pra conferir se está tudo certo 
