FROM continuumio/anaconda3


# Install R
RUN apt-get update && \
    apt-get install -y r-base

# Install JupyterHub with Python 2, 3, and R
RUN conda create -y -n py3 python=3 anaconda && \
    conda create -y -n py2 python=2 anaconda && \
    /bin/bash -c "source activate py2 && ipython kernel install && pip install pymongo" && \
    /bin/bash -c "source activate py3 && ipython kernel install && conda install -y -c conda-forge jupyterhub && conda install -c r r-irkernel && pip install pymongo" && \
    # Create the first jupyterhub user
    useradd -m -p $(echo "jupyter" | openssl passwd -1 -stdin) -s /bin/bash jupyter

# Copy sample notebooks
COPY get_statements_from_learninglocker.ipynb /home/jupyter/
COPY get_statements_from_openlrw.ipynb /home/jupyter/

EXPOSE 8000

CMD /bin/bash -c "source activate py3 && jupyterhub --no-ssl --Spawner.args=\"['--NotebookApp.iopub_data_rate_limit=1.0e10']\""
