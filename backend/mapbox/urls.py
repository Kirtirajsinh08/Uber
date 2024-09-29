from django.urls import path
from .views import getSearchResults, getCoordinates, getPath

urlpatterns = [
    path('getSearchResults/', getSearchResults),
    path('getCoordinates/', getCoordinates),
    path('getPath/', getPath),
]