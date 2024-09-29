from django.urls import path
from .views import register_view, login_view, logout_view, check_email_view, user_status

urlpatterns = [
    path('', user_status , name = 'status'),
    path('register/', register_view, name='register'),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('check-email/', check_email_view, name='check_email'),
]
