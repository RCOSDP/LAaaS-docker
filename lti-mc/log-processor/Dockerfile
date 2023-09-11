FROM continuumio/miniconda:4.7.12

LABEL version="1.1.0"

COPY environment.yml .
RUN conda env update -n base -f environment.yml

COPY convert /usr/local/bin/
CMD convert
