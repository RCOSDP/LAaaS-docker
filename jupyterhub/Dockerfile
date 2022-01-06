# See https://docs.anaconda.com/anaconda/reference/release-notes/#anaconda-2019-10-october-15-2019
FROM continuumio/anaconda3:2019.10

LABEL version="2.2.0"

RUN conda install -y -c conda-forge jupyterhub=0.9.6
RUN conda install -y -c r r-irkernel=0.8.15  # Install R
RUN conda install -y psycopg2=2.8.4
RUN useradd -m -p $(echo "jupyter" | openssl passwd -1 -stdin) -s /bin/bash jupyter

# Copy sample notebooks
COPY notebooks/*.ipynb /home/jupyter/
RUN chown jupyter:jupyter /home/jupyter/*.ipynb

EXPOSE 8000

CMD jupyterhub --no-ssl --Spawner.args="['--NotebookApp.iopub_data_rate_limit=1.0e10']"
