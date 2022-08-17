# See https://docs.anaconda.com/anaconda/reference/release-notes/#anaconda-2019-10-october-15-2019
FROM continuumio/anaconda3:2019.10

LABEL version="2.2.1"

RUN conda install -y -c conda-forge jupyterhub=0.9.6
RUN conda install -y -c r r-irkernel=0.8.15  # Install R
RUN conda install -y psycopg2=2.8.4

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 8000

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
