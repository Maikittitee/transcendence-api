"""
ASGI config for Match_making project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os

from channels.routing import ProtocolTypeRouter, URLRouter # add URLRouter and ProtocolTypeRouter

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Match_making.settings')

django_asgi_app = get_asgi_application()

# defien the type of handler depend on the protocol
application = ProtocolTypeRouter({
    "http": django_asgi_app,
    "websocket": URLRouter([])
})
