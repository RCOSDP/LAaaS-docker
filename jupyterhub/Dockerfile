# See https://docs.anaconda.com/anaconda/reference/release-notes/#anaconda-2019-10-october-15-2019
FROM continuumio/anaconda3:2019.10

LABEL version="2.1.1"

# Install R
RUN apt-get update --allow-releaseinfo-change && \
    apt-get install -y r-base

# Install JupyterHub and create user
RUN conda install -y jupyterhub r-irkernel psycopg2 -c conda-forge -c r -c anaconda && \
    useradd -m -p $(echo "jupyter" | openssl passwd -1 -stdin) -s /bin/bash jupyter

# Copy sample notebooks
COPY notebooks/*.ipynb /home/jupyter/
RUN chown jupyter:jupyter /home/jupyter/*.ipynb

EXPOSE 8000

CMD jupyterhub --no-ssl --Spawner.args="['--NotebookApp.iopub_data_rate_limit=1.0e10']"
