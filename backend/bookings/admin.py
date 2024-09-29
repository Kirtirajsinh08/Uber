from django.contrib import admin
from .models import CabType, RideRequest

# Register your models here.
admin.site.register(CabType)
admin.site.register(RideRequest)
