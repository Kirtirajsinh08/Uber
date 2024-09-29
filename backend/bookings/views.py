from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import CabType
from rest_framework import status
from .models import RideRequest
from math import sin, cos, sqrt, atan2, radians
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt


CustomUser = get_user_model()
@api_view(["GET"])
def getPrices(request):
    # Get all cab types
    cab_types = CabType.objects.all()

    # Manually convert queryset into a list of dictionaries
    cab_type_list = [
            {
                "id": cab_type.id,
                "name": cab_type.name,
                "price": float(cab_type.price)  # Convert Decimal to float for JSON compatibility
            }
            for cab_type in cab_types
        ]
    return Response(cab_type_list)


def haversine(lat1, lon1, lat2, lon2):
    # Radius of the Earth in km
    R = 6371.0
    d_lat = radians(lat2 - lat1)
    d_lon = radians(lon2 - lon1)
    a = (sin(d_lat / 2) ** 2 + 
         cos(radians(lat1)) * cos(radians(lat2)) * sin(d_lon / 2) ** 2)
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    return R * c

# @csrf_exempt
# @api_view(['POST'])
# def add_ride_request(request):
#     try:
#         cab_type = request.data.get('cab_type')
#         user_id = request.data.get('user_id')
#         price = request.data.get('price')
#         source = request.data.get('source')
#         destination = request.data.get('destination')

#         user = CustomUser.objects.get(id=user_id)

#         ride_request = RideRequest.objects.create(
#             cab_type=cab_type,
#             user=user,
#             price=price,
#             source=source,
#             destination=destination
#         )

#         return Response({"message": "Ride request created successfully"}, status=status.HTTP_201_CREATED)

#     except CustomUser.DoesNotExist:
#         return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

#     except Exception as e:
#         return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['GET'])
# def get_ride_requests(request):
#     try:
#         driver_lat = request.query_params.get('lat')
#         driver_lon = request.query_params.get('lng')

#         if not driver_lat or not driver_lon:
#             return Response({"error": "Driver's location (lat, lng) must be provided"}, status=status.HTTP_400_BAD_REQUEST)

#         try:
#             driver_lat = float(driver_lat)
#             driver_lon = float(driver_lon)
#         except ValueError:
#             return Response({"error": "Invalid latitude or longitude format"}, status=status.HTTP_400_BAD_REQUEST)

#         ride_requests = RideRequest.objects.all()

#         filtered_requests = []
#         for ride_request in ride_requests:
#             source = ride_request.source
#             source_lat = source['lat']
#             source_lon = source['lng']

#             distance = haversine(driver_lat, driver_lon, source_lat, source_lon)
#             if distance <= 5:
#                 filtered_requests.append({
#                     "cab_type": ride_request.cab_type,
#                     "user_id": ride_request.user.id,
#                     "price": float(ride_request.price),
#                     "source": ride_request.source,
#                     "destination": ride_request.destination,
#                     "created_at": ride_request.created_at,
#                 })

#         if not filtered_requests:
#             return Response({"message": "No ride requests available at the moment."}, status=status.HTTP_200_OK)

#         return Response(filtered_requests, status=status.HTTP_200_OK)

#     except Exception as e:
#         return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['POST'])
def create_booking(request):
    try:
        cab_type = request.data.get('cab_type')
        user_id = request.data.get('user_id')
        source = request.data.get('source')
        destination = request.data.get('destination')
        print(source)
        print(cab_type)
        print(user_id)
        print(destination)

        user = CustomUser.objects.get(id=user_id)
        cab_type_obj = CabType.objects.get(name=cab_type)

        # Calculate price based on distance and cab type
        source_lat, source_lng = source['lat'], source['lon']
        dest_lat, dest_lng = destination['lat'], destination['lon']
        distance = haversine(source_lat, source_lng, dest_lat, dest_lng)
        price = float(cab_type_obj.price) * distance

        ride_request = RideRequest.objects.create(
            cab_type=cab_type,
            user=user,
            price=price,
            source=source,
            destination=destination,
            status='pending'
        )

        return Response({
            "message": "Booking created successfully",
            "booking_id": ride_request.id,
            "price": price
        }, status=status.HTTP_201_CREATED)

    except CustomUser.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    except CabType.DoesNotExist:
        return Response({"error": "Invalid cab type"}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def get_nearby_bookings(request):
    try:
        print(request.data.get('lat'))
        driver_lat = float(request.data.get('lat'))
        driver_lon = float(request.data.get('lon'))
        # max_distance = float(request.query_params.get('max_distance', 5))  # Default to 5 km

        ride_requests = RideRequest.objects.filter(status='pending')

        nearby_requests = []
        for ride_request in ride_requests:
            source = ride_request.source
            source_lat = source['lat']
            source_lon = source['lon']

            distance = haversine(driver_lat, driver_lon, source_lat, source_lon)
            if distance:
                nearby_requests.append({
                    "booking_id": ride_request.id,
                    "cab_type": ride_request.cab_type,
                    "user_id": ride_request.user.id,
                    "price": float(ride_request.price),
                    "source": ride_request.source,
                    "destination": ride_request.destination,
                    "created_at": ride_request.created_at,
                    "distance": round(distance, 2)
                })

        if not nearby_requests:
            return Response({"message": "No nearby bookings available."}, status=status.HTTP_200_OK)

        return Response(nearby_requests, status=status.HTTP_200_OK)

    except ValueError:
        return Response({"error": "Invalid latitude or longitude format"}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def accept_booking(request):
    try:
        booking_id = request.data.get('booking_id')
        driver_id = request.data.get('driver_id')

        ride_request = RideRequest.objects.get(id=booking_id, status='pending')
        driver = CustomUser.objects.get(id=driver_id)

        ride_request.status = 'accepted'
        ride_request.driver = driver
        ride_request.save()

        return Response({"message": "Booking accepted successfully"}, status=status.HTTP_200_OK)

    except RideRequest.DoesNotExist:
        return Response({"error": "Booking not found or already accepted"}, status=status.HTTP_404_NOT_FOUND)
    except CustomUser.DoesNotExist:
        return Response({"error": "Driver not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def reject_booking(request):
    try:
        booking_id = request.data.get('booking_id')
        driver_id = request.data.get('driver_id')

        # Get the booking with status 'pending' to ensure it hasn't been accepted or rejected yet
        ride_request = RideRequest.objects.get(id=booking_id, status='pending')
        driver = CustomUser.objects.get(id=driver_id)

        # Update the booking status to 'rejected'
        ride_request.status = 'rejected'
        ride_request.driver = driver
        ride_request.save()

        return Response({"message": "Booking rejected successfully"}, status=status.HTTP_200_OK)

    except RideRequest.DoesNotExist:
        return Response({"error": "Booking not found or already processed"}, status=status.HTTP_404_NOT_FOUND)
    except CustomUser.DoesNotExist:
        return Response({"error": "Driver not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def get_driver_history(request):
    try:
        # Fetch all trips where the driver is assigned
        driver_id = request.data.get('driver_id')
        driver = CustomUser.objects.get(id=driver_id)

        # Filter by status if you only want to show completed or accepted rides
        driver_history = RideRequest.objects.filter(driver=driver).exclude(status='pending')

        # Create a serialized list of rides
        history_list = [
            {
                "cab_type": ride.cab_type,  # Assuming cab_type has a 'name' field
                "user_email": ride.user.email,   # Assuming CustomUser has an 'email' field
                "first_name": ride.user.first_name,   # Assuming CustomUser has an 'email' field
                "last_name": ride.user.last_name,   # Assuming CustomUser has an 'email' field
                "source": ride.source,
                "destination": ride.destination,
                "price": float(ride.price),
                "status": ride.status,
                "created_at": ride.created_at,   # Include timestamp for the ride
            }
            for ride in driver_history
        ]

        if not history_list:
            return Response({"message": "No trip history available for the driver."}, status=status.HTTP_200_OK)

        return Response({"history": history_list}, status=status.HTTP_200_OK)

    except CustomUser.DoesNotExist:
        return Response({"error": "Driver not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])
def get_user_history(request):
    try:
        # Fetch all trips where the user is assigned
        user_id = request.data.get('user_id')
        user = CustomUser.objects.get(id=user_id)

        # Filter by status if you only want to show completed or accepted rides
        user_history = RideRequest.objects.filter(user=user).exclude(status='pending')

        # Create a serialized list of rides
        history_list = [
            {
                "cab_type": ride.cab_type,  # Assuming cab_type has a 'name' field
                "driver_first_name": ride.driver.first_name if ride.driver else None,   # Assuming driver has a 'first_name' field
                "driver_last_name": ride.driver.last_name if ride.driver else None,   # Assuming driver has a 'last_name' field
                "source": ride.source,
                "destination": ride.destination,
                "price": float(ride.price),
                "status": ride.status,
                "created_at": ride.created_at,   # Include timestamp for the ride
            }
            for ride in user_history
        ]

        if not history_list:
            return Response({"message": "No trip history available for the user."}, status=status.HTTP_200_OK)

        return Response({"history": history_list}, status=status.HTTP_200_OK)

    except CustomUser.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)