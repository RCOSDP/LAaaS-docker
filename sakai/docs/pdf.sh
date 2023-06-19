#!/bin/bash

asciidoctor-pdf \
    -r asciidoctor-pdf-cjk \
    -a pdf-style=mystyle-theme.yml \
    -a pdf-stylesdir=resources/themes \
    -a pdf-fontsdir=resources/fonts \
    -a allow-uri-read \
    installation/README.adoc \
    -o pdf/ラーニングアナリティクス基盤システム_インストール手順.pdf

asciidoctor-pdf \
    -r asciidoctor-pdf-cjk \
    -a pdf-style=mystyle-theme.yml \
    -a pdf-stylesdir=resources/themes \
    -a pdf-fontsdir=resources/fonts \
    -a allow-uri-read \
    statements/README.adoc \
    -o pdf/Sakai-LMS-v12.6_xAPIステートメント仕様.pdf

asciidoctor-pdf \
    -r asciidoctor-pdf-cjk \
    -a pdf-style=mystyle-theme.yml \
    -a pdf-stylesdir=resources/themes \
    -a pdf-fontsdir=resources/fonts \
    -a allow-uri-read \
    superset/README.adoc \
    -o pdf/Supersetを用いた学習ログの可視化.pdf

asciidoctor-pdf \
    -r asciidoctor-pdf-cjk \
    -a pdf-style=mystyle-theme.yml \
    -a pdf-stylesdir=resources/themes \
    -a pdf-fontsdir=resources/fonts \
    -a allow-uri-read \
    jupyterhub/README.adoc \
    -o pdf/JupyterHubを用いた学習ログの可視化・分析.pdf
