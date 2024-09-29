from django.urls import path
from .views import getPrices, create_booking, get_nearby_bookings, accept_booking,reject_booking,get_driver_history, get_user_history

urlpatterns = [
    path('getPrizes/', getPrices),
    path('create-booking/', create_booking),
    path('get-nearby-bookings/', get_nearby_bookings),
    path('accept-booking/', accept_booking),
    path('reject-booking/', reject_booking),
    path('get-driver-history/', get_driver_history),
    path('get-user-history/', get_user_history),
]