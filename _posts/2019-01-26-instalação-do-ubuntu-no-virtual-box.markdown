---
layout: post
title:  "Instalação do Ubuntu no Virtual box"
date: 2019-01-26T00:00:00Z
categories: jekyll update
image: "ubuntu-background.jpg"
author: Alessandro de Azevedo
tags:
    - ubuntu
    - infra
    - virtual box
    - linux
slides:
    - url: 1.png
      text: Inicialmente iremos criar uma nova máquina virtual clicando no ícone acima
    - url: 2.png
      text: Logo após definiremos o nome dessa maquina virtual, o tipo de sistema e o tipo de versão, que no nosso caso é do tipo linux e a versão 64-bits do Ubuntu
    - url: 3.png
      text: Para a memória ram o mínimo recomendado para o ubuntu é de 1024mb, porém para uso básico até 512mb já é suficiente, no meu caso vou manter o recomendado
    - url: 4.png
      text: O hd podemos manter o padrão e criar um disco rigido virtual, nessa opção o virtual box irá simular um disco rigido(HD) para a nossa aplicação
    - url: 5.png
      text: Definimos o tipo do nosso disco rígido virtual, podemos manter o padrão **VDI**
    - url: 6.png
      text: Escolhemos aqui como funcionará o nosso disco rígido, se vai crescer conforme a sua utilização ou se já irá separar esse espaço do nosso HD real, aconselho fortemente a primeira opção
    - url: 7.png
      text: Precisamos agora definir o nosso disco rigido(HD) virtual, como vou usar mais para o sistema e programas básicos vou manter o recomendado de 10 GB
    - url: 8.png
      text: Agora vamos na configuração definir a nossa rede e "inserir" o iso que a gente baixou na nossa máquina
    - url: 9.png
      text: Para rede vamos compartilhar a rede na nossa máquina real mudando do modo NAT para o modo bridge
    - url: 10.png
      text: Selecionamos o **ISO** que a gente baixou no nosso disco óptico virtual
    - url: 11.png
      text: Por hora as configurações do Virtual box terminaram, podemos iniciar a nossa máquina e vamos as configuraçõs do Ubuntu
    - url: 12.png
      text: Sem mistérios por aqui rs
    - url: 13.png
      text: Muitas pessoas indicam a escolher o inglês nessa parte e eu até fazia isso, porém comecei a utilizar o português e só facilitou a vida, já que essa experiência de instalar o ubuntu vamos só passar em casa, em um servidor geralmente ele já vem instalado ...
    - url: 14.png
      text: SIIIMM
    - url: 15.png
      text: Aqui você pode escolher rs
    - url: 16.png
      text: 'Nessa parte eu já passei algumas "raivas" com o detector de teclado, então eu vou pela lista mesmo rs'
    - url: 17.png
      text: Escolhemos o país ...
    - url: 18.png
      text: E escolhemos a primeira opção para o ABNT 2 que é o que a maioria usa no Brasil
    - url: 19.png
      text: Eu estou criando uma máquina para servir como servidor local, por isso o 'localhost' mais pode escolher qualquer nome aqui
    - url: 20.png
      text: O repositório é de onde o sistema vai baixar os dados necessários para ele funcionar, então quanto mais próximo melhor
    - url: 21.png
      text: Para o espelho é só ir no padrão mesmo 
    - url: 22.png
      text: Se você não sabe o que é isso deixa em branco rs
    - url: 23.png
      text: Agora é aguardar ele baixar os dados para começar a instalação
    - url: 24.png
      text: Aqui colocamos o nome do usuário pricipal
    - url: 25.png
      text: E nesse ponto criamos o login para o nosso usuário principal
    - url: 26.png
      text: Definimos uma senha para o usuário que acabamos de criar, como é para acessar localmente não vou colocar uma senha difícil pra não ter o risco de esquecer haha
    - url: 27.png
      text: Confirmo a senha fraca
    - url: 28.png
      text: Confirmo o timezone (lembrando que isso é o horário, nesse caso ai você não precisa estar em São Paulo, é só compartilhar o mesmo horário...)
    - url: 29.png
      text: Se você criou um disco rígido virtual novo para essa máquina pode ir no recomendado sem medo
    - url: 30.png
      text: Next...
    - url: 31.png
      text: SIIIM
    - url: 32.png
      text: Finalmente a instalação é iniciada (essa é a hora de ir ao banheiro ou fazer/tomar um café rs)
    - url: 33.png
      text: Para uso doméstico eu prefiro sem instalações automática (em produção também haha)
    - url: 34.png
      text: Aqui como vou simular um server já vou escolher a opção de acesso ssh pra economizar um apt install recomendo que faça o mesmo rs 
    - url: 35.png
      text: Habilitando o grub para iniciar o nosso sistema (Next...)
    - url: 36.png
      text: SIIMM
    - url: 37.png
      text: Finalmente terminamos a nossa instalação mais antes de continuar precisamos vamos remover o disco que usamos para a instalação (próximo slide)
    - url: 38.png
      text: Vamos em Dispositivos/Discos Ópticos/Remover disco do drive virtual
    - url: 39.png
      text: Podemos forçar a desmontagem, clicar em continuar e o sistema vai reiniciar...
    - url: 40.png
      text: Finalmente ubuntu instalado \o/, agora é só logar com o usuário e a senha que definimos na instalação
---

Nesse passo a passo vou compartilhar a forma como eu instalo a versão 18.04 do ubuntu a partir do arquivo minimal disponibilizado pela Canonical de uma forma bem genérica para diversas aplicações

<!--more-->

Essas aplicações eu vou compartilhando sempre por aqui é só ficar ligado, mais vamos a instalação

Primeiro vamos baixar a ISO diretamente do site do [Ubuntu](https://help.ubuntu.com/community/Installation/MinimalCD) de acordo com a arquitetura do seu hardware, 32 ou 64 bits

Depois de baixado é só seguir os passos abaixo

<div class="w-100 d-flex justify-content-center">
    {%- include slide.html -%}
</div>
