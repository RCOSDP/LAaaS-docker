#!/bin/bash

USER_ID=${LOCAL_UID:-9001}
GROUP_ID=${LOCAL_GID:-9001}

useradd -u $USER_ID -o -m -p $(echo "jupyter" | openssl passwd -1 -stdin) -s /bin/bash jupyter
groupmod -g $GROUP_ID jupyter

jupyterhub --no-ssl --Spawner.args="['--NotebookApp.iopub_data_rate_limit=1.0e10']"
