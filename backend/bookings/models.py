from django.db import models
from django.contrib.auth import get_user_model
CustomUser = get_user_model()

class CabType(models.Model):
    name = models.CharField(max_length=50, unique=True)  # Name of the cab type, e.g., 'Sedan', 'SUV', 'Hatchback'
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Price associated with this cab type

    def _str_(self):
        return self.name  # Returns the name of the cab type as a string representation

class RideRequest(models.Model):
    driver = models.ForeignKey(CustomUser, related_name='driver_rides', on_delete=models.SET_NULL, null=True, blank=True)
    cab_type = models.CharField(max_length=50)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    source = models.JSONField()  # Source coordinates in JSON format
    destination = models.JSONField()  # Destination coordinates in JSON format
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, default="pending")

    def _str_(self):
        return f"RideRequest by {self.user.email} for {self.cab_type}"