---
layout: post
title: "Instalar adicional de convidado Ubuntu Virtual box"
date: 2019-01-27T12:31:00Z
categories: infra
image: "virtualbox.jpg"
author: Alessandro de Azevedo
comments: true
tags:
    - infra
    - ubuntu
    - virtual box
    - linux
    - redes
---

A instalação dos adicionais para convidados na minha opinião e essencial para um bom desempenho e utilização de sistemas em máquinas virtuais, nesse passo a passo instalaremos esses adicionais via terminal para situações em que não temos uma interface gráfica

<!--more-->

a instalação dos adicionais permite algumas melhorias como:

- suporte de vídeo melhorado: ajuste automático da resolução para preencher corretamente o espaço disponível na tela; melhor suporte à aceleração de vídeo;
- acesso à pastas compartilhadas no host;
- área de transferência (clipboard) compartilhada.

primeiramente precisamos ver se tem e remover do drive de CD virtual alguma mídia que esteja lá com os seguintes passos

![Remover imagem do drive]({{ site.baseurl }}/assets/images/{{ page.title | slugify }}/remover_disco.png)

pode ser que tenhamos que forçar essa remoção

![Forçar remoção do disco]({{ site.baseurl }}/assets/images/{{ page.title | slugify }}/forcar.png)

também precisamos instalar alguns pacotes requeridos

{% highlight bash %}
$ sudo apt install build-essential module-assistant -y
{% endhighlight %}

agora que instalamos o *module-assistant* vamos baixar os headers do kernel necessários com o comando

{% highlight bash %}
$ sudo m-a prepare
{% endhighlight %}

agora iremos inserir o adicional para convidados

![Inserir disco]({{ site.baseurl }}/assets/images/{{ page.title | slugify }}/insere_disco.png)

geralmente somente inserir o disco não é o suficiente para monta-lo, para garantirmos a montagem vamos executar o seguinte comando

{% highlight bash %}
$ sudo mount /dev/cdrom /mnt
{% endhighlight %}

agora vamos copiar o script de instalação para a pasta */tmp* 

{% highlight bash %}
$ sudo cp /mnt/VBoxLinuxAdditions.run /tmp
{% endhighlight %}

damos permissão de execução para esse arquivo

{% highlight bash %}
$ sudo chmod +x /tmp/VBoxLinuxAdditions.run
{% endhighlight %}

e executamos o arquivo

{% highlight bash %}
$ sudo /tmp/VBoxLinuxAdditions.run
{% endhighlight %}

agora é só reiniciar e pronto!!

{% highlight bash %}
$ sudo shutdown -r now
{% endhighlight %}