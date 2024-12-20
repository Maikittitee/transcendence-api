from django.contrib import admin
from .models import FriendRequest, Friendship

@admin.register(FriendRequest)
class FriendRequestAdmin(admin.ModelAdmin):
    list_display = ('from_user', 'to_user', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('from_user__username', 'to_user__username')
    raw_id_fields = ('from_user', 'to_user')
    list_per_page = 20
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('from_user', 'to_user')

@admin.register(Friendship)
class FriendshipAdmin(admin.ModelAdmin):
    list_display = ('user', 'friend', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('user__username', 'friend__username')
    raw_id_fields = ('user', 'friend')
    list_per_page = 20
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('user', 'friend')