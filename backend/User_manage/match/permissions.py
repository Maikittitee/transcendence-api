from rest_framework import permissions

class CanReadUpdateDeleteMatch(permissions.BasePermission):
    """
    Custom permission:
    - GET, PATCH, DELETE: Allowed only for player1, player2, or admin users.
    - POST: Allowed for all authenticated users.
    """

    def has_object_permission(self, request, view, obj):
        # Allow GET, PATCH, DELETE for player1, player2, or admin users
        if request.method in ['GET', 'PATCH', 'DELETE']:
            return request.user in [obj.player1, obj.player2] or request.user.is_staff

        return False

    def has_permission(self, request, view):
        # Allow POST for all authenticated users
        if request.method == 'POST':
            return request.user.is_authenticated
        
        return True
