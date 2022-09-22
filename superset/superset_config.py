import os
#---------------------------------------------------------
# Superset specific config
#---------------------------------------------------------
ROW_LIMIT = 5000000

SUPERSET_WEBSERVER_PORT = 8088
#---------------------------------------------------------

#---------------------------------------------------------
# Flask App Builder configuration
#---------------------------------------------------------
# Your App secret key
# >>> import secrets
# >>> secrets.token_urlsafe(32)
SECRET_KEY = os.getenv('SECRET_KEY')

# The SQLAlchemy connection string to your database backend
# This connection defines the path to the database that stores your
# superset metadata (slices, connections, tables, dashboards, ...).
# Note that the connection information to connect to the datasources
# you want to explore are managed directly in the web UI
SUPERSET_DBUSER = os.getenv('SUPERSET_DBUSER', 'postgres')
SUPERSET_DBPASS = os.getenv('SUPERSET_DBPASS', '')
SQLALCHEMY_DATABASE_URI = (
    'postgresql+psycopg2://'
    f'{SUPERSET_DBUSER}:{SUPERSET_DBPASS}'
    '@superset-db:5432/superset'
)

# Flask-WTF flag for CSRF
WTF_CSRF_ENABLED = True
# Add endpoints that need to be exempt from CSRF protection
WTF_CSRF_EXEMPT_LIST = []
# A CSRF token that expires in 1 year
WTF_CSRF_TIME_LIMIT = 60 * 60 * 24 * 365

# Set this API key to enable Mapbox visualizations
MAPBOX_API_KEY = ''
